"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Edit,
  Trash2,
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Edition } from "@/app/entities/Edition";
import { periodTypeColors } from "@/app/entities/Period";

interface EditionsListProps {
  editions: Edition[];
  onEdit: (edition: Edition) => void;
  onDelete: (id: string) => void;
}

const periodTypeLabels = {
  registration: "Inscrições",
  submission: "Submissões",
  evaluation: "Avaliação",
  result: "Resultado",
  appeal: "Recurso",
};

export function EditionsList({
  editions,
  onEdit,
  onDelete,
}: EditionsListProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [expandedEditions, setExpandedEditions] = useState<
    Record<string, boolean>
  >({});

  // Função para confirmar exclusão
  const handleConfirmDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
      setDeleteId(null);
    }
  };

  // Função para alternar a expansão de uma edição
  const toggleExpand = (id: string) => {
    setExpandedEditions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="space-y-6">
      {editions.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed">
          <p className="text-gray-500">Nenhuma edição encontrada.</p>
        </div>
      ) : (
        editions.map((edition) => (
          <Card
            key={edition.id}
            className={
              edition.year === new Date().getFullYear()
                ? "border-purple-200"
                : ""
            }
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {edition.year === new Date().getFullYear() && (
                      <Badge className="bg-purple-100 text-purple-700">
                        Ativa
                      </Badge>
                    )}
                    <Badge variant="outline">{edition.year}</Badge>
                  </div>
                  <CardTitle className="text-xl">{edition.title}</CardTitle>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(edition)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600"
                    onClick={() => setDeleteId(edition.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Excluir
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-gray-600 mb-4">{edition.description}</p>

              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">
                    {edition.periods.length}{" "}
                    {edition.periods.length === 1 ? "período" : "períodos"}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2"
                  onClick={() => toggleExpand(edition.id)}
                >
                  {expandedEditions[edition.id] ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-1" />
                      Ocultar períodos
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-1" />
                      Ver períodos
                    </>
                  )}
                </Button>
              </div>

              {expandedEditions[edition.id] && (
                <div className="mt-4 space-y-2">
                  {edition.periods.map((period) => (
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
                      <div className="flex justify-between items-start">
                        <div>
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
                        <Badge
                          variant="outline"
                          className={
                            periodTypeColors[
                              period.type as keyof typeof periodTypeColors
                            ].border
                          }
                        >
                          {
                            periodTypeLabels[
                              //@ts-ignore
                              period.type as keyof typeof periodTypeLabels
                            ]
                          }
                        </Badge>
                      </div>
                      <p className="text-sm mt-2">{period.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>

            <CardFooter className="pt-2 border-t">
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => onEdit(edition)}
              >
                Gerenciar Períodos
              </Button>
            </CardFooter>
          </Card>
        ))
      )}

      {/* Diálogo de confirmação de exclusão */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente a
              edição e todos os seus períodos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
