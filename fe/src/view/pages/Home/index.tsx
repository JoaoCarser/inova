import { CreateProjectDialog } from "@/view/dialogs/CreateProjectDialog";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4">
      <h1>Home page</h1>

      <CreateProjectDialog />
    </div>
  );
}
