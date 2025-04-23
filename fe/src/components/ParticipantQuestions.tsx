"use client";

import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  SendHorizontal,
  MessageCircle,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Question, StatusQuestion } from "@/app/entities/Question";
import { handleAxiosError } from "@/app/utils/handleAxiosError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationKeys } from "@/app/config/mutationKeys";
import { questionsService } from "@/app/services/questionsService";
import { useToast } from "@/hooks/use-toast";
import { queryKeys } from "@/app/config/queryKeys";

interface ParticipantQuestionsProps {
  questions: Question[];
  currentUserId: string;
  onSubmitResponse: (questionId: string, response: string) => void;
}

export function ParticipantQuestions({
  questions,
  onSubmitResponse,
}: ParticipantQuestionsProps) {
  const [responses, setResponses] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const handleResponseChange = (questionId: string, value: string) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const { isPending: isLoading, mutateAsync } = useMutation({
    mutationKey: [mutationKeys.QUESTION],
    mutationFn: questionsService.update,
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: [queryKeys.PROJECTS] });
    },
  });

  const handleSubmitResponse = async (questionId: string) => {
    const response = responses[questionId];
    if (!response?.trim()) return;

    onSubmitResponse(questionId, response.trim());
    try {
      await mutateAsync({
        response,
        questionId,
      });

      toast({
        variant: "default",
        title: "Resposta enviada com sucesso!",
        description:
          "Você pode acompanhar as perguntas no painel de detalhes do projeto.",
        duration: 5000,
      });
    } catch (error) {
      handleAxiosError(error);
    }

    // Reset response
    setResponses((prev) => ({
      ...prev,
      [questionId]: "",
    }));
  };

  // Status configuration
  const statusConfig: Record<
    string,
    { label: string; icon: ReactNode; color: string }
  > = {
    [StatusQuestion.SUBMITED]: {
      label: "Aguardando resposta",
      icon: <AlertCircle className="h-3 w-3" />,
      color: "bg-amber-100 text-amber-700",
    },
    [StatusQuestion.ANSWERED]: {
      label: "Respondida",
      icon: <CheckCircle className="h-3 w-3" />,
      color: "bg-green-100 text-green-700",
    },
    [StatusQuestion.PENDING]: {
      label: "Pendente",
      icon: <Clock className="h-3 w-3" />,
      color: "bg-blue-100 text-blue-700",
    },
  };

  // Separate questions by status
  const pendingQuestions = questions.filter(
    (q) => q.status !== StatusQuestion.ANSWERED
  );
  const answeredQuestions = questions.filter(
    (q) => q.status === StatusQuestion.ANSWERED
  );

  if (questions.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed">
        <MessageCircle className="h-10 w-10 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-500">
          Você ainda não recebeu nenhuma pergunta do comitê avaliativo.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="pending">
            Pendentes{" "}
            {pendingQuestions.length > 0 && `(${pendingQuestions.length})`}
          </TabsTrigger>
          <TabsTrigger value="answered">
            Respondidas{" "}
            {answeredQuestions.length > 0 && `(${answeredQuestions.length})`}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingQuestions.length === 0 ? (
            <div className="text-center py-6 bg-gray-50 rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-gray-600">
                Não há perguntas pendentes para responder.
              </p>
            </div>
          ) : (
            pendingQuestions.map((question) => (
              <Card key={question.id} className="border-amber-200">
                <CardHeader className="pb-2 pt-4 px-4 bg-amber-50 rounded-t-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium">
                        <span className="text-gray-700">De:</span>{" "}
                        {question.author.name} (Comitê Avaliativo)
                      </p>
                      <p className="text-xs text-gray-500">
                        {format(
                          new Date(question.createdAt),
                          "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
                          { locale: ptBR }
                        )}
                      </p>
                    </div>
                    <Badge
                      className={`${
                        statusConfig[question.status].color
                      } font-normal`}
                      variant="outline"
                    >
                      <span className="flex items-center gap-1">
                        {statusConfig[question.status].icon}
                        {statusConfig[question.status].label}
                      </span>
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="py-3 px-4">
                  <div className="bg-white p-3 rounded-md border">
                    <p className="text-gray-800">{question.text}</p>
                  </div>
                </CardContent>

                <CardFooter className="pt-2 pb-4 px-4 border-t bg-gray-50 rounded-b-lg">
                  <div className="w-full space-y-2">
                    <Textarea
                      placeholder="Digite sua resposta..."
                      value={responses[question.id] || ""}
                      onChange={(e) =>
                        handleResponseChange(question.id, e.target.value)
                      }
                      className="min-h-[100px] bg-white"
                    />
                    <Button
                      onClick={() => handleSubmitResponse(question.id)}
                      disabled={!responses[question.id]?.trim()}
                      className="w-full"
                    >
                      <SendHorizontal className="mr-2 h-4 w-4" />
                      Enviar resposta
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="answered" className="space-y-4">
          {answeredQuestions.length === 0 ? (
            <div className="text-center py-6 bg-gray-50 rounded-lg">
              <p className="text-gray-600">
                Você ainda não respondeu nenhuma pergunta.
              </p>
            </div>
          ) : (
            answeredQuestions.map((question) => (
              <Card key={question.id} className="border-green-200">
                <CardHeader className="pb-2 pt-4 px-4 bg-green-50 rounded-t-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium">
                        <span className="text-gray-700">De:</span>{" "}
                        {question.author.name} (Comitê Avaliativo)
                      </p>
                      <p className="text-xs text-gray-500">
                        {format(
                          new Date(question.createdAt),
                          "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
                          { locale: ptBR }
                        )}
                      </p>
                    </div>
                    <Badge
                      className={`${
                        statusConfig[question.status].color
                      } font-normal`}
                      variant="outline"
                    >
                      <span className="flex items-center gap-1">
                        {statusConfig[question.status].icon}
                        {statusConfig[question.status].label}
                      </span>
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="py-3 px-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">
                        Pergunta:
                      </p>
                      <div className="bg-white p-3 rounded-md border">
                        <p className="text-gray-800">{question.text}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">
                        Sua resposta:
                      </p>
                      <div className="bg-green-50 p-3 rounded-md border border-green-200">
                        <p className="text-gray-800">{question.response}</p>
                      </div>
                      {question.respondedAt && (
                        <p className="text-xs text-gray-500 mt-1">
                          Respondido em{" "}
                          {format(
                            new Date(question.respondedAt),
                            "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
                            {
                              locale: ptBR,
                            }
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
