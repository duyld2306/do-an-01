import Notification from "@/components/Notification";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface IFetcherOptions {
  token?: string;
  withToken?: boolean;
  displayError?: boolean;
  isFormData?: boolean;
}

export interface IResponseDTO<T> {
  data: {
    metadata: {
      pageNumber: number;
      pageSize: number;
      totalPages: number;
      totalItems: number;
    };
    results: T;
  };
  errorCode: string;
  message: string;
  success: boolean;
}

export interface IDataError {
  errorCode: string;
  errorMessage: string;
}

function handleError(dataError: IDataError) {
  try {
    const { errorCode } = dataError;
    Notification.notificationError(errorCode);
  } catch (e) {
    console.warn(e);
    Notification.notificationError("Something is wrong. Please try again");
  }
}

export default function fetcher<T>(
  baseURL: string,
  config: AxiosRequestConfig,
  options?: IFetcherOptions
) {
  const defaultOptions: IFetcherOptions = {
    displayError: true,
    isFormData: false,
    withToken: false,
    ...options,
  };

  const apiClient = axios.create({
    baseURL,
    timeout: 30000,
    headers: {
      "Content-Type": defaultOptions.isFormData
        ? "multipart/form-data"
        : "application/json",
    },
  });

  if (defaultOptions.token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${defaultOptions.token}`;
  } else if (defaultOptions.withToken) {
    //
  }

  return new Promise<T>((resolve, reject) => {
    apiClient
      .request<T, AxiosResponse<IResponseDTO<T>>>(config)
      .then(async (response) => {
        if (response.data.success) {
          if (response.data.data.results === undefined) {
            const dataEmpty: IDataError = {
              errorCode: "ERROR???",
              errorMessage: "Data is empty",
            };
            if (defaultOptions.displayError) {
              handleError(dataEmpty);
            }
            reject(dataEmpty);
            return;
          }
          resolve(response.data.data.results);
        }
        const dataError: IDataError = {
          errorCode: response.data.errorCode,
          errorMessage: response.data.errorCode,
        };

        if (defaultOptions.displayError) {
          handleError(dataError);
        }
        reject(dataError);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const somethingsWrong: IDataError = {
            errorCode: "ERROR???",
            errorMessage: "Somethings Wrong",
          };
          const dataError: IDataError =
            (error?.response?.data as IDataError) ?? somethingsWrong;

          if (defaultOptions.displayError) {
            handleError(dataError);
          }
        }
        reject(error);
      });
  });
}
