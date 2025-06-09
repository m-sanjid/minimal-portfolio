import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), "content/projects/meta.json");
  const projects = JSON.parse(fs.readFileSync(filePath, "utf8"));

  return projects.map((project: any) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailsPage({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), "content/projects/meta.json");
  const projects = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const project = projects.find((p: any) => p.slug === params.slug);

  if (!project) {
    return <div className="container mx-auto px-4 py-8 text-center text-xl">Project not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="mb-4 text-3xl font-bold">{project.title}</h1>
      <div className="mb-6 w-full aspect-video relative rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80">
        <Image src={project.image} alt={project.title} fill className="object-cover" />
      </div>
      <p className="mb-4 text-lg text-zinc-700 dark:text-zinc-300">{project.description}</p>
      <div className="mb-4 flex flex-wrap gap-2">
        {project.tags.map((tag: string) => (
          <span key={tag} className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex gap-4 mt-6">
        {project.demoLink && (
          <Link href={project.demoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
            Demo
          </Link>
        )}
        {project.codeLink && (
          <Link href={project.codeLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
            Code
          </Link>
        )}
      </div>
    </div>
  );
}
