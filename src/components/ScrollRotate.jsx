import { motion, useScroll, useTransform } from "framer-motion";


const ScrollRotate = () => {
  const { scrollYProgress } = useScroll(); // scroll progress: 0 to 1
  const rotate = useTransform(scrollYProgress, [0, 1], ["0deg", "720deg"]); // rotate full circle

  return (
    // <div style={{ height: "100vh", background: "#BDB2A7" }}>
      // <div
      //   style={{
      //     height: "100vh",
      //     display: "flex",
      //     alignItems: "center",
      //     justifyContent: "center",
      //   }}
      // 
        <motion.div
          style={{
            rotate,
            width: "500px",
            height: "500px",
            backgroundImage: "url('/image.png')",
            backgroundPosition: "center",
            backgroundSize: "cover",
            // background : 'blue'
          }}
        />
      // </div>
    // </div>
  );
};

export default ScrollRotate