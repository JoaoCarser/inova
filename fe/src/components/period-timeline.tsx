"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  CalendarClock,
  ClipboardCheck,
  FileEdit,
  Lock,
  Star,
  XCircle,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Period } from "@/app/entities/Period";
import { useNavigate } from "react-router-dom";

interface PeriodTimelineProps {
  periods: Period[];
  currentPeriod: Period | null;
}

export function PeriodTimeline({ periods, currentPeriod }: PeriodTimelineProps) {
  const [expandedPeriod, setExpandedPeriod] = useState<string | null>(
    currentPeriod?.id || null
  );

  const navigate = useNavigate();

  const getIconForPeriodType = (type: string) => {
    switch (type) {
      case "SUBSCRIPTION":
        return <FileEdit className="w-5 h-5" />;
      case "AVALIATION":
        return <ClipboardCheck className="w-5 h-5" />;
      case "RESUBSCRIPTION":
        return <FileEdit className="w-5 h-5" />;
      case "REAVALIATION":
        return <ClipboardCheck className="w-5 h-5" />;
      case "FINAL":
        return <Star className="w-5 h-5" />;
      case "INACTIVE":
        return <XCircle className="w-5 h-5" />;
      default:
        return <CalendarClock className="w-5 h-5" />;
    }
  };

  const getPeriodTitle = (type: string) => {
    switch (type) {
      case "SUBSCRIPTION":
        return "Inscrição de projeto";
      case "AVALIATION":
        return "Avaliação";
      case "RESUBSCRIPTION":
        return "Reinscrição de projeto";
      case "REAVALIATION":
        return "Reavaliação";
      case "FINAL":
        return "Apresentação final";
      case "INACTIVE":
        return "Período inativo";
      default:
        return type;
    }
  };

  const isPeriodActive = (period: Period) => {
    return currentPeriod?.id === period.id;
  };

  const isPeriodPast = (period: Period) => {
    if (!currentPeriod) return false;
    const currentIndex = periods.findIndex((p) => p.id === currentPeriod.id);
    const periodIndex = periods.findIndex((p) => p.id === period.id);
    return periodIndex < currentIndex;
  };

  const isPeriodFuture = (period: Period) => {
    if (!currentPeriod) return false;
    const currentIndex = periods.findIndex((p) => p.id === currentPeriod.id);
    const periodIndex = periods.findIndex((p) => p.id === period.id);
    return periodIndex > currentIndex;
  };

  const formatDate = (date: Date) => {
    return format(new Date(date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  return (
    <div className="relative">
      <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gray-200" />

      {periods.map((period, index) => {
        const isActive = isPeriodActive(period);
        const isPast = isPeriodPast(period);
        const isFuture = isPeriodFuture(period);
        const isExpanded = expandedPeriod === period.id;

        return (
          <div key={period.id} className="relative mb-6">
            <div className="flex items-start">
              <div
                className={`z-10 flex items-center justify-center w-12 h-12 rounded-full ${
                  isActive ? "bg-yellow-400" : isPast ? "bg-gray-200" : "bg-gray-100"
                } mr-4`}
              >
                {isFuture ? (
                  <Lock className="w-5 h-5 text-gray-500" />
                ) : (
                  <div className={`${isActive ? "text-white" : "text-gray-500"}`}>
                    {getIconForPeriodType(period.type)}
                  </div>
                )}
              </div>

              <div
                className={`flex-1 p-4 border rounded-lg ${
                  isActive ? "border-yellow-400 bg-yellow-50" : "border-gray-200"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3
                      className={`text-lg font-medium ${
                        isActive ? "text-yellow-700" : "text-gray-700"
                      }`}
                    >
                      {getPeriodTitle(period.type)}
                    </h3>
                    {isActive && (
                      <p className="text-sm text-gray-600">{period.description}</p>
                    )}
                  </div>

                  {isActive && (
                    <Button
                      className="bg-yellow-400 hover:bg-yellow-500 text-white"
                      onClick={() => navigate("/projects")}
                    >
                      Meus projetos
                    </Button>
                  )}
                </div>

                {isExpanded && (
                  <div className="mt-3 text-sm text-gray-600">
                    {!isActive && <p>{period.description}</p>}
                  </div>
                )}

                <div className="mt-3 text-sm text-gray-600">
                  <p className="mt-2">
                    <span className="font-medium">Período:</span>{" "}
                    {formatDate(period.startDate)} até {formatDate(period.endDate)}
                  </p>
                </div>

                {!isExpanded && !isActive && (
                  <button
                    onClick={() => setExpandedPeriod(period.id)}
                    className="text-sm text-gray-500 hover:text-gray-700 mt-1"
                  >
                    Ver detalhes
                  </button>
                )}

                {isExpanded && (
                  <button
                    onClick={() => setExpandedPeriod(null)}
                    className="text-sm text-gray-500 hover:text-gray-700 mt-1"
                  >
                    Ocultar detalhes
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
