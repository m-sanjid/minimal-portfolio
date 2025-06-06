"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { MDXComponents } from "./MDXComponent";

export default function MDXRemoteClient({
  source,
}: {
  source: MDXRemoteSerializeResult;
}) {
  return <MDXRemote {...source} components={MDXComponents} />;
}
