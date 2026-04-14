"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

export default function Toast({ message, visible, onClose }: ToastProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        padding: "12px 20px",
        borderRadius: 3,
        border: "1px solid var(--k-border-strong)",
        backgroundColor: "var(--k-surface)",
        color: "var(--k-text)",
        fontSize: 15,
        fontWeight: 500,
        boxShadow: "rgba(15, 15, 15, 0.04) 0px 1px 2px",
        zIndex: 1000,
        animation: "fadeIn 180ms ease",
      }}
    >
      {message}
    </div>
  );
}
