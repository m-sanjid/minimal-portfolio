import fs from "fs";
import path from "path";
import { ProjectCard } from "@/components/ProjectCard";

export default function ProjectsPage() {
  const filePath = path.join(process.cwd(), "content/projects/meta.json");
  const projects = JSON.parse(fs.readFileSync(filePath, "utf8"));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Projects</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project: any) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
