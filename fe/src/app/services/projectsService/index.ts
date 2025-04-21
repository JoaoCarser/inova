import { create } from "./create";
import { getAll } from "./getAll";
import { getAllByUserId } from "./getAllByUserId";
import { getById } from "./getById";
import { remove } from "./remove";
import { update } from "./update";

export const projectsService = {
  create,
  remove,
  getAllByUserId,
  getAll,
  getById,
  update,
};
