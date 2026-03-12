import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  className?: string;
}

function LoadingSpinner(props: LoadingSpinnerProps) {
  return (
    <motion.div
      className={
        "w-10 h-10 rounded-full border-4 border-font-main border-t-black/50 " +
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
