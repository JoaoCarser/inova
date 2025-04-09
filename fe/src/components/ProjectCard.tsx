"use client";

import { useState } from "react";
import { CalendarDays, CheckCircle, EllipsisVertical, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { differenceInDays } from "date-fns";
import { Project } from "@/app/entities/Project";
import { StatusProject } from "@/app/entities/StatusProject";
import { translatedDepartments } from "@/app/utils/translatedDepartments";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Extract user names for display
  const userNames = project.usersProjects.map((up) => up.user.name).join(", ");

  // Status message mapping
  const statusMessages = {
    [StatusProject.REVIEWED]: "O projeto já foi avaliado por todo comitê avaliativo.",
    [StatusProject.SUBMITTED]: "O projeto já foi submetido para avaliação.",
    [StatusProject.UNDER_REVIEW]: "O projeto está sendo avaliado pelo comitê avaliativo.",
    [StatusProject.DRAFT]: "Clique aqui para submeter o projeto para avaliação.",
  };

  return (
    <>
      <Card className="w-full border-gray-200  flex flex-col  hover:shadow-md transition-shadow">
        <CardHeader className="pb-2  flex-row justify-between items-center">
          <CardTitle className="text-xl font-semibold text-gray-700 line-clamp-1">
            {project.name}
          </CardTitle>
          <div
            className="flex items-center justify-center mb-2 text-gray-600 cursor-pointer"
            onClick={() => setIsDialogOpen(true)}
          >
            {" "}
            <EllipsisVertical />
          </div>
        </CardHeader>
        <CardContent className="space-y-4 flex-1 flex flex-col">
          <p className="text-gray-500 text-xs tracking-tight line-clamp-3">
            {project.description}
          </p>

          <div className="flex items-center gap-2 text-xs text-gray-700">
            <Users size={18} className="text-gray-500 shrink-0" />
            <span className="line-clamp-1">{userNames}</span>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-700 mt-auto">
            <div className="flex items-center gap-2">
              <span className="inline-block px-2 py-1 bg-gray-100 rounded">
                {translatedDepartments.find((d) => d.value === project.department)?.label}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays size={18} className="text-gray-700 shrink-0" />
              <span>Há {differenceInDays(new Date(), project.createdAt)} dias</span>
            </div>
          </div>

          {project.status && (
            <div className="flex items-center gap-2 text-xs tracking-tight text-white bg-green-500 p-3 rounded">
              <CheckCircle size={18} className="shrink-0" />
              <span className="line-clamp-2">{statusMessages[project.status]}</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md lg:max-w-screen-lg overflow-y-scroll max-h-screen">
          <DialogHeader>
            <DialogTitle>{project.name}</DialogTitle>
            <DialogDescription>Detalhes completos do projeto</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <h3 className="font-medium text-sm text-gray-500">Descrição</h3>
              <p className="mt-1">{project.description}</p>
            </div>

            <div>
              <h3 className="font-medium text-sm text-gray-500">Equipe</h3>
              <p className="mt-1">{userNames}</p>
            </div>

            <div>
              <h3 className="font-medium text-sm text-gray-500">Departamento</h3>
              <p className="mt-1">{project.department}</p>
            </div>

            <div>
              <h3 className="font-medium text-sm text-gray-500">Status</h3>
              <div className="mt-1 inline-flex items-center gap-2 text-sm text-white bg-green-500 p-2 rounded">
                <CheckCircle size={16} />
                <span>{statusMessages[project.status]}</span>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-sm text-gray-500">Data de criação</h3>
              <p className="mt-1">
                Há {differenceInDays(new Date(), project.createdAt)} dias
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
