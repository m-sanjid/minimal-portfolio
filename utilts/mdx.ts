import path from "path";
import { promises as fs } from "fs";
import { compileMDX } from "next-mdx-remote/rsc";

type Frontmatter = {
  title: string;
  description: string;
  date: string;
  image: string;
  tags: string[];
};

export const getSingleBlog = async (slug: string) => {
  try {
    const singleBlog = await fs.readFile(
      path.join(process.cwd(), "content/blog", `${slug}.mdx`),
      "utf8"
    );
    if (!singleBlog) {
      return null;
    }

    const { content, frontmatter } = await compileMDX<Frontmatter>({
      source: singleBlog,
      options: { parseFrontmatter: true },
    });

    return { content, frontmatter };
  } catch (error) {
    console.error(`Error reading file: for slug ${slug}`, error);
    return null;
  }
};

export const getSingleCraft = async (slug: string) => {
  try {
    const singleCraft = await fs.readFile(
      path.join(process.cwd(), "content/craft", `${slug}.mdx`),
      "utf8"
    );
    if (!singleCraft) {
      return null;
    }

    const { content, frontmatter } = await compileMDX<Frontmatter>({
      source: singleCraft,
      options: { parseFrontmatter: true },
    });

    return { content, frontmatter };
  } catch (error) {
    console.error(`Error reading file: for slug ${slug}`, error);
    return null;
  }
};

export const getAllBlogs = async () => {
  try {
    const files = await fs.readdir(path.join(process.cwd(), "content/blog"));
    const allBlogs = await Promise.all(
      files.map(async (file) => {
        const slug = file.replace(/\.mdx$/, "");
        const frontmatter = await getBlogFrontmatterBySlug(slug);
        return {
          slug,
          ...frontmatter,
        };
      })
    );
    return allBlogs;
  } catch (error) {
    console.error("Error reading files:", error);
    return [];
  }
};

export const getBlogFrontmatterBySlug = async (slug: string) => {
  const singleBlog = await fs.readFile(
    path.join(process.cwd(), "content/blog", `${slug}.mdx`),
    "utf8"
  );

  if (!singleBlog) {
    return null;
  }
  const { frontmatter } = await compileMDX<Frontmatter>({
    source: singleBlog,
    options: { parseFrontmatter: true },
  });
  return frontmatter;
};
