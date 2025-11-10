"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface CodeSnippetProps {
  code: string;
  language?: string;
}

export function CodeSnippet({ code }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <pre className="bg-surface border border-border rounded-lg p-4 overflow-x-auto">
        <code className="text-sm font-mono">{code}</code>
      </pre>
      <Button
        type="button"
        onClick={handleCopy}
        className="absolute top-2 right-2"
        size="sm"
      >
        {copied ? "Copied!" : "Copy"}
      </Button>
    </div>
  );
}
