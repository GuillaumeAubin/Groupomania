import React from "react";
import "../style/modal.css";
import { GrFormClose } from "react-icons/gr";

export default function Modal({ open, children, onClose }) {
  if (!open) return null;
  return (
    <div>
      <div className="overlay" />
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          <GrFormClose />
        </button>
        {children}
      </div>
    </div>
  );
}
