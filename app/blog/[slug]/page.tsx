import { Container } from "@/components/Container";
import { getAllBlogs, getBlogFrontmatterBySlug, getSingleBlog } from "@/utilts/mdx";

export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  if (!blogs) return [];
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}
import { redirect } from "next/navigation";


export const generateMetadata= async ({ params }: { params: { slug: string } }) => {
const frontmatter = await getBlogFrontmatterBySlug(params.slug);
  if (!frontmatter) {
    return {
      title: "Blog not found",
    };
  }
  return {
    title: frontmatter.title + " | Muhammed Sanjid",
    description: frontmatter.description,
  };
};

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const blog = await getSingleBlog(slug);

  if (!blog) {
    redirect("/blog");
  }

  const {content,frontmatter} = blog;

  return <div className="flex min-h-screen items-start justify-center">
    <Container>
      <h1 className="mb-6 text-3xl font-bold">{frontmatter.title}</h1>
      <p className="mb-2 text-gray-600">{frontmatter.description}</p>  
      <p className="mb-2 text-gray-600">{new Date(frontmatter.date||"").toLocaleDateString("en-us",{weekday:"long",year:"numeric",month:"short",day:"numeric"})}</p>
      <div className="mb-4 flex flex-wrap gap-2">
        {frontmatter.tags?.map((tag) => (
          <span
            key={tag}
            className="rounded bg-gray-200 px-2 py-1 text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="prose mx-auto">{content}</div>
    </Container>
  </div>;
}
