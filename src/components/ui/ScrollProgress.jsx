import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 30, mass: 0.4 });
  return <motion.div className="scroll-progress" style={{ scaleX, originX: 0, right: 0 }} />;
}
