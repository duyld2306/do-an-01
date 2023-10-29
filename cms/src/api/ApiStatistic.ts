import { fetcher } from "./Fetcher";

export interface IGetServiceStatisticParams {
  year: number;
  month?: number;
  day?: number;
}

interface IServiceStatisticRes {
  name: string;
  value: number;
}

export interface IGetRoomStatisticParams {
  year: number;
  month?: number;
  day?: number;
}

interface IRoomStatisticRes {
  name: string;
  value: number;
  type: string;
}

interface IRoomStatisticInCurrentWeekRes {
  type: string;
  value: number;
  name: string;
}

export interface IRevenueStatisticParams {
  year: number;
}

interface IRevenueStatisticRes {
  type: string;
  value: number;
}

function getServiceStatistic(
  params: IGetServiceStatisticParams,
): Promise<IServiceStatisticRes[]> {
  return fetcher({ url: "/stats/stats-service", method: "get", params });
}

function getRoomStatistic(
  params: IGetRoomStatisticParams,
): Promise<IRoomStatisticRes[]> {
  return fetcher({ url: "/stats/stats-rooms", method: "get", params });
}

function getRoomStatisticInCurrentWeek(): Promise<
  IRoomStatisticInCurrentWeekRes[]
> {
  return fetcher({ url: "/stats/stats-room", method: "get" });
}

function getRevenueStatistic(
  params: IRevenueStatisticParams,
): Promise<IRevenueStatisticRes[]> {
  return fetcher({ url: "/stats/revenue", method: "get", params });
}

export default {
  getServiceStatistic,
  getRoomStatistic,
  getRoomStatisticInCurrentWeek,
  getRevenueStatistic,
};
