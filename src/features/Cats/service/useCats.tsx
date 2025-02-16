import { useCallback } from "react";
import { getCats } from "../api/api";
import { useAppStore } from "../../../store/store";
import { GetCatsParams, UseCatsOperators } from "../types";

const useCats = (): Readonly<UseCatsOperators> => {
  const setCatData = useAppStore((state) => state.setCatData);

  return {
    getCatsData: useCallback((param: GetCatsParams) => {
      const results = getCats(param)
        .then((res) => {
          setCatData(res.data);

          return "success";
        })
        .catch(() => {
          return "Err";
        });

      return results;
    }, []),
  };
};

export default useCats;
