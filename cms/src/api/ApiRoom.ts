import { fetcherWithMetaData } from "./Fetcher";

export interface IGetIRoomsParams {
  page?: number;
  limit?: number;
  sort?: string[];
  search?: string;
}

export interface IRoomRes {
  a: number;
  b: number;
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
    { isFormData: true }
  );
};

export default {
  createRoom,
  getRooms,
};
