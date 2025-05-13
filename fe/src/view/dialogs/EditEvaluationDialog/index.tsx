"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Project } from "@/app/entities/Project";
import { StarRating } from "../../../components/StarRating";
import { cn } from "@/lib/utils";
import { EvaluationCriterion } from "@/app/entities/EvaluationCriterion";
import { EvaluationCriterionName } from "@/app/entities/EvaluationCriterionName";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationKeys } from "@/app/config/mutationKeys";
import { evaluationService } from "@/app/services/evaluationService";
import { queryKeys } from "@/app/config/queryKeys";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { handleAxiosError } from "@/app/utils/handleAxiosError";
import { Evaluation } from "@/app/entities/Evaluation";

// Evaluation criteria types

// Criteria definitions with descriptions
const criteriaDefinitions = [
  {
    name: EvaluationCriterionName.STRATEGIC_ALIGNMENT,
    label: "Alinhamento Estratégico",
    description:
      "O projeto está alinhado com os objetivos estratégicos da empresa e atende a necessidades ou problemas prioritários?",
  },
  {
    name: EvaluationCriterionName.CLARITY,
    label: "Clareza e Apresentação",
    description:
      "O projeto é bem definido e os objetivos são claros? A apresentação do projeto é convincente e bem estruturada?",
  },
  {
    name: EvaluationCriterionName.TECHNICAL_FEASIBILITY,
    label: "Viabilidade Técnica",
    description:
      "O projeto é tecnicamente viável? Há um plano claro para desenvolvimento e implementação?",
  },
  {
    name: EvaluationCriterionName.INNOVATION,
    label: "Originalidade e Inovação",
    description:
      "O quão inovadora é a solução proposta? Ela representa uma melhoria significativa em relação às soluções existentes?",
  },
  {
    name: EvaluationCriterionName.IMPACT,
    label: "Impacto e Resultados",
    description:
      "Qual o potencial de impacto do projeto? Os resultados esperados justificam o investimento?",
  },
];

interface EditEvaluationDialogProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  evaluationBeingEdited: Evaluation;
}

export function EditEvaluationDialog({
  project,
  isOpen,
  onClose,
  evaluationBeingEdited,
}: EditEvaluationDialogProps) {
  const [comments, setComments] = useState(evaluationBeingEdited.comments);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [criteria, setCriteria] = useState<EvaluationCriterion[]>(
    evaluationBeingEdited.criteria.map(({ name, score }) => ({
      name: name as EvaluationCriterionName,
      score: score,
    }))
  );

  const handleRatingChange = (
    criterionName: EvaluationCriterionName,
    score: number
  ) => {
    setCriteria((prev) =>
      prev.map((criterion) =>
        criterion.name === criterionName ? { ...criterion, score } : criterion
      )
    );
  };

  const { isPending: isLoading, mutateAsync } = useMutation({
    mutationKey: [mutationKeys.UPDATE_EVALUATION],
    mutationFn: evaluationService.update,
  });
  const handleSubmit = async () => {
    // Validate that all criteria have been rated
    const unratedCriteria = criteria.filter(
      (criterion) => criterion.score === 0
    );
    if (unratedCriteria.length > 0) {
      alert("Por favor, avalie todos os critérios antes de enviar.");
      return;
    }

    // Prepare the evaluation data
    const evaluationData = {
      id: evaluationBeingEdited.id,
      projectId: project.id,
      comments,
      criteria,
    };

    try {
      await mutateAsync(evaluationData); //Retorno da mutation Function

      toast({
        variant: "default",
        title: "Avaliação editadacom sucesso!",
        description: "Você pode ver o projeto no painel de projetos.",
        duration: 5000,
      });

      onClose();
      setComments("");
      setCriteria(
        criteriaDefinitions.map((criterion) => ({
          name: criterion.name,
          score: 0,
        }))
      );
      //queryClient.invalidateQueries({ queryKey: [queryKeys.PROJECTS] });
       window.location.reload();
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const averageScore =
    criteria.reduce((sum, criterion) => sum + criterion.score, 0) /
      criteria.length || 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Avaliação do Projeto: {project.name}
          </DialogTitle>
          <DialogDescription>
            Avalie o projeto de acordo com os critérios abaixo. Cada critério
            deve receber uma nota de 1 a 5 estrelas.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8 py-4">
          {/* Criteria ratings */}
          <div className="space-y-6">
            {criteriaDefinitions.map((criterion) => (
              <div key={criterion.name} className="border-b pb-4">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <h3 className="font-medium text-base text-primary">
                      {criterion.label}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {criterion.description}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <StarRating
                      value={
                        criteria.find((c) => c.name === criterion.name)
                          ?.score || 0
                      }
                      onChange={(value) =>
                        handleRatingChange(criterion.name, value)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Comments section */}
          <div className="space-y-2">
            <h3 className="font-medium">Comentários e Observações</h3>
            <Textarea
              placeholder="Adicione comentários gerais sobre o projeto, pontos fortes, sugestões de melhoria, etc."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          {/* Summary and submit */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="font-medium">
                  Nota média: {averageScore.toFixed(1)}/5
                </h3>
                <p className="text-sm text-gray-600">
                  Baseada em {criteria.filter((c) => c.score > 0).length} de{" "}
                  {criteria.length} critérios avaliados
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={onClose}>
                  Cancelar
                </Button>
                <Button onClick={handleSubmit}>Enviar Avaliação</Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
