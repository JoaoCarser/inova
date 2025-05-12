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
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { translatedDepartments } from "@/app/utils/translatedDepartments";
import { useState } from "react";
import { CreateProjectCard } from "@/view/pages/Projects/components/CreateProjectCard";
import { ParticipantSelector } from "@/components/ParticipantSelector";

export function CreateProjectDialog() {
  const [open, setOpen] = useState(false);
  const {
    errors,
    handleSubmit,
    register,
    control,
    isLoading,
    filesToUpload,
    setFilesToUpload,
    currentEdition,
  } = useCreateProjectDialog(() => {
    setOpen(false); // Fecha o modal após submit
  });
  return (
    <Dialog open={open && !!currentEdition} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <CreateProjectCard onClick={() => {
       
        setOpen(true)
        }} />
      </DialogTrigger>
      <DialogContent className="lg:max-w-screen-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Cadastro de Projeto</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 gap-y-6 mt-6 ">
                <div className="flex flex-col gap-2 w-full md:col-span-6 items-start ">
                  <Label htmlFor="name">Título do projeto</Label>
                  <Input
                    className="w-full"
                    id="name"
                    type="text"
                    required
                    {...register("name")}
                    error={errors.name?.message}
                  />
                </div>
                <div className="flex flex-col gap-2 w-full md:col-span-6 items-start ">
                  <Label htmlFor="department">
                    Área de desenvolvimento do projeto
                  </Label>

                  <Controller
                    name="department"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select onValueChange={onChange} defaultValue={value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma das opções" />
                        </SelectTrigger>

                        <SelectContent>
                          {translatedDepartments.map(({ label, value }) => (
                            <SelectItem value={value}>{label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-2   md:col-span-12 items-start ">
                  <div className="w-full">
                    <Label htmlFor="description">Descrição do projeto</Label>
                    <Textarea
                      id="description"
                      required
                      placeholder="Adicione aqui uma breve descrição sobre o projeto"
                      {...register("description")}
                      className="w-full"
                      //error={errors.description?.message}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 w-full md:col-span-12 items-start">
                  <Label htmlFor="participants">Participantes do projeto</Label>
                  <Controller
                    name="participants"
                    control={control}
                    defaultValue={[]}
                    render={({ field: { onChange, value } }) => (
                      <ParticipantSelector value={value} onChange={onChange} />
                    )}
                  />
                  {errors.participants && (
                    <p className="text-sm text-red-500">
                      {errors.participants.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 w-full md:col-span-6 items-start">
                  <Label htmlFor="videoLink">Arquivo em vídeo</Label>
                  <Input
                    id="videoLink"
                    type="text"
                    placeholder="Insira o link aqui"
                    {...register("videoLink")}
                    error={errors.videoLink?.message}
                  />
                </div>

                <div className="flex flex-col gap-2 w-full  md:col-span-6 items-start ">
                  <Label htmlFor="file">Arquivos do Projeto</Label>
                  <FileUploader
                    filesToUpload={filesToUpload}
                    setFilesToUpload={setFilesToUpload}
                  />
                </div>

                <div className="flex flex-col gap-4 w-full md:col-start-10 md:col-span-3 ">
                  <Button
                    type="submit"
                    isLoading={isLoading}
                    disabled={isLoading}
                  >
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
