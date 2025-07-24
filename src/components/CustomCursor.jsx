import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const move = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    const down = () => setIsClicking(true);
    const up = () => setIsClicking(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  return (
  <div className="hidden md:block">
    <div
      className="fixed pointer-events-none z-[9999] transition-transform duration-100 ease-out"
      style={{
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y}px`,
        transform: `translate(-50%, -50%) ${isClicking ? "scale(0.95)" : "scale(1)"}`,
      }}
    >
      <img
        src="https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/f7556303-68b1-48c8-b154-2802911c8773.png"
        alt="custom-cursor"
        className="w-8 h-8 select-none"
        draggable={false}
      />

      {isClicking && (
        <div className="absolute inset-0 w-10 h-10 border border-orange-950 rounded-full animate-ping opacity-50"></div>
      )}
    </div>
  </div>
);

};

export default CustomCursor;
