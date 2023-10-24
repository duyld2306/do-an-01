import { ICustomerRes } from "./ApiCustomer";
import { IRoomRes } from "./ApiRoom";
import { fetcher } from "./Fetcher";

export interface IGetBookingsParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string[];
  filter?: string;
}

export interface IBookingRes {
  id: string;
  bookingDate: string;
  selloff: number;
  note: string;
  checkin: string;
  checkout: string;
  price: string;
  usedServices?: string[];
  client?: ICustomerRes;
  room?: IRoomRes;
  checkedIn: boolean;
}

export interface IGetBookingsRes {
  metadata: {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
  results: IBookingRes[];
}

function getBookings(params?: IGetBookingsParams): Promise<IGetBookingsRes> {
  return fetcher({ url: "booking/list", method: "get", params });
}

export default {
  getBookings,
};
