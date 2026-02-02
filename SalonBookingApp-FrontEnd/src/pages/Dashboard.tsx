import React from "react";
import { Button, ConfigProvider, theme } from "antd";
import {
  AppstoreOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  LockOutlined,
  SafetyOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  RightOutlined,
} from "@ant-design/icons";

const Dashboard: React.FC = () => {
  const goToLogin = () => {
    window.location.href = "/login";
  };

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <div className="min-h-screen bg-[#0B0F19] text-white">
        <div className="flex min-h-screen">
          <main className="flex-1">
            <div className="sticky top-0 z-10 bg-[#0B0F19]/90 backdrop-blur border-b border-white/10">
              <div className="px-6 py-4 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">Public Dashboard</div>
                  <div className="text-sm text-white/60">
                    Salon booking system — fast, clean & conflict-safe
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    onClick={goToLogin}
                    icon={<LockOutlined />}
                    rootClassName="!h-10 !rounded-xl !bg-[#6D5EF1] !border-[#6D5EF1] !text-white hover:!bg-[#5B4BEE]"
                  >
                    Login
                  </Button>
                </div>
              </div>
            </div>

            <div className="px-6 py-6 space-y-6">
              <section className="rounded-3xl border border-white/10 bg-linear-to-r from-[#151A2A] via-[#0F1422] to-[#151A2A] p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#6D5EF1]/30 bg-[#6D5EF1]/15 px-4 py-2 text-xs text-[#B6B0FF]">
                      <SafetyOutlined />
                      SalonHub — Role Based Booking System
                    </div>

                    <h1 className="mt-4 text-3xl lg:text-4xl font-bold leading-tight">
                      Book salon services in minutes,
                      <span className="text-[#8F86FF]"> without chaos.</span>
                    </h1>

                    <p className="mt-3 text-white/60 max-w-2xl">
                      One booking = multiple services + single continuous time
                      block. Conflict-safe scheduling with UTC time storage.
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <Button
                        onClick={goToLogin}
                        icon={<LockOutlined />}
                        rootClassName="!h-11 !rounded-2xl !bg-[#6D5EF1] !border-[#6D5EF1] !text-white hover:!bg-[#5B4BEE]"
                      >
                        Login to continue
                      </Button>

                      <Button
                        icon={<CalendarOutlined />}
                        rootClassName="!h-11 !rounded-2xl !border-white/10 !bg-white/5 !text-white hover:!bg-white/10"
                        href="#howWorks"
                      >
                        See how booking works
                      </Button>
                    </div>
                  </div>

                  <div className="w-full lg:w-90 rounded-3xl border border-white/10 bg-[#0B0F19]/60 p-5">
                    <h2>System Highlights</h2>
    

                    <div className="mt-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="h-9 w-9 rounded-xl bg-[#6D5EF1]/15 border border-[#6D5EF1]/25 flex items-center justify-center">
                          <ClockCircleOutlined className="text-[#8F86FF]" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold">
                            Auto slot calculation
                          </div>
                          <div className="text-xs text-white/50">
                            No pre-generated time slots stored
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="h-9 w-9 rounded-xl bg-[#6D5EF1]/15 border border-[#6D5EF1]/25 flex items-center justify-center">
                          <CheckCircleOutlined className="text-[#8F86FF]" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold">
                            Conflict-safe booking
                          </div>
                          <div className="text-xs text-white/50">
                            Prevents double booking overlaps
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="h-9 w-9 rounded-xl bg-[#6D5EF1]/15 border border-[#6D5EF1]/25 flex items-center justify-center">
                          <TeamOutlined className="text-[#8F86FF]" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold">
                            Multi-role support
                          </div>
                          <div className="text-xs text-white/50">
                            SuperAdmin / Admin / Employee / Customer
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  title="Role Based Access"
                  value="4 Roles"
                  hint="SuperAdmin + Admin + Employee + Customer"
                  icon={<UserOutlined />}
                />
                <StatCard
                  title="Booking Rule"
                  value="1 Slot"
                  hint="Multiple services = 1 continuous block"
                  icon={<CalendarOutlined />}
                />
                <StatCard
                  title="Time Storage"
                  value="UTC"
                  hint="All booking timestamps in UTC"
                  icon={<ClockCircleOutlined />}
                />
                <StatCard
                  title="Integrity"
                  value="Snapshot"
                  hint="Service name/duration/price stored at booking time"
                  icon={<SafetyOutlined />}
                />
              </section>

              <section className="rounded-3xl border border-white/10 bg-[#0F1422] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold">What you can do</div>
                    <div className="text-sm text-white/50">
                      Public overview (login required for actions)
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <FeatureCard
                    icon={<ShopOutlined />}
                    title="Companies / Salon setup"
                    desc="Working days, timings, activation controls"
                  />
                  <FeatureCard
                    icon={<AppstoreOutlined />}
                    title="Services management"
                    desc="Duration + price + enable/disable"
                  />
                  <FeatureCard
                    icon={<TeamOutlined />}
                    title="Employee management"
                    desc="Assign staff, activate/deactivate"
                  />
                  <FeatureCard
                    icon={<CalendarOutlined />}
                    title="Smart booking flow"
                    desc="Select multiple services → total duration auto"
                  />
                  <FeatureCard
                    icon={<SafetyOutlined />}
                    title="Conflict safe"
                    desc="Overlapping slots automatically prevented"
                  />
                  <FeatureCard
                    icon={<LockOutlined />}
                    title="Secure access"
                    desc="Backend role-based permissions enforced"
                  />
                </div>
              </section>

              <section className="rounded-3xl border border-white/10 bg-[#0F1422] p-6">
                <div className="text-lg font-bold">How booking works</div>
                <div className="text-sm text-white/50">
                  Simple user flow for customers
                </div>

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4" id="howWorks">
                  <StepCard
                    step="01"
                    icon={<ShopOutlined />}
                    title="Select salon"
                    desc="Customer chooses a company (selection persists)."
                  />
                  <StepCard
                    step="02"
                    icon={<AppstoreOutlined />}
                    title="Choose services"
                    desc="Multiple services in one booking with total duration."
                  />
                  <StepCard
                    step="03"
                    icon={<CalendarOutlined />}
                    title="Pick time slot"
                    desc="System shows available slots based on rules + conflicts."
                  />
                </div>

                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={()=> window.location.href = "/signup"}
                    icon={<RightOutlined />}
                    rootClassName="!h-11 !rounded-2xl !bg-[#6D5EF1] !border-[#6D5EF1] !text-white hover:!bg-[#5B4BEE]"
                  >
                    Continue to Register
                  </Button>
                </div>
              </section>

              <footer className="pb-10 text-center text-xs text-white/35">
                © {new Date().getFullYear()} SalonHub • Built with React +
                TS + Tailwind + Antd
              </footer>
            </div>
          </main>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Dashboard;

function StatCard({
  title,
  value,
  hint,
  icon,
}: {
  title: string;
  value: string;
  hint: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0F1422] p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-white/60">{title}</div>
          <div className="mt-2 text-2xl font-bold">{value}</div>
          <div className="mt-2 text-xs text-white/40">{hint}</div>
        </div>
        <div className="h-10 w-10 rounded-xl bg-[#6D5EF1]/15 border border-[#6D5EF1]/30 flex items-center justify-center text-[#8F86FF]">
          {icon}
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0B0F19] p-5 hover:bg-white/5 transition">
      <div className="flex items-start gap-4">
        <div className="h-11 w-11 rounded-2xl bg-[#6D5EF1]/15 border border-[#6D5EF1]/25 flex items-center justify-center text-[#8F86FF]">
          {icon}
        </div>
        <div className="min-w-0">
          <div className="font-semibold">{title}</div>
          <div className="mt-1 text-sm text-white/50">{desc}</div>
        </div>
      </div>
    </div>
  );
}

function StepCard({
  step,
  icon,
  title,
  desc,
}: {
  step: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0B0F19] p-5">
      <div className="flex items-center justify-between">
        <div className="text-xs text-white/40">STEP {step}</div>
        <div className="h-9 w-9 rounded-xl bg-[#6D5EF1]/15 border border-[#6D5EF1]/25 flex items-center justify-center text-[#8F86FF]">
          {icon}
        </div>
      </div>
      <div className="mt-4 font-semibold">{title}</div>
      <div className="mt-1 text-sm text-white/50">{desc}</div>
    </div>
  );
}
