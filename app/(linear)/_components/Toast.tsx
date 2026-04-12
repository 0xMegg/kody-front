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
        borderRadius: 8,
        border: "1px solid var(--l-border-strong)",
        backgroundColor: "var(--l-surface)",
        color: "var(--l-text)",
        fontSize: 13,
        fontWeight: 500,
        zIndex: 1000,
        animation: "fadeIn 150ms ease-out",
      }}
    >
      {message}
    </div>
  );
}
