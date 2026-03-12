import { memo } from "react";
import { motion } from "framer-motion";
import type { NotificationItemContent } from "../../context/NotificationContext";

const NotificationItem = memo(
  ({ notif }: { notif: NotificationItemContent }) => {
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
  },
);

export default NotificationItem;
