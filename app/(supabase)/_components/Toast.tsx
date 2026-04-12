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
        borderRadius: 6,
        border: "1px solid var(--s-border-strong)",
        backgroundColor: "var(--s-bg-raise)",
        color: "var(--s-text)",
        fontSize: 13,
        fontWeight: 500,
        zIndex: 1000,
        boxShadow: "0 0 0 1px var(--s-brand-glow)",
        animation: "fadeIn 150ms ease-out",
      }}
    >
      {message}
    </div>
  );
}
