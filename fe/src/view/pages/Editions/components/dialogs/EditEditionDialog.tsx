"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Plus, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { queryKeys } from "@/app/config/queryKeys";
import { mutationKeys } from "@/app/config/mutationKeys";
import { PeriodType, periodTypeLabels } from "@/app/entities/Period";
import { editionsService } from "@/app/services/editionsService";
import { Edition } from "@/app/entities/Edition";
import { DatePickerInput } from "@/components/DatePickerInput";
import { handleAxiosError } from "@/app/utils/handleAxiosError";

const periodSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  startDate: z.date(),
  endDate: z.date(),
  type: z.nativeEnum(PeriodType),
});

const schema = z.object({
  year: z.string().min(3),
  title: z.string().min(3, "Descrição deve ter no mínimo 3 caracteres"),
  description: z.string().min(10, "Descrição deve ter no mínimo 10 caracteres"),
  periods: z.array(periodSchema).min(1),
});

type FormData = z.infer<typeof schema>;

interface EditionDialogProps {
  edition: Edition | null;
  isOpen: boolean;
  className?: string;
  setOpen: (value: boolean) => void;
}

export function EditEditionDialog({
  edition,
  className,
  isOpen,
  setOpen,
}: EditionDialogProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    control,
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: edition?.title || "",
      description: edition?.description || "",
      year: edition?.year.toString(),
      periods:
        edition?.periods.map((period) => ({
          ...period,
          startDate: new Date(period.startDate),
          endDate: new Date(period.endDate),
        })) || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "periods",
  });

  console.log(errors);

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [mutationKeys.CREATE_EDITION],
    mutationFn: editionsService.update,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.EDITIONS] });
      toast({
        title: "Edição salva com sucesso!",
        duration: 4000,
      });
      setOpen(false);
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    console.log(data);

    try {
      await mutateAsync({
        ...data,
        id: edition?.id!,
        startDate: data.periods[0].startDate.toISOString(),
        endDate: data.periods[data.periods.length - 1].endDate.toISOString(),
        year: parseInt(data.year),
        periods: data.periods.map((p) => ({
          ...p,
          startDate: p.startDate.toISOString(),
          endDate: p.endDate.toISOString(),
        })),
      });
      toast({
        title: "Edição salva com sucesso!",
        duration: 4000,
      });
    } catch (error) {
      handleAxiosError(error);
    }
  });

  const addPeriod = () => {
    append({
      title: "Novo Período",
      description: "Descrição do período",
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
      type: PeriodType.SUBSCRIPTION,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild className={className}>
        <Button onClick={() => setOpen(true)}>Nova Edição</Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-screen-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{edition ? "Editar Edição" : "Nova Edição"}</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Ano</Label>
                  <Input
                    type="number"
                    {...register("year")}
                    error={errors.year?.message}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Título</Label>
                  <Input
                    type="text"
                    {...register("title")}
                    error={errors.title?.message}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label>Descrição</Label>
                <Textarea
                  {...register("description")}
                  error={errors.description?.message}
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-base">Períodos</Label>
                  <Button type="button" variant="outline" onClick={addPeriod}>
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar período
                  </Button>
                </div>

                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="border rounded-xl p-4 space-y-4 relative bg-muted/40"
                  >
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-2 text-red-500"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Remover
                    </Button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <Label>Título</Label>
                        <Input {...register(`periods.${index}.title`)} />
                        error={errors.periods?.[index]?.title?.message}
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label>Tipo</Label>
                        <Controller
                          control={control}
                          name={`periods.${index}.type`}
                          render={({ field }) => (
                            <>
                              {" "}
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Object.entries(PeriodType).map(
                                    ([key, value]) => (
                                      <SelectItem key={key} value={value}>
                                        {periodTypeLabels[value]}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectContent>
                              </Select>
                            </>
                          )}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label>Descrição</Label>
                      <Textarea
                        {...register(`periods.${index}.description`)}
                        error={errors.periods?.[index]?.description?.message}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <Label>Data de Início</Label>
                        <Controller
                          control={control}
                          name={`periods.${index}.startDate`}
                          render={({ field: { onChange, value } }) => (
                            <DatePickerInput
                              value={new Date(value)}
                              onChange={onChange}
                            />
                          )}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label>Data de Término</Label>
                        <Controller
                          control={control}
                          name={`periods.${index}.endDate`}
                          render={({ field: { onChange, value } }) => (
                            <DatePickerInput
                              value={new Date(value)}
                              onChange={onChange}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" isLoading={isPending}>
                  Salvar
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
