import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  className?: string;
}

function LoadingSpinner(props: LoadingSpinnerProps) {
  return (
    <motion.div
      className={
        "rounded-full border-4 border-t-font-main border-black/50 " +
        props.className
      }
      animate={{ transform: "rotate(360deg)" }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

export default LoadingSpinner;
