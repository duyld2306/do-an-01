import { IRoomFeatureRes } from "./ApiRoomFeature";
import { fetcher } from "./Fetcher";

export interface IGetRoomsParams {
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
  featureRooms?: IRoomFeatureRes[];
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

const getRooms = (params?: IGetRoomsParams): Promise<IGetRoomsRes> => {
  return fetcher({ method: "get", url: "/room/list", params });
};

const createRoom = (data: FormData): Promise<IGetRoomsRes> => {
  return fetcher(
    { method: "post", url: "/room/save", data },
    { isFormData: true },
  );
};

const updateRoom = (data: FormData): Promise<IGetRoomsRes> => {
  return fetcher(
    { method: "post", url: "/room/update", data },
    { isFormData: true },
  );
};

export default {
  getRooms,
  createRoom,
  updateRoom,
};
