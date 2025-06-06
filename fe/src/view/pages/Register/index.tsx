import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import personalDataIcon from "@/assets/images/personalDataIcon.png";
import { PhoneInput } from "@/components/ui/phone-input";
import { useRegister } from "./useRegister";
import { Controller } from "react-hook-form";
import { EmailVerificationPending } from "../EmailVerificationPending";
import { cn } from "@/lib/utils";
import TermsDialog from "./components/TermsDialog";

export default function Register() {
  const {
    errors,
    handleSubmit,
    register,
    isLoading,
    control,
    pendingEmail,
    isDialogTermsOpen,
    handleChangeDialogTerms,
    handleChangeTerms,
  } = useRegister();
  return (
    <>
      {!pendingEmail && (
        <div className={cn(" w-full h-full flex")}>
          <>
            {" "}
            <div className="h-1/2 bg-primary absolute w-full flex flex-col items-center justify-start p-10">
              <div className="flex flex-col gap-2 justify-center items-center">
                {" "}
                <h1 className="text-3xl font-semibold text-white md:pt-10">
                  Cadastro
                </h1>
                <p className="text-white tracking-tighter">
                  Preencha corretamente o formulário e participe do Inova
                  Conterp {new Date().getFullYear()}
                </p>
              </div>
            </div>
            {/* Bottom background */}
            <div className="h-1/2 bg-gray-50 absolute bottom-0 w-full" />
            <div className="w-full relative my-auto mt-48 pt-6 md:pt-12 pb-12 px-4 max-w-4xl mx-auto bg-white rounded-md shadow-md">
              <div className=" items-center flex flex-col gap-4 pb-6 ">
                <div className="bg-yellow-400 rounded-full p-3">
                  <img
                    src={personalDataIcon}
                    alt="personal data"
                    className="h-10 w-10"
                  />
                </div>
                <span className="ml-2 text-sm font-medium">Dados pessoais</span>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-2 gap-y-6">
                  <div className="flex flex-col gap-2 w-full md:col-span-6 ">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      type="text"
                      required
                      {...register("name")}
                      error={errors.name?.message}
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full  md:col-span-3 ">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input
                      id="cpf"
                      type="text"
                      required
                      {...register("cpf")}
                      error={errors.cpf?.message}
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full  md:col-span-3 ">
                    <Label htmlFor="phone">Telefone (DDD + Número)</Label>

                    <Controller
                      name="phone"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <PhoneInput
                          defaultCountry="BR"
                          onChange={onChange}
                          value={value}
                        />
                      )}
                    />
                    {errors.phone?.message && (
                      <p className="text-red-700 text-sm">
                        {errors.phone?.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 w-full md:col-span-6">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      {...register("email")}
                      error={errors.email?.message}
                    />
                  </div>

                  <div className="flex flex-col gap-2 w-full md:col-span-6">
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      {...register("password")}
                      error={errors.password?.message}
                    />
                  </div>

                  <TermsDialog
                    onOpenChange={handleChangeDialogTerms}
                    open={isDialogTermsOpen}
                    initialAgreed={false}
                    onAgreementChange={handleChangeTerms}
                    isLoading={isLoading}
                    onSubmit={handleSubmit}
                  />

                  <div className="flex flex-col gap-4 w-full md:col-start-10 md:col-span-3 ">
                    <Button
                      type="button"
                      isLoading={isLoading}
                      disabled={isLoading}
                      onClick={() => handleChangeDialogTerms(true)}
                    >
                      Proximo
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </>
        </div>
      )}
      {pendingEmail && <EmailVerificationPending email={pendingEmail} />}
    </>
  );
}
