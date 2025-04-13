import { create } from "./create";
import { getAllByUserId } from "./getAllByUserId";
import { remove } from "./remove";

export const projectsService = {
  create,
  remove,
  getAllByUserId,
};
