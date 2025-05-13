"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Phone, Briefcase, Award } from "lucide-react";
import { ParticipantDetailDialog } from "@/components/ParticipantDetailDialog";
import {
  ParticipantFilters,
  ParticipantFilterState,
} from "@/components/ParticipantFilters";
import { useUsers } from "@/app/hooks/users/useUsers";
import { User } from "@/app/entities/User";
import { Spinner } from "@/components/Spinner";

interface ParticipantsProps {}

export default function Participants({}: ParticipantsProps) {
  const [selectedParticipant] = useState<User | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [filters, setFilters] = useState<ParticipantFilterState>({
    name: "",
    base: [],
  });

  const { users, refechUsers, isFetchingUsers } = useUsers(filters);

  useEffect(() => {
    refechUsers();
  }, [filters]);

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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium text-purple-600">Participantes</h2>
      </div>

      <ParticipantFilters onFilterChange={setFilters} />
      {users.length === 0 && !isFetchingUsers && (
        <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed">
          <p className="text-gray-500">
            Nenhum participante encontrado com os filtros selecionados.
          </p>
          <Button variant="link" className="mt-2">
            Limpar filtros
          </Button>
        </div>
      )}
      {isFetchingUsers && <Spinner />}

      {users.length > 0 && !isFetchingUsers && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((participant) => (
            <Card key={participant.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    {
                      <AvatarFallback className="">
                        {getInitials(participant.name)}
                      </AvatarFallback>
                    }
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-base">
                      {participant.name}
                    </h3>
                    <Badge className={getRoleColor(participant.role)}>
                      {participant.role}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="py-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <a
                      href={`mailto:${participant.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {participant.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{participant.phone}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="h-4 w-4 text-gray-400" />
                    <span>{participant.position}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Award className="h-4 w-4 text-gray-400" />
                    <span>
                      {participant.usersProjects.length}{" "}
                      {participant.usersProjects.length === 1
                        ? "projeto"
                        : "projetos"}
                    </span>
                  </div>

                  {/*  {participant.questionCount > 0 && (
                    <div className="flex items-center gap-2 text-sm text-purple-600">
                      <MessageCircle className="h-4 w-4 text-purple-500" />
                      <span>
                        {participant.questionCount}{" "}
                        {participant.questionCount === 1
                          ? "pergunta"
                          : "perguntas"}
                      </span>
                    </div>
                  )} */}
                </div>
              </CardContent>

              {/*  <CardFooter className="pt-2 border-t flex gap-2">
                {/*   <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleViewDetails(participant)}
                >
                  <UserIcon className="h-4 w-4 mr-2" />
                  Ver perfil
                </Button> */}
              {/*   <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex-1 ">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contatar
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Mail className="h-4 w-4 mr-2" />
                      Enviar e-mail
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Enviar mensagem
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu> 
              </CardFooter> */}
            </Card>
          ))}
        </div>
      )}

      {/* Participant Detail Dialog */}
      {selectedParticipant && (
        <ParticipantDetailDialog
          participant={selectedParticipant}
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
        />
      )}
    </div>
  );
}
