import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const WebGLBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    
    // Low fog for deep spatial immersion
    scene.fog = new THREE.FogExp2('#030306', 0.015);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 32;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- Generate Particles ---
    const PARTICLE_COUNT = 4000;
    const geometry = new THREE.BufferGeometry();
    
    // Coordinate buffers for different shapes
    const posSphere = new Float32Array(PARTICLE_COUNT * 3);
    const posHelix = new Float32Array(PARTICLE_COUNT * 3);
    const posWave = new Float32Array(PARTICLE_COUNT * 3);
    const posTorus = new Float32Array(PARTICLE_COUNT * 3);
    
    const currentPositions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    // Color definitions
    const colorPurple = new THREE.Color('#6366f1');
    const colorMint = new THREE.Color('#10b981');
    const colorCyan = new THREE.Color('#06b6d4');

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // 1. Sphere position
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 11 + Math.random() * 2.5;
      posSphere[i3] = r * Math.sin(phi) * Math.cos(theta);
      posSphere[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      posSphere[i3 + 2] = r * Math.cos(phi);

      // 2. Helix position
      const t = (i / PARTICLE_COUNT) * 14 * Math.PI;
      const radius = 7;
      const strand = i % 2 === 0 ? 0 : Math.PI;
      posHelix[i3] = radius * Math.cos(t + strand) + (Math.random() - 0.5) * 1.8;
      posHelix[i3 + 1] = (t - 7 * Math.PI) * 1.3 + (Math.random() - 0.5) * 1.8;
      posHelix[i3 + 2] = radius * Math.sin(t + strand) + (Math.random() - 0.5) * 1.8;

      // 3. Wave position
      const x = ((i % 80) - 40) * 0.7;
      const z = (Math.floor(i / 80) - 25) * 0.7;
      posWave[i3] = x + (Math.random() - 0.5) * 0.25;
      posWave[i3 + 1] = Math.sin(x * 0.12) * Math.cos(z * 0.12) * 5.0;
      posWave[i3 + 2] = z + (Math.random() - 0.5) * 0.25;

      // 4. Torus position
      const ringRadius = 14;
      const tubeRadius = 4.5;
      const uTorus = Math.random() * 2 * Math.PI;
      const vTorus = Math.random() * 2 * Math.PI;
      posTorus[i3] = (ringRadius + tubeRadius * Math.cos(vTorus)) * Math.cos(uTorus);
      posTorus[i3 + 1] = (ringRadius + tubeRadius * Math.cos(vTorus)) * Math.sin(uTorus);
      posTorus[i3 + 2] = tubeRadius * Math.sin(vTorus);

      // Set initial state coordinates (start as Sphere)
      currentPositions[i3] = posSphere[i3];
      currentPositions[i3 + 1] = posSphere[i3 + 1];
      currentPositions[i3 + 2] = posSphere[i3 + 2];

      // Assign mixed gradient colors
      const mixRatio = Math.random();
      let chosenColor;
      if (mixRatio < 0.45) {
        chosenColor = colorPurple;
      } else if (mixRatio < 0.8) {
        chosenColor = colorMint;
      } else {
        chosenColor = colorCyan;
      }

      colors[i3] = chosenColor.r;
      colors[i3 + 1] = chosenColor.g;
      colors[i3 + 2] = chosenColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom high-fidelity radial light texture
    const createHighFidelityTexture = () => {
      const texCanvas = document.createElement('canvas');
      texCanvas.width = 32;
      texCanvas.height = 32;
      const ctx = texCanvas.getContext('2d');
      
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
      grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.15)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
      return new THREE.CanvasTexture(texCanvas);
    };

    const material = new THREE.PointsMaterial({
      size: 0.35,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      map: createHighFidelityTexture(),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // --- Floating wireframe geometric grid ---
    const wireframeGeo = new THREE.IcosahedronGeometry(20, 2);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: '#6366f1',
      wireframe: true,
      transparent: true,
      opacity: 0.05,
      blending: THREE.AdditiveBlending
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeo, wireframeMat);
    scene.add(wireframeMesh);

    // --- Ambient Lights ---
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight('#6366f1', 0.6);
    dirLight1.position.set(10, 20, 10);
    scene.add(dirLight1);

    // --- Mouse & Position Tracking ---
    const mouse = { x: 0, y: 0 };
    const mouseLerped = { x: 0, y: 0 };

    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    // --- Scroll Percent tracking ---
    let scrollPercent = 0;
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      scrollPercent = window.scrollY / docHeight;
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // --- Resize handler ---
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onResize);

    // --- Animation loop ---
    const clock = new THREE.Clock();
    let animId;

    const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      // Mouse Parallax with lag
      mouseLerped.x = lerp(mouseLerped.x, mouse.x * 2.8, 0.04);
      mouseLerped.y = lerp(mouseLerped.y, mouse.y * 2.8, 0.04);

      camera.position.x = mouseLerped.x;
      camera.position.y = mouseLerped.y;
      camera.lookAt(scene.position);

      // Slow organic rotations
      points.rotation.y = time * 0.025;
      points.rotation.x = time * 0.008;
      
      wireframeMesh.rotation.y = -time * 0.015;
      wireframeMesh.rotation.x = time * 0.005;

      // Morphing updates
      // Map scrollPercent (0 to 1) into 3 segments:
      // Segment 0: Sphere -> Helix
      // Segment 1: Helix -> Wave
      // Segment 2: Wave -> Torus
      const progress = scrollPercent * 3;
      const segment = Math.min(Math.floor(progress), 2);
      const segmentFactor = progress - segment;

      const posAttr = geometry.attributes.position;
      
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        let x1, y1, z1, x2, y2, z2;

        if (segment === 0) {
          x1 = posSphere[i3]; y1 = posSphere[i3 + 1]; z1 = posSphere[i3 + 2];
          x2 = posHelix[i3];  y2 = posHelix[i3 + 1];  z2 = posHelix[i3 + 2];
        } else if (segment === 1) {
          x1 = posHelix[i3];  y1 = posHelix[i3 + 1];  z1 = posHelix[i3 + 2];
          x2 = posWave[i3];   y2 = posWave[i3 + 1];   z2 = posWave[i3 + 2];
        } else {
          x1 = posWave[i3];   y1 = posWave[i3 + 1];   z1 = posWave[i3 + 2];
          x2 = posTorus[i3];  y2 = posTorus[i3 + 1];  z2 = posTorus[i3 + 2];
        }

        // Segment Interpolation
        const targetX = lerp(x1, x2, segmentFactor);
        const targetY = lerp(y1, y2, segmentFactor);
        const targetZ = lerp(z1, z2, segmentFactor);

        // Fluid organic wave motion
        const waveOffset = Math.sin(time * 0.6 + targetX * 0.12) * 0.18;
        
        posAttr.array[i3] = lerp(posAttr.array[i3], targetX, 0.08);
        posAttr.array[i3 + 1] = lerp(posAttr.array[i3 + 1], targetY + waveOffset, 0.08);
        posAttr.array[i3 + 2] = lerp(posAttr.array[i3 + 2], targetZ, 0.08);
      }
      
      posAttr.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      wireframeGeo.dispose();
      wireframeMat.dispose();
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
        mixBlendMode: 'screen',
      }}
    />
  );
};
