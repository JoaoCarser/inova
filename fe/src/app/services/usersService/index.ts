import { getAll } from "./getAll";
import { getByCpf } from "./getByCpf";
import { me } from "./me";

export const usersService = {
  me: me,
  getByCpf: getByCpf,
  getAll,
};
