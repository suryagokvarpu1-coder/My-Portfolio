import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const WebGLBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 4);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // --- Vertex Shader ---
    const vertexShader = `
      uniform float u_time;
      uniform vec2 u_mouse;
      varying vec2 v_uv;
      varying float v_elevation;

      // Simplex-like noise
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0+h*h);
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        v_uv = uv;
        vec2 mouseInfluence = u_mouse * 0.3;
        float noiseVal = snoise(uv * 2.5 + u_time * 0.12 + mouseInfluence);
        float noiseVal2 = snoise(uv * 4.0 - u_time * 0.08);
        v_elevation = noiseVal * 0.5 + noiseVal2 * 0.25;
        vec3 pos = position;
        pos.z += v_elevation * 0.6;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    // --- Fragment Shader ---
    const fragmentShader = `
      uniform float u_time;
      varying vec2 v_uv;
      varying float v_elevation;

      void main() {
        // Deep violet to black base
        vec3 colA = vec3(0.04, 0.03, 0.10); // dark violet
        vec3 colB = vec3(0.06, 0.04, 0.16); // medium violet
        vec3 colC = vec3(0.02, 0.08, 0.12); // dark teal

        float t = v_elevation * 0.5 + 0.5;
        vec3 col = mix(colA, colB, t);
        col = mix(col, colC, sin(v_uv.x * 3.14 + u_time * 0.2) * 0.5 + 0.5);

        // Add lime accent at peaks
        vec3 limeAccent = vec3(0.91, 1.0, 0.42);
        col += limeAccent * max(v_elevation - 0.3, 0.0) * 0.08;

        // Vignette
        float dist = length(v_uv - 0.5) * 2.0;
        col *= 1.0 - smoothstep(0.4, 1.2, dist) * 0.7;

        gl_FragColor = vec4(col, 0.9);
      }
    `;

    // --- Geometry: subdivided plane ---
    const geometry = new THREE.PlaneGeometry(8, 5, 80, 50);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_time: { value: 0 },
        u_mouse: { value: new THREE.Vector2(0, 0) },
      },
      transparent: true,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI * 0.15;
    scene.add(mesh);

    // --- Mouse tracking ---
    const mouse = new THREE.Vector2(0, 0);
    const mouseLerped = new THREE.Vector2(0, 0);

    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // --- Resize ---
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // --- Animation Loop ---
    const clock = new THREE.Clock();
    let animId;
    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      mouseLerped.x = lerp(mouseLerped.x, mouse.x, 0.03);
      mouseLerped.y = lerp(mouseLerped.y, mouse.y, 0.03);
      material.uniforms.u_time.value = time;
      material.uniforms.u_mouse.value = mouseLerped;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.6,
      }}
    />
  );
};
