import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import {
  MessageCircle,
  CheckCircle,
  Clock,
  AlertCircle,
  User,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Question, StatusQuestion } from "@/app/entities/Question";
import { ReactNode } from "react";

interface EvaluatorQuestionsListProps {
  questions: Question[];
  currentUserId: string;
}

export function EvaluatorQuestionsList({
  questions,
  currentUserId,
}: EvaluatorQuestionsListProps) {
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

  // Filter questions created by the current user (evaluator)
  const evaluatorQuestions = questions.filter(
    (q) => q.authorId === currentUserId
  );

  // Separate questions by status
  const pendingQuestions = evaluatorQuestions.filter(
    (q) => q.status !== StatusQuestion.ANSWERED
  );
  const answeredQuestions = evaluatorQuestions.filter(
    (q) => q.status === StatusQuestion.ANSWERED
  );

  // All questions (including those from other evaluators)
  const allQuestions = questions.filter((q) => q.authorId !== currentUserId);

  if (questions.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed">
        <MessageCircle className="h-10 w-10 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-500">
          Nenhuma pergunta foi feita para este projeto ainda.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="mine" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="mine">
            Minhas perguntas{" "}
            {evaluatorQuestions.length > 0 && `(${evaluatorQuestions.length})`}
          </TabsTrigger>
          <TabsTrigger value="pending">
            Aguardando{" "}
            {pendingQuestions.length > 0 && `(${pendingQuestions.length})`}
          </TabsTrigger>
          <TabsTrigger value="all">
            Todas {questions.length > 0 && `(${questions.length})`}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mine" className="space-y-4">
          {evaluatorQuestions.length === 0 ? (
            <div className="text-center py-6 bg-gray-50 rounded-lg">
              <p className="text-gray-600">
                Você ainda não fez nenhuma pergunta para este projeto.
              </p>
            </div>
          ) : (
            evaluatorQuestions.map((question) => (
              <Card
                key={question.id}
                className={
                  question.status === StatusQuestion.ANSWERED
                    ? "border-green-200"
                    : "border-amber-200"
                }
              >
                <CardHeader
                  className={`pb-2 pt-4 px-4 ${
                    question.status === StatusQuestion.ANSWERED
                      ? "bg-green-50"
                      : "bg-amber-50"
                  } rounded-t-lg`}
                >
                  <div className="flex justify-between items-start">
                    <div>
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
                        statusConfig[question.status as StatusQuestion].color
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
                        Sua pergunta:
                      </p>
                      <div className="bg-white p-3 rounded-md border">
                        <p className="text-gray-800">{question.text}</p>
                      </div>
                    </div>

                    {question.response && (
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">
                          Resposta do participante:
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
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {pendingQuestions.length === 0 ? (
            <div className="text-center py-6 bg-gray-50 rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-gray-600">
                Todas as suas perguntas foram respondidas.
              </p>
            </div>
          ) : (
            pendingQuestions.map((question) => (
              <Card key={question.id} className="border-amber-200">
                <CardHeader className="pb-2 pt-4 px-4 bg-amber-50 rounded-t-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium">
                        <span className="text-gray-700">Para:</span> Ninguem
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
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {allQuestions.length === 0 ? (
            <div className="text-center py-6 bg-gray-50 rounded-lg">
              <p className="text-gray-600">
                Não há perguntas de outros avaliadores.
              </p>
            </div>
          ) : (
            allQuestions.map((question) => (
              <Card
                key={question.id}
                className={
                  question.status === StatusQuestion.ANSWERED
                    ? "border-green-200"
                    : "border-amber-200"
                }
              >
                <CardHeader
                  className={`pb-2 pt-4 px-4 ${
                    question.status === StatusQuestion.ANSWERED
                      ? "bg-green-50"
                      : "bg-amber-50"
                  } rounded-t-lg`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5 text-gray-500" />
                        <p className="text-sm font-medium">
                          {question.author.name}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        <span className="text-gray-700">Para:</span> Ninguem
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

                    {question.response && (
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">
                          Resposta do participante:
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
                    )}
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
