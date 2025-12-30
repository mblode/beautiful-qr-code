"use client";

import { CopyButton } from "@/components/copy-button";

interface CodeSnippetProps {
  code: string;
  language?: string;
}

export function CodeSnippet({ code }: CodeSnippetProps) {
  return (
    <div className="relative">
      <pre className="overflow-x-auto rounded-lg border border-border bg-surface p-4">
        <code className="font-mono text-sm">{code}</code>
      </pre>
      <CopyButton
        className="absolute top-2 right-2"
        content={code}
        size="sm"
        variant="outline"
      />
    </div>
  );
}
