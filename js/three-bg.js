/**
 * three-bg.js
 * Interactive Three.js particle background for the hero section.
 * Creates ~2000 particles with violet/mint/white colors,
 * mouse-driven parallax, scroll-based opacity fade, and
 * organic sinusoidal motion.
 */

(function () {
  'use strict';

  function initParticles() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    // ─── Scene Setup ───────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // ─── Particles ─────────────────────────────────────────
    const PARTICLE_COUNT = 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    // Color palette
    const violet = new THREE.Color('#6c63ff');
    const mint = new THREE.Color('#14f195');
    const white = new THREE.Color('#ffffff');

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Random position in 3D box
      positions[i3] = (Math.random() - 0.5) * 100;     // x: -50 to 50
      positions[i3 + 1] = (Math.random() - 0.5) * 100; // y: -50 to 50
      positions[i3 + 2] = (Math.random() - 0.5) * 100; // z: -50 to 50

      // Mix of violet, mint, and white
      const rand = Math.random();
      let color;
      if (rand < 0.45) {
        color = violet;
      } else if (rand < 0.85) {
        color = mint;
      } else {
        color = white;
      }

      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Store original positions for sinusoidal animation
    const originalPositions = new Float32Array(positions);

    const material = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // ─── Mouse Tracking ────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const targetCamera = { x: 0, y: 0 };

    document.addEventListener('mousemove', (e) => {
      // Normalize to -1 … 1
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // ─── Scroll Fade ───────────────────────────────────────
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const opacity = Math.max(0, Math.min(1, 1 - scrollY / windowHeight));
      canvas.style.opacity = opacity;
    }, { passive: true });

    // ─── Visibility Pause ──────────────────────────────────
    let isVisible = true;
    document.addEventListener('visibilitychange', () => {
      isVisible = !document.hidden;
    });

    // ─── Resize Handler ────────────────────────────────────
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // ─── Animation Loop ────────────────────────────────────
    let animationId;
    const clock = new THREE.Clock();

    function animate() {
      animationId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      // Smooth camera parallax via lerp
      targetCamera.x = mouse.x * 2;
      targetCamera.y = mouse.y * 2;
      camera.position.x += (targetCamera.x - camera.position.x) * 0.05;
      camera.position.y += (targetCamera.y - camera.position.y) * 0.05;

      // Slow rotation of the entire particle group
      points.rotation.y += 0.0003;
      points.rotation.x += 0.0001;

      // Sinusoidal movement for organic feel
      const posAttr = geometry.attributes.position;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        const ox = originalPositions[i3];
        const oy = originalPositions[i3 + 1];
        const oz = originalPositions[i3 + 2];

        // Each particle oscillates slightly based on its original position
        posAttr.array[i3] = ox + Math.sin(elapsed * 0.3 + ox * 0.1) * 0.5;
        posAttr.array[i3 + 1] = oy + Math.cos(elapsed * 0.2 + oy * 0.1) * 0.5;
        posAttr.array[i3 + 2] = oz + Math.sin(elapsed * 0.25 + oz * 0.1) * 0.3;
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    }

    animate();
  }

  // Expose globally for main.js
  window.initParticles = initParticles;
})();
