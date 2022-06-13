import React, { useState } from "react";
import "../css/scrollTop.css";

export const ScrollTop = () => {
  // scroll top
  const [visible, setVisible] = useState("d-none");
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 30) setVisible("d-block");
    else setVisible("d-none");
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  window.addEventListener("scroll", toggleVisible);

  return (
    <button
      className={`d-flex position-absolute position-fixed border-2 justify-content-center mx-1 ${visible} `}
      id="scrollTop-btn"
      onClick={scrollToTop}
    >
      <i className="bi bi-chevron-up fs-5 p-1"></i>
    </button>
  );
}
