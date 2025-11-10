"use client";

import { CopyButton } from "@/components/copy-button";

interface CodeSnippetProps {
  code: string;
  language?: string;
}

export function CodeSnippet({ code }: CodeSnippetProps) {
  return (
    <div className="relative">
      <pre className="bg-surface border border-border rounded-lg p-4 overflow-x-auto">
        <code className="text-sm font-mono">{code}</code>
      </pre>
      <CopyButton
        content={code}
        className="absolute top-2 right-2"
        size="sm"
        variant="outline"
      />
    </div>
  );
}
