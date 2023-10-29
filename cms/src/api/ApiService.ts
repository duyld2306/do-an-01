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

export interface ICreateServiceBody {
  name: string;
  unity: string;
  price: number;
  description: string;
}

export interface IUpdateServiceBody {
  id: string;
  body: ICreateServiceBody;
}

function getServices(params?: IGetServicesParams): Promise<IGetServicesRes> {
  return fetcher({ url: "services/list", method: "get", params });
}

function createService(data: ICreateServiceBody) {
  return fetcher({ url: "/services", method: "post", data });
}

function updateService(data: IUpdateServiceBody) {
  return fetcher({
    url: `/services/${data.id}`,
    method: "put",
    data: data.body,
  });
}

export default {
  getServices,
  createService,
  updateService,
};
