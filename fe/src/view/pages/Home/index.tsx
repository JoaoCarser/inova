import { useCurrentPeriod } from "@/app/hooks/periods/useCurrentPeriod";
import { usePeriods } from "@/app/hooks/periods/usePeriods";
import { useAuth } from "@/app/hooks/useAuth";
import { PeriodTimeline } from "@/components/period-timeline";
import { Spinner } from "@/components/Spinner";

export default function Home() {
  const { currentPeriod, isFetchingCurrenPeriod, refechCurrenPeriod } =
    useCurrentPeriod();

  const { isFetchingPeriods, periods, refechPeriods } = usePeriods();

  const { user } = useAuth();

  return (
    <>
      {isFetchingCurrenPeriod ||
        (isFetchingPeriods && (
          <div className="p-6  w-full h-full flex justify-center items-center">
            <Spinner />
          </div>
        ))}

      {!isFetchingPeriods && !isFetchingCurrenPeriod && (
        <div className="p-6">
          <h1 className="text-2xl font-bold">Bem vindo ao Portal Inova, {user?.name}</h1>
          <p className="text-lg text-green-600 mt-2">
            Aqui você acompanha todas as etapas do concurso Inova Conterp
          </p>

          <div className="mt-12 border border-primary-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Concurso 2024</h2>
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-700">Progresso do seu projeto</p>
              <span className="text-gray-700">
                {currentPeriod
                  ? periods.findIndex((p) => p.id === currentPeriod.id) + 1
                  : 1}
                /{periods.length}
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
              <div
                className="bg-yellow-400 h-2.5 rounded-full"
                style={{
                  width: `${
                    currentPeriod
                      ? ((periods.findIndex((p) => p.id === currentPeriod.id) + 1) /
                          periods.length) *
                        100
                      : (1 / periods.length) * 100
                  }%`,
                }}
              />
            </div>

            <PeriodTimeline periods={periods} currentPeriod={currentPeriod} />
          </div>
        </div>
      )}
    </>
  );
}
