import "./App.css";
import React from "react";

interface SquareProps {
  value: string | null;
  onClick: () => void;
}

export const Square: React.FC<SquareProps> = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};
