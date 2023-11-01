import Notification from "@/components/Notification";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface IFetcherOptions {
  token?: string;
  withToken?: boolean;
  displayError?: boolean;
  isFormData?: boolean;
}

export interface IResponseDTOWithMetaData<T> {
  data: T;
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
    const { errorCode, errorMessage } = dataError;
    Notification.notificationError(errorMessage || errorCode);
  } catch (e) {
    console.warn(e);
    Notification.notificationError("Something is wrong. Please try again");
  }
}

export function fetcher<T>(
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
    baseURL: "http://localhost:8080/api/v1",
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
      .request<T, AxiosResponse<IResponseDTOWithMetaData<T>>>(config)
      .then(async (response) => {
        if (response.data.success) {
          if (response.data.data === undefined) {
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
          resolve(response.data.data);
          return;
        }
        const dataError: IDataError = {
          errorCode: response.data.errorCode,
          errorMessage: response.data.message,
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
