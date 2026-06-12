"use client";

import { useState } from "react";

type CopyButtonProps = {
  text: string;
  label?: string;
};

export function CopyButton({ text, label = "Copy" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      setCopied(false);
      alert("Could not copy text.");
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="premium-button-secondary rounded-full border px-3 py-1.5 text-xs font-medium"
    >
      {copied ? "Copied" : label}
    </button>
  );
}
