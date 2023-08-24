import React from "react";

function FloatingPlusIcon() {
  const floatingIconStyle = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#3490dc",
    color: "white",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const scrollToTextInput = () => {
    const inputElement = document.querySelector("#title");
    if (inputElement) {
      inputElement.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        inputElement.focus();
      }, 1000);
    }
  };

  return (
    <div style={floatingIconStyle} onClick={scrollToTextInput}>
      <i className="fas fa-plus text-2xl"></i>
    </div>
  );
}

export default FloatingPlusIcon;
