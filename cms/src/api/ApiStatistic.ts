import { downloadFile, fetcher } from "./Fetcher";

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

function getRoomStatisticInCurrentWeek(
  roomId?: string,
): Promise<IRoomStatisticInCurrentWeekRes[]> {
  return fetcher({ url: `/stats/stats-room/${roomId}`, method: "get" });
}

function getRevenueStatistic(
  params: IRevenueStatisticParams,
): Promise<IRevenueStatisticRes[]> {
  return fetcher({ url: "/stats/revenue", method: "get", params });
}

function exportExcelService(params: IGetServiceStatisticParams) {
  return downloadFile({
    url: "/stats/export-excel-service",
    params,
    fileName: `export_excel_service_${params.day ?? ""}_${params.month ?? ""}_${
      params.year
    }`,
  });
}

function exportExcelRoom(params: IGetRoomStatisticParams) {
  return downloadFile({
    url: "/stats/export-excel-room",
    params,
    fileName: `export_excel_room_${params.day ?? ""}_${params.month ?? ""}_${
      params.year
    }`,
  });
}

function exportExcelRevenue(params: IRevenueStatisticParams) {
  return downloadFile({
    url: "/stats/export-excel-revenue",
    params,
    fileName: `export_excel_revenue_${params.year}`,
  });
}

export default {
  getServiceStatistic,
  getRoomStatistic,
  getRoomStatisticInCurrentWeek,
  getRevenueStatistic,
  exportExcelService,
  exportExcelRoom,
  exportExcelRevenue,
};
