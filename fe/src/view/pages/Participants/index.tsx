"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Mail,
  Phone,
  Briefcase,
  Award,
  MessageCircle,
  User as UserIcon,
  UserPlus,
  FileSpreadsheet,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ParticipantDetailDialog } from "@/components/ParticipantDetailDialog";
import { ProjectFilters } from "@/components/ProjectFilters";
import {
  ParticipantFilters,
  ParticipantFilterState,
} from "@/components/ParticipantFilters";
import { useUsers } from "@/app/hooks/users/useUsers";
import { User } from "@/app/entities/User";
import { Spinner } from "@/components/Spinner";

interface ParticipantsProps {}

export default function Participants({}: ParticipantsProps) {
  const [selectedParticipant, setSelectedParticipant] = useState<User | null>(
    null
  );
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [filters, setFilters] = useState<ParticipantFilterState>({
    name: "",
    base: [],
  });

  const { users, refechUsers, isFetchingUsers } = useUsers(filters);

  useEffect(() => {
    refechUsers();
  }, [filters]);

  // Sample participants (in a real app, these would come from an API)
  /*   const users: Participant[] = [
    {
      id: "1",
      name: "Felipe Marques",
      email: "felipe@example.com",
      phone: "(11) 98765-4321",
      department: "TI",
      role: "Líder",
      projectCount: 2,
      questionCount: 3,
    },
    {
      id: "2",
      name: "João Carser",
      email: "joao@example.com",
      phone: "(11) 91234-5678",
      department: "TI",
      role: "Membro",
      projectCount: 1,
      questionCount: 1,
    },
    {
      id: "3",
      name: "Lazaro Miranda",
      email: "lazaro@example.com",
      phone: "(11) 99876-5432",
      department: "TI",
      role: "Membro",
      projectCount: 1,
      questionCount: 0,
    },
    {
      id: "4",
      name: "Raimundo Filho",
      email: "raimundo@example.com",
      phone: "(11) 95555-4444",
      department: "OPERACOES",
      role: "Líder",
      projectCount: 1,
      questionCount: 2,
    },
    {
      id: "5",
      name: "Ramon Nascimento",
      email: "ramon@example.com",
      phone: "(11) 94444-3333",
      department: "OPERACOES",
      role: "Membro",
      projectCount: 1,
      questionCount: 0,
    },
    {
      id: "6",
      name: "Rubens de Jesus",
      email: "rubens@example.com",
      phone: "(11) 93333-2222",
      department: "OPERACOES",
      role: "Membro",
      projectCount: 1,
      questionCount: 0,
    },
    {
      id: "7",
      name: "Lili Oliveira",
      email: "lili@example.com",
      phone: "(11) 92222-1111",
      department: "RH",
      role: "Líder",
      projectCount: 1,
      questionCount: 1,
    },
  ]; */

  const handleViewDetails = (participant: User) => {
    setSelectedParticipant(participant);
    setIsDetailOpen(true);
  };

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

  const translatedDepartments = [
    { value: "TI", label: "Tecnologia da Informação" },
    { value: "OPERACOES", label: "Operações" },
    { value: "RH", label: "Recursos Humanos" },
  ];

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
