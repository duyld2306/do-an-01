import { fetcher } from "./Fetcher";

export interface IGetServicesParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string[];
  filter?: string;
}

export interface IServiceRes {
  id: string;
  name: string;
  unity: string;
  price: number;
  description: string;
  image: string;
}

export interface IGetServicesRes {
  metadata: {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
  results: IServiceRes[];
}

function getServices(params?: IGetServicesParams): Promise<IGetServicesRes> {
  return fetcher({ url: "services/list", method: "get", params });
}

function createService(data: FormData) {
  return fetcher(
    { url: "/services", method: "post", data },
    { isFormData: true },
  );
}

function updateService(data: FormData) {
  return fetcher(
    {
      url: `/services`,
      method: "put",
      data,
    },
    { isFormData: true },
  );
}

export default {
  getServices,
  createService,
  updateService,
};
