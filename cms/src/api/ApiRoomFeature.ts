import { fetcher } from "./Fetcher";

export interface IGetRoomFeaturesParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string[];
  filter?: string;
}

export interface IRoomFeatureRes {
  id: number;
  name: string;
}

export interface IGetRoomFeaturesRes {
  metadata: {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
  results: IRoomFeatureRes[];
}

function getRoomFeatures(
  params?: IGetRoomFeaturesParams,
): Promise<IGetRoomFeaturesRes> {
  return fetcher({ url: "room/list-feature-room", method: "get", params });
}

export default {
  getRoomFeatures,
};
