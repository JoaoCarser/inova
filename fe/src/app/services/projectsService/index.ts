import { create } from "./create";
import { getAll } from "./getAll";
import { getAllByUserId } from "./getAllByUserId";
import { getById } from "./getById";
import { remove } from "./remove";

export const projectsService = {
  create,
  remove,
  getAllByUserId,
  getAll,
  getById,
};
