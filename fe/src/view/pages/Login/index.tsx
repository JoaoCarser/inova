import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useLogin } from "./useLogin";

export default function Login() {
  const { handleSubmit, register, errors, isLoading } = useLogin();
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex w-full h-full">
        <div className="flex flex-col gap-6 w-full ">
          <h1 className="text-3xl font-semibold text-black">Login</h1>
          <p className="text-primary tracking-tighter">
            Transforme suas ideias em realidade e faça a diferença.
          </p>

          <div className="flex flex-col gap-4 w-full ">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              {...register("email")}
              error={errors.email?.message}
            />
          </div>

          <div className="flex flex-col gap-4 w-full ">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              required
              {...register("password")}
              error={errors.password?.message}
            />
          </div>

          <div className="flex items-center justify-between space-x-2 ">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Lembre-se
              </label>
            </div>
            <Link to="/forgot-password">
              <span className="text-sm font-medium leading-none text-primary">
                Esqueceu a senha?
              </span>
            </Link>
          </div>

          <div className="flex flex-col gap-4 w-full ">
            <Button type="submit" isLoading={isLoading} disabled={isLoading}>
              Acessar
            </Button>
          </div>

          <div className="flex items-center justify-start gap-2">
            <span className="text-sm"> Não possui um cadastro?</span>
            <Link to="/register">
              <span className="text-sm font-medium leading-none text-primary">
                Registre-se
              </span>
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
