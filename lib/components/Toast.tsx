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
        borderRadius: "var(--k-radius-md)",
        border: "1px solid var(--k-border-strong)",
        backgroundColor: "var(--k-toast-bg)",
        color: "var(--k-text)",
        fontSize: "var(--k-font-size-md)",
        fontWeight: 500,
        boxShadow: "var(--k-toast-shadow)",
        zIndex: 1000,
        animation: "fadeIn var(--k-transition-fast)",
      }}
    >
      {message}
    </div>
  );
}
