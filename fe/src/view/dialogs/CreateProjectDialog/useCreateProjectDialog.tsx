import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  title: z.string().min(1, "Título do projeto é obrigatório."),
  department: z.string().min(1, "Setor é obrigatório."),
  description: z.string().min(1, "Descrição do projeto é obrigatório."),
  link: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export const useCreateProjectDialog = () => {
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  console.log(errors);

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    alert(JSON.stringify(data));
  });

  return { handleSubmit, register, errors, control };
};
