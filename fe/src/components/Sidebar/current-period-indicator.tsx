import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarClock } from "lucide-react";
import { periodTypeLabels } from "@/app/entities/Period";
import { useSidebar } from "../ui/sidebar";
import { cn } from "@/lib/utils";
import { useCurrentEdition } from "@/app/hooks/useCurrentEdition";

export function CurrentPeriodIndicator() {
  const { currentEdition, currentPeriod } = useCurrentEdition();

  if (!currentPeriod) {
    return (
      <div className="text-center py-2">
        <Badge variant="outline" className="bg-gray-100 text-gray-700">
          Nenhum período ativo
        </Badge>
      </div>
    );
  }

  const { state } = useSidebar();

  return (
    <div
      className={cn(
        "space-y-2  p-2  border rounded-sm",
        state === "collapsed" && "hidden"
      )}
    >
      <div className="flex items-center text-sm text-muted">
        <CalendarClock className="h-4 w-4 mr-1" />
        <span>Período Atual:</span>
      </div>

      <div className="space-y-1">
        <Badge variant="secondary">
          {periodTypeLabels[currentPeriod.type]}
        </Badge>

        <div className="font-medium text-sm">{currentPeriod.title}</div>

        <div className="text-xs text-muted">
          {format(new Date(currentPeriod.startDate), "dd/MM", { locale: ptBR })}{" "}
          -{" "}
          {format(new Date(currentPeriod.endDate), "dd/MM/yyyy", {
            locale: ptBR,
          })}
        </div>

        <div className="text-xs font-medium ">{currentEdition?.title}</div>
      </div>
    </div>
  );
}
