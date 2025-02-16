export type Cat = {
  breeds: {
    id: string;
    name: string;
    description: string;
    wikipedia_url: string;
  }[];
  id: string;
  url?: string;
};

export type UseCatsOperators = {
  getCatsData: (data: GetCatsParams) => Promise<string>;
};

export type GetCatsParams = {
  limit: number;
  pageNo: number;
  breedId: string;
};

export type Envelope = {
  data: Cat[];
};
