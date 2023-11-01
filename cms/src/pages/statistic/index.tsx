import ApiStatistic, { IGetServiceStatisticParams } from "@/api/ApiStatistic";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useMemo, useState } from "react";
import { Column } from "@ant-design/plots";
import { Divider, Space } from "antd";
import { SelectGlobal } from "@/components/AntdGlobal";
import { Pie } from "@ant-design/plots";
import { Line } from "@ant-design/plots";

function ServiceStatistic() {
  const [serviceStatisticParams, setServiceStatisticParams] =
    useState<IGetServiceStatisticParams>({
      year: moment().year(),
      month: moment().month() + 1,
      day: moment().date(),
    });

  const daysOfMonth = useMemo(() => {
    if (!serviceStatisticParams.month) {
      return [];
    }
    const daysInMonth = moment(
      `${serviceStatisticParams.year}-${serviceStatisticParams.month}`,
      "YYYY-M"
    ).daysInMonth();
    const daysArray = Array.from({ length: daysInMonth }, (_, index) => ({
      label: index + 1 + "",
      value: index + 1,
    }));
    return daysArray;
  }, [serviceStatisticParams.month, serviceStatisticParams.year]);

  const { data: serviceStatistic } = useQuery(
    ["get_service_statistic", [serviceStatisticParams]],
    () => ApiStatistic.getServiceStatistic(serviceStatisticParams)
  );

  const config = {
    data: serviceStatistic ?? [],
    xField: "name",
    yField: "value",
    label: {
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };

  return (
    <div className="service-statistic">
      <h1 className="text-center">THỐNG KÊ DOANH THU DỊCH VỤ THEO THỜI GIAN</h1>
      <div className="flex justify-end">
        <Space>
          <SelectGlobal
            placeholder="Ngày"
            options={daysOfMonth}
            value={serviceStatisticParams.day}
            onChange={(value) => {
              setServiceStatisticParams({
                ...serviceStatisticParams,
                day: value,
              });
            }}
          />
          <SelectGlobal
            placeholder="Tháng"
            options={Array.from({ length: 12 }, (_, index) => ({
              label: index + 1 + "",
              value: index + 1,
            }))}
            value={serviceStatisticParams.month}
            onChange={(value): void => {
              setServiceStatisticParams({
                ...serviceStatisticParams,
                month: value,
                day: undefined,
              });
            }}
          />
          <SelectGlobal
            placeholder="Năm"
            allowClear={false}
            options={Array.from({ length: 11 }, (_, index) => ({
              label: moment().year() - index + "",
              value: moment().year() - index,
            }))}
            value={serviceStatisticParams.year}
            onChange={(value) => {
              setServiceStatisticParams({
                ...serviceStatisticParams,
                year: value,
                month: undefined,
                day: undefined,
              });
            }}
          />
        </Space>
      </div>
      <Column {...config} />
    </div>
  );
}

function RoomStatistic() {
  const [roomStatisticParams, setRoomStatisticParams] =
    useState<IGetServiceStatisticParams>({
      year: moment().year(),
      month: moment().month() + 1,
      day: moment().date(),
    });

  const daysOfMonth = useMemo(() => {
    if (!roomStatisticParams.month) {
      return [];
    }
    const daysInMonth = moment(
      `${roomStatisticParams.year}-${roomStatisticParams.month}`,
      "YYYY-M"
    ).daysInMonth();
    const daysArray = Array.from({ length: daysInMonth }, (_, index) => ({
      label: index + 1 + "",
      value: index + 1,
    }));
    return daysArray;
  }, [roomStatisticParams.month, roomStatisticParams.year]);

  const { data: roomStatistic } = useQuery(
    ["get_room_statistic", [roomStatisticParams]],
    () => ApiStatistic.getRoomStatistic(roomStatisticParams)
  );

  const config = {
    data: roomStatistic ?? [],
    xField: "name",
    yField: "value",
    seriesField: "type",
    label: {
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };

  return (
    <div className="service-statistic">
      <h1 className="text-center">
        THỐNG KÊ DỊCH DOANH THU - LƯỢT THUÊ PHÒNG THEO THỜI GIAN
      </h1>
      <div className="flex justify-end">
        <Space>
          <SelectGlobal
            placeholder="Ngày"
            options={daysOfMonth}
            value={roomStatisticParams.day}
            onChange={(value) => {
              setRoomStatisticParams({
                ...roomStatisticParams,
                day: value,
              });
            }}
          />
          <SelectGlobal
            placeholder="Tháng"
            options={Array.from({ length: 12 }, (_, index) => ({
              label: index + 1 + "",
              value: index + 1,
            }))}
            value={roomStatisticParams.month}
            onChange={(value): void => {
              setRoomStatisticParams({
                ...roomStatisticParams,
                month: value,
                day: undefined,
              });
            }}
          />
          <SelectGlobal
            placeholder="Năm"
            allowClear={false}
            options={Array.from({ length: 11 }, (_, index) => ({
              label: moment().year() - index + "",
              value: moment().year() - index,
            }))}
            value={roomStatisticParams.year}
            onChange={(value) => {
              setRoomStatisticParams({
                ...roomStatisticParams,
                year: value,
                month: undefined,
                day: undefined,
              });
            }}
          />
        </Space>
      </div>
      <Column {...config} />
    </div>
  );
}

function RoomStatisticInCurrentWeek() {
  const { data: roomStatisticInCurrentWeek } = useQuery(
    ["get_room_statistic_in_current_week"],
    () => ApiStatistic.getRoomStatisticInCurrentWeek()
  );

  const config = {
    data: roomStatisticInCurrentWeek ?? [],
    xField: "name",
    yField: "value",
    seriesField: "type",
  };

  return (
    <div className="service-statistic">
      <h1 className="text-center">
        THỐNG KÊ DỊCH DOANH THU - LƯỢT THUÊ PHÒNG THEO TUẦN HIỆN TẠI
      </h1>
      <Line {...config} />
    </div>
  );
}

function RevenueStatistic() {
  const [revenueStatisticParams, setRevenueStatisticParams] =
    useState<IGetServiceStatisticParams>({
      year: moment().year(),
      month: moment().month() + 1,
      day: moment().date(),
    });

  const { data: revenueStatistic } = useQuery(
    ["get_revenue_statistic", [revenueStatisticParams]],
    () => ApiStatistic.getRevenueStatistic(revenueStatisticParams)
  );

  const config = {
    appendPadding: 10,
    data: revenueStatistic ?? [],
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent = 0 }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };

  return (
    <div className="service-statistic">
      <h1 className="text-center">
        THỐNG KÊ DỊCH DOANH THU KHÁCH SẠN THEO NĂM
      </h1>
      <div className="flex justify-end">
        <SelectGlobal
          placeholder="Năm"
          allowClear={false}
          options={Array.from({ length: 11 }, (_, index) => ({
            label: moment().year() - index + "",
            value: moment().year() - index,
          }))}
          value={revenueStatisticParams.year}
          onChange={(value) => {
            setRevenueStatisticParams({
              ...revenueStatisticParams,
              year: value,
              month: undefined,
              day: undefined,
            });
          }}
        />
      </div>
      <Pie {...config} />
    </div>
  );
}

export default function Statistic() {
  return (
    <div>
      <ServiceStatistic />
      <Divider />
      <RoomStatistic />
      <Divider />
      <RoomStatisticInCurrentWeek />
      <Divider />
      <RevenueStatistic />
    </div>
  );
}
