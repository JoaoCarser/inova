import { useAuth } from "@/app/hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { signout } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4">
      <h1>Home page</h1>

      <Button onClick={signout}>Sair</Button>
    </div>
  );
}
