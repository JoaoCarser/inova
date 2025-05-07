import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, validateSync } from 'class-validator';

//Criação da classe, do tipo do objeto que vamos criar para validar. E adicionamos os decorators necessários.
class Env {
  @IsString()
  @IsNotEmpty()
  //@NotEquals() Talvez adicione para não utilizar a mesma string do ambiaente de desenvolvimento.
  jwtSecret: string;

  @IsString()
  @IsNotEmpty()
  //@NotEquals() Talvez adicione para não utilizar a mesma string do ambiaente de desenvolvimento.
  dbURL: string;

  @IsString()
  @IsNotEmpty()
  //@NotEquals() Talvez adicione para não utilizar a mesma string do ambiaente de desenvolvimento.
  emailPasswordPass: string;

  @IsString()
  @IsNotEmpty()
  //@NotEquals() Talvez adicione para não utilizar a mesma string do ambiaente de desenvolvimento.
  emailAccount: string;

  @IsString()
  @IsNotEmpty()
  //@NotEquals() Talvez adicione para não utilizar a mesma string do ambiaente de desenvolvimento.
  frontendUrl: string;
}

//Criando um objeto que possui um atributo com a string que está no .env, porém
//para validar se o objeto é valido (óbivo) usamos a classe acima e utilizamos o metodo plain to instance para "instanciar"
//a partir de um objeto.
export const env: Env = plainToInstance(Env, {
  dbURL: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  emailPasswordPass: process.env.EMAIL_PASSWORD_PASS,
  emailAccount: process.env.EMAIL_ACCOUNT,
  frontendUrl: process.env.FRONTEND_URL,
});

console.log(env);

//Médotod para validar o objeto
const errors = validateSync(env);

if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 2));
}
