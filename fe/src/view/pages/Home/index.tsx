import { useAuth } from "@/app/hooks/useAuth";
import { ProjectCard } from "@/components/ProjectCard";
import { CreateProjectDialog } from "@/view/dialogs/CreateProjectDialog";

export default function Home() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4 ">
      <h1>Home page</h1>

      <CreateProjectDialog />

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {user?.usersProjects.map(({ project }) => (
          <ProjectCard project={project} />
        ))}
      </div>
    </div>
  );
}
