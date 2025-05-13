import { toast } from "@/hooks/use-toast";
import { AxiosError } from "axios";

export const handleAxiosError = (error: any) => {
  console.log(error);
  if (error instanceof AxiosError) {
    if (error.response && error.response.status >= 400 && error.response.status <= 499) {
      toast({
        variant: "destructive",
        title: "Ocorreu um erro!",
        description: error.response.data.message,
        duration: 5000,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Ocorreu um erro!",
        description: "Por favor, tente novamente.",
      });
    }
  }
};
