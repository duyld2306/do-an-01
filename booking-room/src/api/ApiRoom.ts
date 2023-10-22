import { fetcher } from "./Fetcher";

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

export interface IBookRoomBody {
  firstName: string;
  lastName: string;
  sex: string;
  email: string;
  tel: string;
  checkin: string;
  checkout: string;
  idRoom: string;
  paymentType: string;
}

const getRooms = (params?: IGetIRoomsParams): Promise<IGetRoomsRes> => {
  return fetcher({ method: "get", url: "/room/list", params });
};

const getRoom = (slug: string): Promise<IRoomRes> => {
  return fetcher({ method: "get", url: `/room/${slug}` });
};

const bookRoom = (data: IBookRoomBody): Promise<{ link: string }> => {
  return fetcher({ method: "post", url: "booking/client-booking", data });
};

export default {
  getRooms,
  getRoom,
  bookRoom,
};
