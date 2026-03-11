import { AnimatePresence } from "framer-motion";
import type { NotificationItem } from "../../context/NotificationContext";
import { motion } from "framer-motion";
import { memo } from "react";

interface NotificationStackProps {
  notifications: NotificationItem[];
}

const NotificationItem = memo(({ notif }: { notif: NotificationItem }) => {
  return (
    <motion.div
      key={notif.id}
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.9 }}
      layout
      className={`text-bg-main p-2 rounded-md shadow-xl max-w-70 ${
        notif.type === "error"
          ? "bg-error"
          : notif.type == "valid"
            ? "bg-green-500"
            : "bg-accent-primary"
      }`}
    >
      {notif.message}
    </motion.div>
  );
});

function NotificationStack({ notifications }: NotificationStackProps) {
  return (
    <motion.div
      layout
      className="fixed top-10 right-10 z-50 flex flex-col gap-3"
    >
      <AnimatePresence>
        {notifications.map((notif) => (
          <NotificationItem key={notif.id} notif={notif} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

export default NotificationStack;
