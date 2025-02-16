import axios from "axios";

import { setupInterceptorsTo } from "../../../interceptors";
import { BASE_URL } from "./urls";

setupInterceptorsTo(axios);

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_APP_KENDO_KEY,
    //other headers like authorization token
  },
  timeout: 2000,
});

//additioanl request interceptor
// export const setInterceptors = (contentType: string, token?: string) => {
//   apiClient.interceptors.request.use(
//     (config) => {
//       //additional request headers can be added here
//       return config;
//     },
//     (error) => {
//       if (!(error instanceof Error)) {
//         const newError = new Error("An unknown error occurred");
//         (newError as any).originalError = error;
//         return Promise.reject(newError);
//       }
//       return Promise.reject(error);
//     }
//   );
// };

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) {
      //Network Error
      return Promise.reject(error);
    }

    const {
      config,
      response: { status },
    } = error;

    const maxRetries = 3;

    //if 404 - not found error
    if (status === 404) {
      config.__retryCount = config.__retryCount || 0;

      if (config.__retryCount < maxRetries) {
        config.__retryCount += 1;
        console.log(`Retrying request... Attempt ${config.__retryCount}`);

        await new Promise((resolve) =>
          setTimeout(resolve, 3000 * config.__retryCount)
        );

        return apiClient(config);
      }
    }

    return Promise.reject(error);
  }
);

// API methods
const GET = (url: string, config = {}) => {
  return apiClient.get(url, config);
};

// Export API methods

export { GET };
