"use client";

import React from "react";

export const MDXComponents = {
  Callout: ({ children }: { children: React.ReactNode }) => (
    <div className="my-4 border-l-4 border-primary bg-primary/10 p-4">
      {children}
    </div>
  ),
  CodeBlock: ({ children }: { children: React.ReactNode }) => (
    <pre className="my-4 overflow-x-auto rounded p-4">
      <code>{children}</code>
    </pre>
  ),
};
