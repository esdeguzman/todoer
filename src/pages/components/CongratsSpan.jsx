import React, { useState, useEffect } from "react";

function CongratsSpan() {
  const [randomText, setRandomText] = useState("");
  const textOptions = [
    "Task completed! Well done! 🎉",
    "Great job! Another task crossed off! 🚀",
    "Hooray! One less thing to worry about! 🎈",
    "Success! Task successfully completed! 🌟",
    "High five! Task conquered! 🖐️",
    "Kudos! You've tackled this task! 👍",
    "Way to go! Task completed with style! 💪",
    "Woohoo! Task accomplished! 🥳",
    "Achievement unlocked! Task checked off! 🏆",
  ];

  useEffect(() => {
    getRandomText();
  }, []);

  const getRandomText = () => {
    const randomIndex = Math.floor(Math.random() * textOptions.length);
    const randomText = textOptions[randomIndex];
    setRandomText(randomText);
  };

  return <span className="text-white font-medium">{randomText}</span>;
}

export default CongratsSpan;
