import React, { useEffect, useRef, useState } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Section5 = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;
    const context = canvas.getContext('2d');

    const frameCount = 110;
    const images = new Array(frameCount);
    const imageSeq = { frame: 0 };

    // Preload critical frames first (every 10th frame for smooth preview)
    const criticalFrames = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 109];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (images[0] && images[0].complete) {
        renderFrame();
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const getImagePath = (index) => {
      const frameNumber = String(index + 1).padStart(3, '0');
      return `/Frames/ezgif-frame-${frameNumber}.png`;
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
      let frameToRender = currentFrame;
      
      // If current frame isn't loaded, find the nearest loaded frame
      if (!images[currentFrame] || !images[currentFrame].complete) {
        for (let i = 1; i <= 10; i++) {
          if (currentFrame - i >= 0 && images[currentFrame - i] && images[currentFrame - i].complete) {
            frameToRender = currentFrame - i;
            break;
          }
          if (currentFrame + i < frameCount && images[currentFrame + i] && images[currentFrame + i].complete) {
            frameToRender = currentFrame + i;
            break;
          }
        }
      }
      
      if (images[frameToRender] && images[frameToRender].complete) {
        scaleImage(images[frameToRender], context);
      }
    };

    // Progressive loading strategy
    const loadImagesProgressively = () => {
      return new Promise((resolve) => {
        let totalLoaded = 0;
        let criticalLoaded = 0;
        
        // Load critical frames first
        const loadCriticalFrames = () => {
          return Promise.all(criticalFrames.map(index => {
            return new Promise((frameResolve) => {
              const img = new window.Image();
              images[index] = img;
              
              img.onload = () => {
                criticalLoaded++;
                setLoadingProgress(Math.floor((criticalLoaded / criticalFrames.length) * 50));
                if (criticalLoaded === 1) {
                  imageSeq.frame = 0;
                  renderFrame();
                  setIsReady(true);
                }
                frameResolve();
              };
              
              img.onerror = () => {
                frameResolve();
              };
              
              img.src = getImagePath(index);
            });
          }));
        };

        // Load remaining frames in background
        const loadRemainingFrames = () => {
          const remainingFrames = [];
          for (let i = 0; i < frameCount; i++) {
            if (!criticalFrames.includes(i)) {
              remainingFrames.push(i);
            }
          }

          // Load in batches of 10
          const batchSize = 10;
          let batchIndex = 0;

          const loadBatch = () => {
            const batch = remainingFrames.slice(batchIndex * batchSize, (batchIndex + 1) * batchSize);
            
            Promise.all(batch.map(index => {
              return new Promise((frameResolve) => {
                const img = new window.Image();
                images[index] = img;
                
                img.onload = () => {
                  totalLoaded++;
                  const progress = 50 + Math.floor((totalLoaded / remainingFrames.length) * 50);
                  setLoadingProgress(progress);
                  frameResolve();
                };
                
                img.onerror = () => {
                  totalLoaded++;
                  frameResolve();
                };
                
                img.src = getImagePath(index);
              });
            })).then(() => {
              batchIndex++;
              if (batchIndex * batchSize < remainingFrames.length) {
                // Small delay between batches to prevent overwhelming the browser
                setTimeout(loadBatch, 50);
              } else {
                resolve();
              }
            });
          };

          loadBatch();
        };

        // Start loading process
        loadCriticalFrames().then(() => {
          loadRemainingFrames();
        });
      });
    };

    const setupAnimation = () => {
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

      const textElements = document.querySelectorAll('.section5-canvas-text h4');
      if (textElements.length > 0) {
        textElements.forEach((h) => {
          let clutterc = '';
          h.textContent.split('').forEach((l) => {
            clutterc += `<span style="display: inline-block;">${l}</span>`;
          });
          h.innerHTML = clutterc;
        });

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

    let animationContext;
    
    // Start progressive loading
    loadImagesProgressively().then(() => {
      setLoadingProgress(100);
    });

    // Setup animation once critical frames are loaded
    const checkReady = () => {
      if (isReady) {
        animationContext = gsap.context(() => setupAnimation(), container);
      } else {
        setTimeout(checkReady, 100);
      }
    };
    checkReady();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationContext) animationContext.revert();
    };
  }, [isReady]);

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
      {/* Loading indicator */}
      {loadingProgress < 100 && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            color: 'white',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          <div
            style={{
              width: '200px',
              height: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '2px',
              overflow: 'hidden',
              marginBottom: '10px',
            }}
          >
            <div
              style={{
                width: `${loadingProgress}%`,
                height: '100%',
                backgroundColor: 'white',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
          <div style={{ fontSize: '14px', opacity: 0.8 }}>
            {loadingProgress < 50 ? 'Loading experience...' : 'Optimizing quality...'}
          </div>
        </div>
      )}

      <canvas
        ref={canvasRef}
        style={{
          position: 'relative',
          minHeight: '100vh',
          width: '100%',
          opacity: isReady ? 1 : 0.3,
          transition: 'opacity 0.5s ease',
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
      </div>
    </section>
  );
};

export default Section5;