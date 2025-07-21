import React, { useEffect, useRef } from 'react';

const Section5 = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Load GSAP and ScrollTrigger from CDN
    const loadGSAP = () => {
      return new Promise((resolve) => {
        if (window.gsap && window.ScrollTrigger) {
          resolve();
          return;
        }

        const script1 = document.createElement('script');
        script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        script1.onload = () => {
          const script2 = document.createElement('script');
          script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
          script2.onload = () => {
            window.gsap.registerPlugin(window.ScrollTrigger);
            resolve();
          };
          document.head.appendChild(script2);
        };
        document.head.appendChild(script1);
      });
    };

    const initCanvas = async () => {
      try {
        await loadGSAP();
        
        const canvas = canvasRef.current;
        const container = containerRef.current;
        
        if (!canvas || !container) return;
        
        const context = canvas.getContext('2d');
        
        // Canvas variables
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

        // Function to get image path
        function getImagePath(index) {
          const frameNumber = String(index + 1).padStart(3, '0');
          const path = `/Frames/ezgif-frame-${frameNumber}.jpg`;
          return path;
        }

        // Scale and draw image on canvas
        function scaleImage(img, ctx) {
          if (!img || !ctx || !img.complete) return;
          
          const canvas = ctx.canvas;
          const hRatio = canvas.width / img.width;
          const vRatio = canvas.height / img.height;
          const ratio = Math.max(hRatio, vRatio);
          const centerShift_x = (canvas.width - img.width * ratio) / 2;
          const centerShift_y = (canvas.height - img.height * ratio) / 2;
          
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(
            img,
            0, 0, img.width, img.height,
            centerShift_x, centerShift_y,
            img.width * ratio, img.height * ratio
          );
        }

        function renderFrame() {
          const currentFrame = Math.floor(imageSeq.frame);
          if (images[currentFrame] && images[currentFrame].complete) {
            scaleImage(images[currentFrame], context);
          }
        }

        // Load all images
        function loadImages() {
          return new Promise((resolve) => {
            let loadedCount = 0;
            let errorCount = 0;
            
            for (let i = 0; i < frameCount; i++) {
              const img = new Image();
              images[i] = img;
              
              img.onload = function() {
                loadedCount++;
                console.log(`Loaded: ${loadedCount}/${frameCount}`);
                
                if (loadedCount === 1) {
                  imageSeq.frame = 0;
                  renderFrame();
                }
                
                if (loadedCount + errorCount === frameCount) {
                  console.log('All images processed!');
                  resolve();
                }
              };
              
              img.onerror = function(e) {
                errorCount++;
                console.error(`Failed to load image ${i + 1}:`, getImagePath(i), e);
                
                if (loadedCount + errorCount === frameCount) {
                  resolve();
                }
              };
              
              img.src = getImagePath(i);
            }
          });
        }

        // Start loading images
        console.log('Starting image load...');
        await loadImages();
        
        // Setup GSAP animation with higher priority and isolation
        console.log('Setting up GSAP...');
        
        // Create isolated context for Section5
        let ctx = window.gsap.context(() => {
          // Canvas animation with unique ID and higher priority
          const canvasAnimation = window.gsap.to(imageSeq, {
            frame: frameCount - 1,
            snap: 'frame',
            ease: 'none',
            scrollTrigger: {
              trigger: canvas,
              start: 'top top',
              end: '300% top',
              scrub: 0.15,
              pin: container,
              id: 'section5-canvas', // Unique ID
              refreshPriority: 10, // Higher priority than Section6
              anticipatePin: 1
            },
            onUpdate: renderFrame,
          });

          // Text animation setup (if elements exist)
          const textElements = document.querySelectorAll('.section5-canvas-text h4');
          if (textElements.length > 0) {
            textElements.forEach((h) => {
              let clutterc = '';
              h.textContent.split('').forEach((l) => {
                clutterc += `<span style="display: inline-block;">${l}</span>`;
              });
              h.innerHTML = clutterc;
            });

            // Text animation timeline with unique selectors
            const tlc = window.gsap.timeline({
              scrollTrigger: {
                trigger: canvas,
                start: 'top -10%',
                end: 'top -250%',
                scrub: 1,
                id: 'section5-text', // Unique ID
                refreshPriority: 10
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

        }, container);

        // Cleanup function
        return () => {
          window.removeEventListener('resize', resizeCanvas);
          ctx.revert(); // Clean up GSAP context
        };

      } catch (error) {
        console.error('Canvas initialization error:', error);
        
        // Show error on canvas
        const canvas = canvasRef.current;
        if (canvas) {
          const context = canvas.getContext('2d');
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          
          context.fillStyle = '#f0f0f0';
          context.fillRect(0, 0, canvas.width, canvas.height);
          context.fillStyle = '#ff0000';
          context.font = '24px Arial';
          context.textAlign = 'center';
          context.fillText('Error loading animation', canvas.width / 2, canvas.height / 2);
          context.fillText('Check console for details', canvas.width / 2, canvas.height / 2 + 30);
        }
      }
    };

    const cleanup = initCanvas();
    return () => {
      if (cleanup && typeof cleanup.then === 'function') {
        cleanup.then(cleanupFn => cleanupFn && cleanupFn());
      }
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
