import { fetcherWithMetaData } from "./Fetcher";

export interface IGetIRoomsParams {
  page?: number;
  limit?: number;
  sort?: string[];
  search?: string;
}

export interface IRoomRes {
  id: string;
  name: string;
  price: number;
  description: string;
  slug: string;
  images?: string[];
  featureRooms?: number[];
}

export interface IGetRoomsRes {
  metadata: {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
  results: IRoomRes[];
}

const getRooms = (params?: IGetIRoomsParams): Promise<IGetRoomsRes> => {
  return fetcherWithMetaData({ method: "get", url: "/room/list", params });
};

const createRoom = (data: FormData): Promise<IGetRoomsRes> => {
  return fetcherWithMetaData(
    { method: "post", url: "/room/save", data },
    { isFormData: true },
  );
};

const updateRoom = (data: FormData): Promise<IGetRoomsRes> => {
  return fetcherWithMetaData(
    { method: "post", url: "/room/update", data },
    { isFormData: true },
  );
};

export default {
  getRooms,
  createRoom,
  updateRoom,
};
