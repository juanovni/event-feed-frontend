"use client";

import { motion } from "framer-motion";

const images = [
  "/images/event9.jpg",
  "/images/event11.jpg",
  "/images/event6.jpg",
  "/images/event4.png",
  "/images/event5.png",
  "/images/event7.jpg",
  "/images/event10.jpg",
  "/images/event3.png",
  "/images/event8.jpg",
];

export const ImageAccordion = () => {
  return (
    <div className="relative h-40 mt-20 hidden md:block" style={{ width: 80 * images.length }}>
      {images.map((img, i) => (
        <motion.div
          key={img} // 🔥 importante usar img como key
          className="absolute bottom-0 w-48 h-40 rounded-xl overflow-hidden shadow-md"
          style={{
            left: `${i * 120}px`,
            zIndex: images.length - i,
            rotate: (i - 2) * 3, // mejor usar rotate directo
          }}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <img
            src={img}
            className="w-full h-full object-cover"
          />
        </motion.div>
      ))}
    </div>
  );
};