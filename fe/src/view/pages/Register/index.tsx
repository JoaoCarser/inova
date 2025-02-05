import { GalleryVerticalEnd } from "lucide-react";

import { LoginForm } from "@/components/login-form";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import personalDataIcon from "@/assets/images/personalDataIcon.png";
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
      <div className="h-1/2 bg-primary absolute w-full flex flex-col items-center justify-start p-10">
        <div className="flex flex-col gap-2 justify-center items-center">
          {" "}
          <h1 className="text-3xl font-semibold text-white md:pt-10">Cadastro</h1>
          <p className="text-white tracking-tighter">
            Preencha corretamente o formulário e participe do Inova Conterp 2024!
          </p>
        </div>
      </div>

      {/* Bottom background */}
      <div className="h-1/2 bg-gray-50 absolute bottom-0 w-full" />
      <div className="w-full relative my-auto mt-48 pt-6 md:pt-12 pb-12 px-4 max-w-4xl mx-auto bg-white rounded-md shadow-md">
        <div className=" items-center flex flex-col gap-4 pb-12 ">
          <div className="bg-yellow-400 rounded-full p-3">
            <img src={personalDataIcon} alt="personal data" className="h-10 w-10" />
          </div>
          <span className="ml-2 text-sm font-medium">Dados pessoais</span>
        </div>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 gap-y-6">
            <div className="flex flex-col gap-2 w-full md:col-span-6 ">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" type="text" required />
            </div>
            <div className="flex flex-col gap-2 w-full  md:col-span-3 ">
              <Label htmlFor="cpf">CPF</Label>
              <Input id="cpf" type="cpf" required />
            </div>
            <div className="flex flex-col gap-2 w-full  md:col-span-3 ">
              <Label htmlFor="phone">Telefone (DDD + Número)</Label>
              <Input id="phone" type="phone" required />
            </div>
            <div className="flex flex-col gap-2 w-full md:col-span-6">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required />
            </div>

            <div className="flex flex-col gap-2 w-full md:col-span-6">
              <Label htmlFor="email">E-mail pessoal (Opcional) </Label>
              <Input id="email" type="email" required />
            </div>
            <div className="flex flex-col gap-2 w-full md:col-span-3">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" required />
            </div>
            <div className="flex flex-col gap-2 w-full md:col-span-3">
              <Label htmlFor="baseId">Local de Trabalho</Label>
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
            <div className="flex flex-col gap-2 w-full md:col-span-3">
              <Label htmlFor="baseId">Disponível para viagem?</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Sim</SelectItem>
                  <SelectItem value="no">Não</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2 w-full md:col-span-3">
              <Label htmlFor="position">Função na Conterp</Label>
              <Input id="position" type="position" required />
            </div>

            <div className="flex flex-col gap-4 w-full md:col-start-10 md:col-span-3 ">
              <Button type="submit">Acessar</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
