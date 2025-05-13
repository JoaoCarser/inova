"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Mail,
  Phone,
  Briefcase,
  Award,
  MessageCircle,
  FileText,
  Calendar,
  Send,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { User } from "@/app/entities/User";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ParticipantDetailDialogProps {
  participant: User;
  isOpen: boolean;
  onClose: () => void;
}

export function ParticipantDetailDialog({
  participant,
  isOpen,
  onClose,
}: ParticipantDetailDialogProps) {
  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Get role color
  const getRoleColor = (role: string) => {
    switch (role) {
      case "Líder":
        return "bg-blue-100 text-blue-700";
      case "Membro":
        return "bg-green-100 text-green-700";
      case "Orientador":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Sample communications for this participant
  const participantCommunications: {
    id: string;
    projectName: string;
    question: string;
    response: string;
    date: string;
    status: string;
  }[] = [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md lg:max-w-screen-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Perfil do Participante</DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-4 mb-6">
          <Avatar className="h-16 w-16">
            {
              <AvatarFallback className="bg-purple-100 text-purple-700 text-xl">
                {getInitials(participant.name)}
              </AvatarFallback>
            }
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">{participant.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge className={getRoleColor(participant.role)}>
                {participant.role}
              </Badge>
              <Badge variant="outline" className="bg-gray-100">
                {participant.position}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-gray-400" />
            <a
              href={`mailto:${participant.email}`}
              className="text-blue-600 hover:underline"
            >
              {participant.email}
            </a>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-gray-400" />
            <span>{participant.phone}</span>
          </div>

          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-gray-400" />
            <span>{participant.position}</span>
          </div>

          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-gray-400" />
            <span>
              {participant.usersProjects.length}{" "}
              {participant.usersProjects.length === 1 ? "projeto" : "projetos"}
            </span>
          </div>
        </div>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="projects">
              <FileText className="h-4 w-4 mr-2" />
              Projetos
            </TabsTrigger>
            <TabsTrigger value="communications" disabled>
              <MessageCircle className="h-4 w-4 mr-2" />
              Comunicações
            </TabsTrigger>
            <TabsTrigger value="message" disabled>
              <Send className="h-4 w-4 mr-2" />
              Enviar Mensagem
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-4">
            {participant.usersProjects.length === 0 ? (
              <div className="text-center py-6 bg-gray-50 rounded-lg">
                <p className="text-gray-600">
                  Este participante não está envolvido em nenhum projeto.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {participant.usersProjects.map(({ project }) => (
                  <Card key={project.id}>
                    <CardHeader className="py-3 px-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{project.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant="outline"
                              className="bg-gray-100 text-gray-700"
                            >
                              {project.department}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="bg-amber-100 text-amber-700"
                          >
                            {project.status}
                          </Badge>
                          <div className="text-xs text-gray-500 flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {format(
                              new Date(project.updatedAt),
                              "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
                              { locale: ptBR }
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="communications" className="space-y-4">
            {participantCommunications.length === 0 ? (
              <div className="text-center py-6 bg-gray-50 rounded-lg">
                <p className="text-gray-600">
                  Este participante não tem comunicações registradas.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {participantCommunications.map((comm) => (
                  <Card key={comm.id}>
                    <CardHeader className="py-3 px-4">
                      <div className="flex justify-between items-start">
                        <Badge
                          variant="outline"
                          className="bg-purple-50 text-purple-700"
                        >
                          {comm.projectName}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={
                              comm.status === "Respondida"
                                ? "bg-green-100 text-green-700"
                                : "bg-amber-100 text-amber-700"
                            }
                          >
                            {comm.status}
                          </Badge>
                          <div className="text-xs text-gray-500">
                            {comm.date}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2 px-4">
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">
                            Pergunta:
                          </p>
                          <p className="text-sm">{comm.question}</p>
                        </div>
                        {comm.response && (
                          <div>
                            <p className="text-xs text-gray-500 mb-1">
                              Resposta:
                            </p>
                            <p className="text-sm">{comm.response}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="message" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Mensagem para {participant.name}
                </label>
                <Textarea
                  placeholder="Digite sua mensagem..."
                  className="min-h-[150px]"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancelar</Button>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Mensagem
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
