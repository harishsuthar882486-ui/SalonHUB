import React, { useMemo, useState, useEffect } from "react";
import {
  Button,
  Input,
  Tag,
  ConfigProvider,
  theme,
  Checkbox,
  DatePicker,
  Select,
  message,
} from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import {
  SearchOutlined,
  ScissorOutlined,
  ClockCircleOutlined,
  ShopOutlined,
  RightOutlined,
  AppstoreAddOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  CalendarOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import { type SalonsDatatype, type SalonService, type Staff } from "../../utills/salons";

const CustomerDashboard: React.FC = () => {
  const [query, setQuery] = useState("");
  const [openBooking, setOpenBooking] = useState(false);
  const [salonKey, setSalonKey] = useState("");
  const [SalonDetails, setSalonDetails] = useState<SalonsDatatype[]>([]);

  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [staffId, setStaffId] = useState<string>("");
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    const response = await fetch("http://localhost:3200/salons");
    const list = await response.json();
    const users = list.result;
    setSalonDetails(users);
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getData();
  }, []);

  const filteredSalons = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SalonDetails;
    return SalonDetails.filter(
      (s: SalonsDatatype) =>
        s.salonName.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.services.some((service) => service.name.toLowerCase().includes(q))
    );
  }, [SalonDetails, query]);

  const selectedSalon = useMemo(() => {
    return SalonDetails.find((s) => s.key === salonKey);
  }, [SalonDetails, salonKey]);

  const selectedServices = useMemo(() => {
    if (!selectedSalon) return [];
    const set = new Set(selectedServiceIds);
    return selectedSalon.services.filter((srv) => set.has(srv.id));
  }, [selectedSalon, selectedServiceIds]);

  const totals = useMemo(() => {
    const totalDuration = selectedServices.reduce((sum, s) => sum + (s.durationMin || 0), 0);
    const totalPrice = selectedServices.reduce((sum, s) => sum + (s.price || 0), 0);
    return { totalDuration, totalPrice };
  }, [selectedServices]);

  const slots = useMemo(() => {
    if (selectedServiceIds.length === 0) return [];
    return ["10:00 AM", "10:30 AM", "11:00 AM", "12:00 PM", "01:30 PM", "03:00 PM", "04:30 PM", "06:00 PM"];
  }, [selectedServiceIds]);

  const disabledBook = useMemo(() => {
    return selectedServiceIds.length === 0 || !staffId || !date || !selectedSlot;
  }, [selectedServiceIds, staffId, date, selectedSlot]);

  const openBookingForSalon = (key: string) => {
    setSalonKey(key);
    setSelectedServiceIds([]);
    setStaffId("");
    setDate(dayjs());
    setSelectedSlot("");
    setOpenBooking(true);
  };

  const closeBooking = () => {
    setOpenBooking(false);
    setSalonKey("");
    setSelectedServiceIds([]);
    setStaffId("");
    setDate(dayjs());
    setSelectedSlot("");
  };


  const onToggleService = (srv: SalonService) => (e: CheckboxChangeEvent) => {
    setSelectedSlot("");
    setSelectedServiceIds((prev) => {
      const exists = prev.includes(srv.id);
      if (e.target.checked) return exists ? prev : [...prev, srv.id];
      return prev.filter((id) => id !== srv.id);
    });
  };

  const handleBook = async () => {
    if (disabledBook || !selectedSalon) {
      message.error("Please select services, staff, date and time slot.");
      return;
    }

    setLoading(true);

    const payload = {
      salon: {
        key: selectedSalon.key,
        salonName: selectedSalon.salonName,
        city: selectedSalon.city,
        category: selectedSalon.category,
      },
      staffId,
      serviceIds: selectedServiceIds,
      date: date?.format("YYYY-MM-DD"),
      timeSlot: selectedSlot,
      totalDurationMin: totals.totalDuration,
      totalPrice: totals.totalPrice,
    };

    setTimeout(() => {
      setLoading(false);
      setOpenBooking(false)
      console.log("Booking payload:", payload);
      message.success("Booking request submitted");
    }, 900);
  };

  const staffOptions = useMemo(() => {
    const staffs: Staff[] = selectedSalon?.staffs ?? [];
    return staffs.map((st) => ({
      value: st.id,
      disabled: !st.active,
      label: (
        <span
          style={{
            color: st.active ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.35)",
          }}
        >
          {st.name}
          {!st.active ? " (Inactive)" : ""}
        </span>
      ),
    }));
  }, [selectedSalon]);

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <div className="text-white">
        <div className="px-4 lg:px-8 py-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <QuickCard icon={<ShopOutlined />} title="Explore Salons" desc="Browse available salons" />
            <QuickCard icon={<ScissorOutlined />} title="Select Services" desc="Add multiple services in one booking" />
            <QuickCard icon={<ClockCircleOutlined />} title="Smart Slots" desc="Slots auto-calc from working hours" />
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#0F1422] p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Find &amp; Book Services in Your City</h1>
              <p className="text-sm text-white/60 mt-1">Choose a salon, select services and book your slot.</p>
            </div>

            <div className="w-full lg:w-105">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search salon by name, category or city..."
                prefix={<SearchOutlined style={{ color: "gray" }} />}
                rootClassName="!h-11 !rounded-2xl !bg-[#0B0F19] !border-white/10 !text-white placeholder:!text-white/30"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#0F1422] p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-bold">Available Salons</div>
                <div className="text-sm text-white/50">Select a salon to continue booking</div>
              </div>

              <div className="text-xs text-white/40">{filteredSalons.length} found</div>
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 max-h-100 overflow-y-auto">
              {filteredSalons.map((s) => (
                <div
                  key={s.key}
                  className="rounded-2xl border min-w-110 md:min-w-90 border-white/10 bg-[#0B0F19] p-5 hover:bg-white/5 transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-lg">
                        {s.salonName} {`(${s.category})`}
                      </div>
                      <div className="text-sm text-white/50 mt-1">{s.city}</div>
                    </div>
                    <Tag rootClassName="!rounded-full !px-3 !py-1" color={s.status === "Open" ? "green" : "red"}>
                      {s.status}
                    </Tag>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-md text-white/60">Services: </span>
                    <div>
                      {s.services.map((a, i) => (
                        <span className="text-white text-xs" key={a.id}>
                          {a.name}
                          {i < s.services.length - 1 ? ", " : " "}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button

                    icon={<RightOutlined />}
                    disabled={s.status !== "Open"}
                    rootClassName={`mt-4 w-full !h-11 !rounded-2xl 
                      ${s.status === "Open"? "!bg-[#6D5EF1] !border-[#6D5EF1] !text-white hover:!bg-[#5B4BEE]": "!bg-[#8678f0] !border-[#8678f0]"}`
                    }
                    onClick={() =>{ 
                      if(s.status === "Open"){
                        openBookingForSalon(s.key)
                      }
                      else{
                        console.log("try again")
                      }
                    }}
                  >
                    {s.status ==="Open" ? "Select Salon" : "Salon Closed"}
                    
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {openBooking && (
        <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>

          <div className="fixed inset-0 bg-black/40 z-40" onClick={closeBooking} />
          <main
            className={`fixed z-50 top-20 right-0 h-[calc(100vh-5rem)] w-130 max-w-[92vw] transform transition-transform duration-500 ease-in-out ${
              openBooking ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="h-full rounded-3xl border border-white/10 bg-[#0F1422] p-6 overflow-y-auto">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#6D5EF1]/30 bg-[#6D5EF1]/15 px-4 py-2 text-xs text-[#B6B0FF]">
                    <AppstoreAddOutlined />
                    New Booking
                  </div>

                  <h1 className="mt-4 text-2xl font-bold text-white">Book Appointment</h1>

                  <div className="mt-2 text-sm text-white flex items-center gap-2">
                    <ShopOutlined />
                    {selectedSalon?.salonName ?? salonKey}
                    <span className="text-white">•</span>
                    <EnvironmentOutlined />
                    {selectedSalon?.city ?? "-"}
                  </div>
                </div>

                <Button
                  icon={<CloseOutlined />}
                  onClick={closeBooking}
                  rootClassName="!rounded-2xl !border-white/10 !bg-[#0B0F19] !text-white"
                />
              </div>

              <div className="mt-6 flex gap-3 flex-wrap">
                <div className="rounded-2xl border border-white/10 bg-[#0B0F19] px-5 py-3 flex-1 min-w-45">
                  <div className="text-xs text-white">Total Duration</div>
                  <div className="mt-1 text-lg font-bold flex items-center gap-2">
                    <ClockCircleOutlined className="text-[#8F86FF]" />
                    <span className="text-white">{totals.totalDuration} min</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#0B0F19] px-5 py-3 flex-1 min-w-45">
                  <div className="text-xs text-white/50">Total Price</div>
                  <div className="mt-1 text-lg font-bold text-white">₹{totals.totalPrice}</div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4">
                <div className="rounded-3xl border border-white/10 bg-[#0F1422] p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold flex items-center gap-2 text-white">
                      <ScissorOutlined className="text-[#8F86FF]" />
                      Select Services
                    </div>
                    <div className="text-xs text-white">Choose multiple services (single time block)</div>
                  </div>

                  <div className="mt-4 space-y-3">
                    {selectedSalon?.services?.map((srv) => {
                      const checked = selectedServiceIds.includes(srv.id);
                      return (
                        <div
                          key={srv.id}
                          className="rounded-2xl border border-white/10 bg-[#0B0F19] px-4 py-3 flex items-center justify-between gap-3"
                        >
                          <div className="flex items-start gap-3">
                            <Checkbox checked={checked} onChange={onToggleService(srv)} />
                            <div>
                              <div className="font-semibold text-gray-300">{srv.name}</div>
                              <div className=" text-gray-200">
                                {srv.durationMin} min • ₹{srv.price}
                              </div>
                            </div>
                          </div>

                          <Tag rootClassName="!rounded-full !px-3 !py-1" color={checked ? "purple" : "default"}>
                            {checked ? "Selected" : "Add"}
                          </Tag>
                        </div>
                      );
                    })}

                    {!selectedSalon && <div className="text-sm text-white/50">No salon selected</div>}
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-[#0F1422] p-6">
                  <div className="text-lg font-bold flex items-center gap-2 text-[#8F86FF]">
                    <TeamOutlined/>
                    Appointment Details
                  </div>
                  <div className="text-sm text-white/50 mt-1">Select staff and date to view available slots.</div>

                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="text-xs text-white/60">Staff *</label>

                      <div style={{ position: "relative" }} className="mt-2">
                        <Select
                          size="large"
                          value={staffId || undefined}
                          onChange={(v) => {
                            setSelectedSlot("");
                            setStaffId(v);
                          }}
                          placeholder=""
                          className="w-full"
                          style={{
                            backgroundColor: "#0B0F19",
                            border: "1px solid rgba(255,255,255,0.15)",
                            color: "white",
                            borderRadius: 16,
                          }}
                          suffixIcon={<TeamOutlined style={{ color: "rgba(255,255,255,0.55)" }} />}
                          options={staffOptions}
                        />

                        {!staffId && (
                          <div
                            style={{
                              position: "absolute",
                              left: 14,
                              top: "50%",
                              transform: "translateY(-50%)",
                              pointerEvents: "none",
                              color: "rgba(255,255,255,0.55)",
                              fontSize: 14,
                            }}
                          >
                            Select staff
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-white/60">Date *</label>
                      <DatePicker
                        value={date}
                        onChange={(v) => {
                          setSelectedSlot("");
                          setDate(v);
                        }}
                        size="large"
                        className="mt-2 w-full"
                        style={{
                          backgroundColor: "#0B0F19",
                          border: "1px solid rgba(255,255,255,0.15)",
                          color: "rgba(255,255,255,0.88)",
                          borderRadius: 16,
                          height: 44,
                        }}
                        suffixIcon={<CalendarOutlined className="text-white/50" />}
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-[#0F1422] p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold flex items-center gap-2 text-[#8F86FF]">
                      <ClockCircleOutlined/>
                      Available Time Slots
                    </div>
                    <div className="text-xs text-white/40">Slots appear after selecting services</div>
                  </div>

                  {slots.length === 0 ? (
                    <div className="mt-4 text-sm text-white/50 rounded-2xl border border-white/10 bg-[#0B0F19] p-5">
                      Please select at least one service to see available time slots.
                    </div>
                  ) : (
                    <div className="mt-4 flex flex-wrap gap-3">
                      {slots.map((slot) => {
                        const active = selectedSlot === slot;
                        return (
                          <button
                            key={slot}
                            onClick={() => setSelectedSlot(slot)}
                            className={`px-4 py-3 rounded-2xl border text-sm transition ${
                              active
                                ? "bg-[#6D5EF1]/20 border-[#6D5EF1]/40 text-white"
                                : "bg-[#0B0F19] border-white/10 text-white/60 hover:text-white hover:bg-white/5"
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                    <div className="text-xs text-white/40">Booking will be created as a single continuous time block.</div>

                    <Button
                      loading={loading}
                      disabled={disabledBook}
                      onClick={handleBook}
                      icon={<AppstoreAddOutlined />}
                      rootClassName="!h-11 !rounded-2xl !bg-[#6D5EF1] !border-[#6D5EF1] !text-white hover:!bg-[#5B4BEE] disabled:opacity-70"
                    >
                      Book Appointment
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </ConfigProvider>
      )}
    </ConfigProvider>
  );
};

export default CustomerDashboard;

function QuickCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0F1422] p-5">
      <div className="flex items-start gap-4">
        <div className="h-11 w-11 rounded-2xl bg-[#6D5EF1]/15 border border-[#6D5EF1]/25 flex items-center justify-center text-[#8F86FF]">
          {icon}
        </div>
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-white/50 mt-1">{desc}</div>
        </div>
      </div>
    </div>
  );
}
