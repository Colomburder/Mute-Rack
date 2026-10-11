import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import Header from "./components/header";
import Footer from "./components/Footer";
import Items from "./components/items";
import Categories from "./components/categories";

function App() {

  const items = [
    {
      id: 1,
      title: "Compressor",
      img: "/images/mute-compressor.png",
      desc: "A clean and powerful compressor for shaping your sound.",
      category: "Dynamics & Drive",
      price: 49,
    },
    {
      id: 2,
      title: "Reverb",
      img: "/images/mute-reverb.png",
      desc: "Create deep spaces, rooms and atmospheric reverbs.",
      category: "Time & Space",
      price: 39,
    },
    {
      id: 3,
      title: "Delay",
      img: "/images/mute-delay.png",
      desc: "Modern delay with creative modulation and feedback.",
      category: "Time & Space",
      price: 35,
    },
    {
      id: 4,
      title: "Filter",
      img: "/images/mute-filter.png",
      desc: "A flexible filter for movement, transitions and effects.",
      category: "Modulation & Color",
      price: 29,
    },
    {
      id: 5,
      title: "Saturator",
      img: "/images/mute-saturator.png",
      desc: "Add warmth, character and analog-style saturation.",
      category: "Dynamics & Drive",
      price: 45,
    },
    {
      id: 6,
      title: "Chorus",
      img: "/images/mute-chorus.png",
      desc: "Wide and smooth chorus for instruments and vocals.",
      category: "Modulation & Color",
      price: 32,
    },
    {
      id: 7,
      title: "Phaser",
      img: "/images/mute-phaser.png",
      desc: "Create psychedelic movement and evolving stereo textures.",
      category: "Modulation & Color",
      price: 34,
    },
    {
      id: 8,
      title: "Limiter",
      img: "/images/mute-limiter.png",
      desc: "Transparent limiting for louder and cleaner mixes.",
      category: "Dynamics & Drive",
      price: 49,
    },
    {
      id: 9,
      title: "Space",
      img: "/images/mute-space.png",
      desc: "A cinematic spatial effect for large atmospheric sounds.",
      category: "Time & Space",
      price: 55,
    },
    {
      id: 10,
      title: "Master",
      img: "/images/mute-master.png",
      desc: "A complete mastering tool for your final mix.",
      category: "Mastering",
      price: 69,
    },
  ];

  const [orders, setOrders] = useState([]);
  const [currentItems, setCurrentItems] = useState(items);

  
  function chooseCategory(category) {
    if (category === "all") {
      setCurrentItems(items);
      return;
    }

    setCurrentItems(
      items.filter((item) => item.category === category)
    );
  }

  
  function deleteOrder(id) {
    setOrders((currentOrders) =>
      currentOrders.filter((item) => item.id !== id)
    );
  }

  function addToOrder(item) {
    setOrders((currentOrders) => {
      const isInCart = currentOrders.some(
        (order) => order.id === item.id
      );

      if (isInCart) {
        return currentOrders;
      }

      return [...currentOrders, item];
    });
  }

  
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );

    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    );

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    const COUNT = 700;
    const RADIUS = 2.5;

    const positions = new Float32Array(COUNT * 3);
    const particles = [];

    for (let i = 0; i < COUNT; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = RADIUS * Math.pow(Math.random(), 0.35);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      particles.push({
        x,
        y,
        z,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.035,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);

    scene.add(points);

    const MAX_LINES = 3500;
    const linePositions = new Float32Array(MAX_LINES * 6);

    const lineGeometry = new THREE.BufferGeometry();

    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.13,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const lines = new THREE.LineSegments(
      lineGeometry,
      lineMaterial
    );

    scene.add(lines);

    let scroll = 0;
    let targetScroll = 0;

    const handleScroll = () => {
      targetScroll =
        window.scrollY /
        Math.max(
          document.body.scrollHeight - window.innerHeight,
          1
        );
    };

    window.addEventListener("scroll", handleScroll);

    const mouse = { x: 0, y: 0 };

    const handleMouseMove = (event) => {
      mouse.x =
        (event.clientX / window.innerWidth) * 2 - 1;

      mouse.y =
        -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const clock = new THREE.Clock();
    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      scroll += (targetScroll - scroll) * 0.05;

      for (let i = 0; i < COUNT; i++) {
        const p = particles[i];

        positions[i * 3] =
          p.x + Math.sin(time * 0.45 + p.phase) * 0.025;

        positions[i * 3 + 1] =
          p.y + Math.cos(time * 0.35 + p.phase) * 0.025;

        positions[i * 3 + 2] =
          p.z + Math.sin(time * 0.3 + p.phase) * 0.025;
      }

      geometry.attributes.position.needsUpdate = true;

      let lineCount = 0;
      const distanceLimit = 0.48 - scroll * 0.12;

      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          if (lineCount >= MAX_LINES) break;

          const dx = positions[i * 3] - positions[j * 3];
          const dy =
            positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz =
            positions[i * 3 + 2] - positions[j * 3 + 2];

          const distance = Math.sqrt(
            dx * dx + dy * dy + dz * dz
          );

          if (distance < distanceLimit) {
            const index = lineCount * 6;

            linePositions[index] = positions[i * 3];
            linePositions[index + 1] = positions[i * 3 + 1];
            linePositions[index + 2] = positions[i * 3 + 2];

            linePositions[index + 3] = positions[j * 3];
            linePositions[index + 4] = positions[j * 3 + 1];
            linePositions[index + 5] = positions[j * 3 + 2];

            lineCount++;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineCount * 2);
      lineGeometry.attributes.position.needsUpdate = true;

      const targetX = 1.25 + scroll * 0.3;
      const targetY = scroll * 0.25;

      points.position.x +=
        (targetX - points.position.x) * 0.025;

      points.position.y +=
        (targetY - points.position.y) * 0.025;

      lines.position.x = points.position.x;
      lines.position.y = points.position.y;

      const targetScale = 1.15 + scroll * 0.3;

      points.scale.x +=
        (targetScale - points.scale.x) * 0.02;

      points.scale.y +=
        (targetScale - points.scale.y) * 0.02;

      points.scale.z +=
        (targetScale - points.scale.z) * 0.02;

      lines.scale.copy(points.scale);

      points.rotation.y += 0.0008 + scroll * 0.004;

      points.rotation.x +=
        (mouse.y * 0.18 - points.rotation.x) * 0.02;

      points.rotation.z +=
        (-mouse.x * 0.1 - points.rotation.z) * 0.02;

      lines.rotation.copy(points.rotation);

      material.opacity = 0.85 - scroll * 0.45;
      lineMaterial.opacity = 0.13 - scroll * 0.07;

      renderer.render(scene, camera);
    };

    animate();

    const resize = () => {
      camera.aspect =
        window.innerWidth / window.innerHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(
        window.innerWidth,
        window.innerHeight
      );
    };

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);

      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);

      geometry.dispose();
      material.dispose();

      lineGeometry.dispose();
      lineMaterial.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="particle-background"
      />

      <div className="wrapper" id="home">
        <Header
          orders={orders}
          onDelete={deleteOrder}
        />

        <section className="hero">
          <div className="hero-content">
            <p className="hero-eyebrow">
              AUDIO PLUGINS / SOUND DESIGN
            </p>

            <h1>
              Welcome to
              <br />
              <span>Mute & Rack</span>
            </h1>

            <p className="hero-subtitle">
              Tools for shaping your sound.
            </p>

            <p className="hero-description">
              Creative audio tools designed to bring
              <br className="desktop-break" />
              your ideas to life.
            </p>
          </div>

          <div className="hero-scroll">
            <span className="scroll-line" />
            SCROLL TO EXPLORE
          </div>
        </section>

        <section className="catalog-section" id="plugins">
          <div className="section-heading">
            <p className="section-eyebrow">
              THE COLLECTION
            </p>

            <h2>Our Plugins</h2>

            <p>
              Find the right tools for your sound.
              Explore our collection of audio effects.
            </p>
          </div>

          <Categories chooseCategory={chooseCategory} />

          <Items
            items={currentItems}
            onAdd={addToOrder}
          />
        </section>

        <section className="about-section" id="about">
          <p className="section-eyebrow">ABOUT MUTE & RACK</p>

          <h2>
            Sound is more
            <br />
            than what you hear.
          </h2>

          <p className="about-description">
            Mute & Rack is built for creators who want
            to explore sound without limits. We focus on
            thoughtful design, intuitive controls and
            creative audio tools that make every detail
            count — from subtle textures to bold,
            experimental sounds.
          </p>

          <p className="about-note">
            MADE FOR CREATORS. BUILT FOR SOUND.
          </p>
        </section>

        <section className="contact-section" id="contact">
          <p className="section-eyebrow">GET IN TOUCH</p>

          <h2>
            Have a question?
            <br />
            <span>Let's talk.</span>
          </h2>

          <p>
            Questions about our plugins, collaborations
            or anything else? Send us an email.
          </p>

          <a
            className="contact-link"
            href="mailto:muteandrack@mail.ru"
          >
            muteandrack@mail.ru
          </a>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default App;