import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import type { NotificationItemContent } from "../../context/NotificationContext";
import NotificationItem from "./NotificationItem";

interface NotificationStackProps {
  notifications: NotificationItemContent[];
}

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
