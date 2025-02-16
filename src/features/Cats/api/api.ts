import { Envelope, GetCatsParams } from "../types";
import { GET } from "./apiClient";
import { BASE_URL } from "./urls";

export const getCats = (params: GetCatsParams): Promise<Envelope> =>
  GET(
    `${BASE_URL}?limit=${params.limit}&page=${params.pageNo}&has_breeds=true&breed_ids=${params.breedId}`
  );
