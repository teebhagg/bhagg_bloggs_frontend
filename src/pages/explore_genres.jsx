import { motion } from "framer-motion";
import React from "react";

export default function ExploreGenres() {
  return (
    <>
      <div className="position-absolute top-50 start-50 translate-middle" style={{ marginTop:'-100px' }}>
        <motion.div
          animate={{ y: [-100, 100, -100], rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 1.5 }}>
          <i
            className="bi bi-gear-wide-connected"
            style={{ fontSize: "50px" }}
          />
        </motion.div>
      </div>
      <h4 className="position-absolute top-50 start-50 translate-middle" style={{ marginTop:'100px' }}>
        Under Development...
      </h4>
    </>
  );
}
