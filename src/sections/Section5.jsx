import React, { useEffect, useRef } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Section5 = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;
    const context = canvas.getContext('2d');

    // Canvas animation setup
    const frameCount = 170;
    const images = new Array(frameCount);
    const imageSeq = { frame: 0 };

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (images[0] && images[0].complete) {
        renderFrame();
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Image loader helper
    const getImagePath = (index) => {
      const frameNumber = String(index + 1).padStart(3, '0');
      return `/Frames/ezgif-frame-${frameNumber}.jpg`;
    };

    const scaleImage = (img, ctx) => {
      if (!img || !ctx || !img.complete) return;
      const canvas = ctx.canvas;
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img, 0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
      );
    };

    const renderFrame = () => {
      const currentFrame = Math.floor(imageSeq.frame);
      if (images[currentFrame] && images[currentFrame].complete) {
        scaleImage(images[currentFrame], context);
      }
    };

    // Load all images
    const loadImages = () => {
      return new Promise((resolve) => {
        let loadedCount = 0;
        let errorCount = 0;
        for (let i = 0; i < frameCount; i++) {
          const img = new window.Image();
          images[i] = img;
          img.onload = function () {
            loadedCount++;
            if (loadedCount === 1) {
              imageSeq.frame = 0;
              renderFrame();
            }
            if (loadedCount + errorCount === frameCount) {
              resolve();
            }
          };
          img.onerror = function () {
            errorCount++;
            if (loadedCount + errorCount === frameCount) {
              resolve();
            }
          };
          img.src = getImagePath(i);
        }
      });
    };

    // Main animation logic
    const setupAnimation = () => {
      // Canvas animation
      const canvasAnimation = gsap.to(imageSeq, {
        frame: frameCount - 1,
        snap: 'frame',
        ease: 'none',
        scrollTrigger: {
          trigger: canvas,
          start: 'top top',
          end: '300% top',
          scrub: 0.15,
          pin: container,
          id: 'section5-canvas',
          refreshPriority: 10,
          anticipatePin: 1,
        },
        onUpdate: renderFrame,
      });

      // Text animation
      const textElements = document.querySelectorAll('.section5-canvas-text h4');
      if (textElements.length > 0) {
        textElements.forEach((h) => {
          let clutterc = '';
          h.textContent.split('').forEach((l) => {
            clutterc += `<span style="display: inline-block;">${l}</span>`;
          });
          h.innerHTML = clutterc;
        });

        // Timeline for text animation
        const tlc = gsap.timeline({
          scrollTrigger: {
            trigger: canvas,
            start: 'top -10%',
            end: 'top -250%',
            scrub: 1,
            id: 'section5-text',
            refreshPriority: 10,
          },
        });

        tlc
          .to('.section5-canvas-text-wrap .h41 span', {
            transform: 'translateY(-140%)',
            stagger: { amount: 0.4 },
            duration: 0.6,
          })
          .to('.section5-canvas-text-wrap .h42 span', {
            transform: 'translateY(-100%)',
            stagger: { amount: 0.4 },
            duration: 0.6,
          })
          .to('.section5-canvas-text-wrap .h42 span', {
            transform: 'translateY(-230%)',
            stagger: { amount: 0.4 },
            duration: 0.6,
          })
          .to('.section5-canvas-text-wrap .h43 span', {
            transform: 'translateY(-200%)',
            stagger: { amount: 0.4 },
            duration: 0.6,
          });
      }
    };

    // Async load images then animate
    let animationContext;
    loadImages()
      .then(() => {
        animationContext = gsap.context(() => setupAnimation(), container);
      });

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationContext) animationContext.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        backgroundColor: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'relative',
          minHeight: '100vh',
          width: '100%',
        }}
      />
      <div
        className="section5-canvas-text-wrap"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          height: '100%',
          width: '100%',
          zIndex: 2,
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'start',
          padding: '4vw 2vw',
          pointerEvents: 'none',
        }}
      >
        {/* Add your text content here with section5-canvas-text class */}
      </div>
    </section>
  );
};

export default Section5;
