import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateProjectDialog } from "./useCreateProjectDialog";
import { Textarea } from "@/components/ui/textarea";
import FileUploader from "@/components/FileUploader";

export function CreateProjectDialog() {
  const { errors, handleSubmit, register } = useCreateProjectDialog();
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Create Project</Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-screen-lg  max-h-screen">
        <DialogHeader>
          <DialogTitle>Cadastro de Projeto</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 gap-y-6 mt-6 ">
                <div className="flex flex-col gap-2 w-full md:col-span-6 ">
                  <Label htmlFor="name">Título do projeto</Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    {...register("name")}
                    error={errors.name?.message}
                  />
                </div>
                <div className="flex flex-col gap-2 w-full md:col-span-6 ">
                  <Label htmlFor="department">Área de desenvolvimento do projeto</Label>
                  <Input
                    id="department"
                    type="text"
                    placeholder="Selecione uma das opções"
                    required
                    {...register("department")}
                    error={errors.department?.message}
                  />
                </div>

                <div className="flex flex-col gap-2 w-full  md:col-span-12 ">
                  <Label htmlFor="description">Descrição do projeto</Label>
                  <Textarea
                    id="description"
                    required
                    placeholder="Adicione aqui uma breve descrição sobre o projeto"
                    {...register("description")}
                    //error={errors.description?.message}
                  />
                </div>
                <div className="flex flex-col gap-2 w-full md:col-span-6 ">
                  <Label htmlFor="link">Arquivo em vídeo</Label>
                  <Input
                    id="link"
                    type="text"
                    required
                    placeholder="Insira o link aqui"
                    {...register("link")}
                    error={errors.link?.message}
                  />
                </div>

                <div className="flex flex-col gap-2 w-full  md:col-span-6  ">
                  <Label htmlFor="link">Arquivos em PDF ou Word</Label>
                  <FileUploader />
                </div>

                <div className="flex flex-col gap-4 w-full md:col-start-10 md:col-span-3 ">
                  <Button type="submit" isLoading={false} disabled={false}>
                    Enviar projeto
                  </Button>
                </div>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
