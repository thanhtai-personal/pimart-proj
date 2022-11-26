import {
  motion,
  useAnimationControls,
} from "framer-motion/dist/framer-motion";
import { useEffect } from "react";

const HoverRotate = (props) => {
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start(i => ({
      opacity: [0, 0.3, 0.45, 1],
      scale: [0.45, 1],
      transition: { duration: 0.3 },
      animation: { duration: 0.3 },
    }));
  }, [])

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <motion.div
          animate={controls}
        >
          {props.children}
        </motion.div>
    </div>
  );
};

export default HoverRotate;
