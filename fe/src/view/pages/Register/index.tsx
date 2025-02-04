import { GalleryVerticalEnd } from "lucide-react";

import { LoginForm } from "@/components/login-form";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Register() {
  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col gap-4 w-full ">
        <h1 className="text-3xl font-semibold text-black">Cadastro</h1>
        <p className="text-primary tracking-tighter">
          Transforme suas ideias em realidade e faça a diferença.
        </p>

        <div className="flex flex-col gap-2 w-full ">
          <Label htmlFor="name">Nome</Label>
          <Input id="name" type="text" required />
        </div>

        <div className="flex flex-col gap-2 w-full ">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required />
        </div>

        <div className="flex flex-col gap-2 w-full ">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" required />
        </div>

        <div className="flex flex-col gap-2 w-full ">
          <Label htmlFor="cpf">CPF</Label>
          <Input id="cpf" type="cpf" required />
        </div>

        <div className="flex flex-col gap-2 w-full ">
          <Label htmlFor="position">Cargo</Label>
          <Input id="position" type="position" required />
        </div>

        <div className="flex flex-col gap-2 w-full ">
          <Label htmlFor="baseId">Base</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="adm">ADM</SelectItem>
              <SelectItem value="SPT 100">SPT 100</SelectItem>
              <SelectItem value="SPT 111">SPT 111</SelectItem>
            </SelectContent>
          </Select>
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
          <Link to="/recover">
            <span className="text-sm font-medium leading-none text-primary">
              Esqueceu a senha?
            </span>
          </Link>
        </div>

        <div className="flex flex-col gap-4 w-full ">
          <Button type="submit">Acessar</Button>
        </div>

        <div className="flex items-center justify-start gap-2">
          <span className="text-sm"> Possui um cadastro?</span>
          <Link to="/login">
            <span className="text-sm font-medium leading-none text-primary">
              Faça o login
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
