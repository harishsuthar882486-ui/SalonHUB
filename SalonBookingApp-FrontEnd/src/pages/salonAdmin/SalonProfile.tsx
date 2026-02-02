import {
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Switch, TimePicker, Button, ConfigProvider, theme } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import type { Dayjs } from "dayjs";

type DayKey =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

type BusinessDay = {
  key: DayKey;
  label: string;
  open: boolean;
  start: string;
  end: string;
};

const TIME_FORMAT = "HH:mm";

const initialDays: BusinessDay[] = [
  { key: "monday", label: "Monday", open: true, start: "09:00", end: "18:00" },
  { key: "tuesday", label: "Tuesday", open: true, start: "09:00", end: "18:00" },
  { key: "wednesday", label: "Wednesday", open: true, start: "09:00", end: "18:00" },
  { key: "thursday", label: "Thursday", open: true, start: "09:00", end: "18:00" },
  { key: "friday", label: "Friday", open: true, start: "09:00", end: "20:00" },
  { key: "saturday", label: "Saturday", open: true, start: "10:00", end: "17:00" },
  { key: "sunday", label: "Sunday", open: false, start: "09:00", end: "18:00" },
];

const toDayjs = (time: string): Dayjs => dayjs(time, TIME_FORMAT);

const SalonProfile = () => {
  const [days, setDays] = useState<BusinessDay[]>(initialDays);

  const updateDay = (key: DayKey, patch: Partial<BusinessDay>) => {
    setDays((prev) => prev.map((d) => (d.key === key ? { ...d, ...patch } : d)));
  };

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <main className="bg-[#161a22] w-full min-h-screen ml-15 md:ml-54 p-3 md:p-5 flex flex-col gap-3">
        <div className="">
          <h1 className="text-gray-200 text-xl md:text-2xl font-bold">
            Company Profile
          </h1>
          <p className="text-gray-400 text-xs md:text-sm font-semibold">
            Manage your salon information and working hours
          </p>
        </div>

        <div className="flex justify-between">
          <div className="bg-[#242a35] border border-[#262b3a] rounded-2xl h-full w-full flex flex-col md:flex-row">
            <div className="p-4 w-full flex flex-col md:flex-row gap-4 md:gap-5">
              <HomeOutlined
                className="text-4xl mb-2 md:mb-3 rounded-xl p-2.5 h-14"
                style={{ backgroundColor: "#1e2036", color: "#6c5ce7" }}
              />

              <div className="flex flex-col gap-2">
                <h1 className="text-[#f9fafb] text-2xl md:text-3xl font-bold flex gap-2 mb-1 md:mb-3">
                  Glamour Studios
                </h1>

                <p className="text-[#9ca3af] flex gap-2 items-center text-sm md:text-base break-all">
                  <MailOutlined className="text-xl md:text-2xl" />
                  info@glamourstudios.com
                </p>

                <p className="text-[#9ca3af] flex gap-2 items-center text-sm md:text-base">
                  <PhoneOutlined className="text-xl md:text-2xl" />
                  +1 (555) 123-4567
                </p>

                <p className="text-[#9ca3af] flex gap-2 items-center text-sm md:text-base">
                  <EnvironmentOutlined className="text-lg md:text-xl" />
                  123 Main St, New York, NY 10001
                </p>
              </div>
            </div>

            <div className="flex items-start justify-between md:justify-end gap-3 md:gap-5 p-4 md:p-5 pt-0 md:pt-5">
              <p className="text-white bg-green-400 text-xs md:text-sm px-4 py-1 rounded-2xl">
                Active
              </p>

              <button className="bg-[#6c5ce7] text-white flex items-center justify-center text-xs md:text-sm w-28 md:w-24 py-2 md:py-1 rounded-2xl">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div className="bg-[#242a35] border border-[#262b3a] rounded-2xl p-3 md:p-4">
          <h1 className="text-gray-200 text-lg md:text-xl font-bold mb-2">
            Business Hours
          </h1>

          <div className="space-y-2">
            {days.map((day) => (
              <div
                key={day.key}
                className="w-full rounded-2xl bg-[#1f2530] border border-[#262b3a] px-3 md:px-6 py-4 md:py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div className="flex items-center justify-between md:justify-start gap-4 min-w-0 md:min-w-55">
                  <p className="text-white font-semibold text-base md:text-lg w-auto md:w-30">
                    {day.label}
                  </p>

                  <Switch
                    checked={day.open}
                    onChange={(checked) => updateDay(day.key, { open: checked })}
                  />
                </div>

                <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  {day.open ? (
                    <>
                      <div className="flex items-center justify-between sm:justify-start gap-2">
                        <span className="text-white/70 text-sm min-w-12">
                          Start:
                        </span>
                        <TimePicker
                          value={toDayjs(day.start)}
                          format={TIME_FORMAT}
                          minuteStep={5}
                          className="w-full sm:w-auto"
                          onChange={(val) => {
                            if (!val) return;
                            updateDay(day.key, { start: val.format(TIME_FORMAT) });
                          }}
                        />
                      </div>

                      <span className="text-white/30 hidden sm:block">—</span>

                      <div className="flex items-center justify-between sm:justify-start gap-2">
                        <span className="text-white/70 text-sm min-w-12">
                          End:
                        </span>
                        <TimePicker
                          value={toDayjs(day.end)}
                          format={TIME_FORMAT}
                          minuteStep={5}
                          className="w-full sm:w-auto"
                          onChange={(val) => {
                            if (!val) return;
                            updateDay(day.key, { end: val.format(TIME_FORMAT) });
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    <p className="text-white/50 text-sm md:text-base">Closed</p>
                  )}
                </div>

                <div className="flex justify-end">
                  <Button
                    className="w-full sm:w-auto"
                    style={{
                      backgroundColor: "#161a22",
                      color: "white",
                      border: "1px solid #262b3a",
                    }}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </ConfigProvider>
  );
};

export default SalonProfile;
