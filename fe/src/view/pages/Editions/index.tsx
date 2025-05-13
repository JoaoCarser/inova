"use client";

import { useEffect, useState } from "react";
import { Bell, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { format, set } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Edition } from "@/app/entities/Edition";
import { useEditions } from "@/app/hooks/editions/useEditions";
import { CreateEditionDialog } from "./components/dialogs/CreateEditionDialog";
import { EditionsList } from "./EditionsList";
import { EditEditionDialog } from "./components/dialogs/EditEditionDialog";

const periodTypeColors = {
  SUBSCRIPTION: {
    bg: "bg-blue-50",
    text: "text-blue-700",
  },
  AVALIATION: {
    bg: "bg-green-50",
    text: "text-green-700",
  },
  RESUBSCRIPTION: {
    bg: "bg-yellow-50",
    text: "text-yellow-700",
  },
  REAVALIATION: {
    bg: "bg-orange-50",
    text: "text-orange-700",
  },
  FINAL: {
    bg: "bg-secondaryColor-200",
    text: "text-secondaryColor-700",
  },
};

export default function Editions() {
  const [isCreateEditionDialogOpen, setIsCreateEditionDialogOpen] =
    useState(false);
  const [isEditEditionDialogOpen, setIsEditEditionDialogOpen] = useState(false);
  const [selectedEdition, setSelectedEdition] = useState<Edition | null>(null);
  const [editions, setEditions] = useState<Edition[]>([]);

  const {
    editions: editionRes,
    isFetchingEditions,
    refechEditions,
  } = useEditions();
  useEffect(() => {
    setEditions(editionRes);
  }, [editionRes]);
  // Função para abrir o diálogo de criação/edição
  const handleOpenEditEditionDialog = (edition?: Edition) => {
    setSelectedEdition(edition || null);
    setIsEditEditionDialogOpen(true);
  };

  const handleOpenCreateEditionDialog = (edition?: Edition) => {
    setIsCreateEditionDialogOpen(true);
  };

  // Função para excluir uma edição
  const handleDeleteEdition = (id: string) => {
    setEditions(editions.filter((e) => e.id !== id));
  };

  // Obter a edição ativa
  const activeEdition = editions.find(
    (e) => e.year === new Date().getFullYear()
  );

  return (
    <div className="">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Gerenciamento de Períodos</h1>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {activeEdition && (
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          )}
        </Button>
      </div>

      {/* Edição ativa */}
      {activeEdition && (
        <Card className="mb-8 ">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <Badge className="mb-2 ">Edição Ativa</Badge>
                <CardTitle className="text-xl">{activeEdition.title}</CardTitle>
              </div>
              <Button
                variant="outline"
                onClick={() => handleOpenEditEditionDialog(activeEdition)}
              >
                Gerenciar Períodos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{activeEdition.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
              {activeEdition.periods.map((period) => (
                <div
                  key={period.id}
                  className={`p-3 rounded-md ${
                    periodTypeColors[
                      period.type as keyof typeof periodTypeColors
                    ].bg
                  } ${
                    periodTypeColors[
                      period.type as keyof typeof periodTypeColors
                    ].text
                  }`}
                >
                  <div className="font-medium">{period.title}</div>
                  <div className="text-xs mt-1">
                    {format(new Date(period.startDate), "dd/MM/yyyy", {
                      locale: ptBR,
                    })}{" "}
                    -{" "}
                    {format(new Date(period.endDate), "dd/MM/yyyy", {
                      locale: ptBR,
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ações */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Todas as Edições</h2>
        <Button onClick={() => handleOpenCreateEditionDialog()}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Edição
        </Button>
      </div>

      <EditionsList
        editions={editions}
        onEdit={handleOpenEditEditionDialog}
        onDelete={handleDeleteEdition}
      />

      {selectedEdition && (
        <EditEditionDialog
          isOpen={isEditEditionDialogOpen}
          setOpen={setIsEditEditionDialogOpen}
          edition={selectedEdition}
        />
      )}

      {/* Diálogo para criar edições */}
      <CreateEditionDialog
        isOpen={isCreateEditionDialogOpen}
        setOpen={setIsCreateEditionDialogOpen}
      />
    </div>
  );
}
