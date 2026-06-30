import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = ({ darkMode }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "25px",
          right: "25px",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          zIndex: 999,
          backgroundColor: darkMode ? "#ffffff" : "#212529",
          color: darkMode ? "#000000" : "#ffffff",
          boxShadow: "0 4px 12px rgba(0,0,0,.3)",
          transition: "0.3s",
        }}
      >
        <FaArrowUp />
      </button>
    )
  );
};

export default ScrollToTopButton;