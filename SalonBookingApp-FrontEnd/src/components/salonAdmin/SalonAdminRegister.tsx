import React, { useMemo, useState } from "react";
import { Button, Input, Select, message, ConfigProvider } from "antd";
import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  ShopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

type FormState = {
  fullName: string;
  salonName: string;
  category: string;
  fullAddress: string;
  city: string;
  phone: string;
  salonEmail: string;
};

type TouchedState = Partial<Record<keyof FormState, boolean>>;

const SalonAdminRegister: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<TouchedState>({});

  const [form, setForm] = useState<FormState>({
    fullName: "",
    salonName: "",
    category: "",
    fullAddress: "",
    city: "",
    phone: "",
    salonEmail: "",
  });

  const navigate = useNavigate();

  const onChange = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const markTouched = <K extends keyof FormState>(key: K) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
  };

  const errors = useMemo(() => {
    const e: Partial<Record<keyof FormState, string>> = {};

    if (!form.fullName.trim()) e.fullName = "This field is required";
    if (!form.salonName.trim()) e.salonName = "This field is required";
    if (!form.category.trim()) e.category = "This field is required";
    if (!form.fullAddress.trim()) e.fullAddress = "This field is required";
    if (!form.city.trim()) e.city = "This field is required";

    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^\+?\d[\d\s-]{9,14}$/.test(form.phone.trim()))
      e.phone = "Enter a valid phone number";

    if (!form.salonEmail.trim()) e.salonEmail = "This field is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.salonEmail.trim()))
      e.salonEmail = "Enter a valid salonEmail";


    return e;
  }, [form]);

  const shouldShowError = <K extends keyof FormState>(key: K) =>
    !!errors[key] && (submitted || touched[key]);

  const hasErrors = Object.keys(errors).length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSubmitted(true);

  if (hasErrors) {
    message.error("Please fill all required fields correctly.");
    return;
  }

  setLoading(true);

  const payload = {
    salonName: form.salonName.trim(),
    salonEmail: form.salonEmail.trim().toLowerCase(),
    fullName: form.fullName.trim().replace(/\s+/g, " "),
    phone: form.phone.trim(),
    category: form.category,
    city: form.city.trim(),
    fullAddress: form.fullAddress.trim(),
  };

  try {
    const response = await fetch("http://localhost:3200/salon-reg", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      message.error(data?.message || "Something went wrong!");
      return;
    }

    if (data?.success) {
      message.success("Salon Admin registered successfully!");
      setForm({
        fullName: "",
        salonName: "",
        category: "",
        fullAddress: "",
        city: "",
        phone: "",
        salonEmail: "",
      });
      setTouched({});
      setSubmitted(false);

      setTimeout(() => navigate("/login"), 800);
    } else {
      message.error(data?.message || "Registration failed. Try again!");
    }
  } catch (err) {
    console.error(err);
    message.error("Server error. Please try again later.");
  } finally {
    setLoading(false);
  }
};


  return (
    <ConfigProvider>
      <h1 className="mt-6 text-2xl font-bold">Register your Salon</h1>
      <p className="mt-1 text-sm text-white/60">
        Create a salon admin account and setup your salon profile.
      </p>

      <form onSubmit={handleSubmit} className="mt-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-white/60">Full Name *</label>
            <Input
              size="large"
              value={form.fullName}
              onChange={(e) => onChange("fullName", e.target.value)}
              onBlur={() => markTouched("fullName")}
              placeholder="e.g. Harish Kumar"
              prefix={<UserOutlined className="text-white/50" />}
              rootClassName="mt-2 !h-11 !rounded-2xl !bg-[#0B0F19] !border-white/10 !text-white placeholder:!text-white/30"
            />
            {shouldShowError("fullName") && (
              <div className="mt-1 text-xs text-red-400">{errors.fullName}</div>
            )}
          </div>

          <div>
            <label className="text-xs text-white/60">Salon Name *</label>
            <Input
              size="large"
              value={form.salonName}
              onChange={(e) => onChange("salonName", e.target.value)}
              onBlur={() => markTouched("salonName")}
              placeholder="e.g. Glamour Studio"
              prefix={<ShopOutlined className="text-white/50" />}
              rootClassName="mt-2 !h-11 !rounded-2xl !bg-[#0B0F19] !border-white/10 !text-white placeholder:!text-white/30"
            />
            {shouldShowError("salonName") && (
              <div className="mt-1 text-xs text-red-400">{errors.salonName}</div>
            )}
          </div>

          <div>
            <label className="text-xs text-white/60">Salon Category *</label>
            <Select
              size="large"
              value={form.category || undefined}
              onChange={(v) => onChange("category", v)}
              onBlur={() => markTouched("category")}
              placeholder="Select category"
              className="mt-2 w-full"
              popupClassName="!bg-[#0F1422]"
              options={[
                { value: "Unisex", label: "Unisex Salon" },
                { value: "Men", label: "Men Salon" },
                { value: "Women", label: "Women Salon" },
                { value: "Spa", label: "Spa" },
                { value: "Beauty", label: "Beauty Parlour" },
              ]}
            />
            {shouldShowError("category") && (
              <div className="mt-1 text-xs text-red-400">{errors.category}</div>
            )}
          </div>

          <div>
            <label className="text-xs text-white/60">Phone *</label>
            <Input
              size="large"
              value={form.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              onBlur={() => markTouched("phone")}
              placeholder="e.g. +91 98765 43210"
              prefix={<PhoneOutlined className="text-white/50" />}
              rootClassName="mt-2 !h-11 !rounded-2xl !bg-[#0B0F19] !border-white/10 !text-white placeholder:!text-white/30"
            />
            {shouldShowError("phone") && (
              <div className="mt-1 text-xs text-red-400">{errors.phone}</div>
            )}
          </div>

          <div>
            <label className="text-xs text-white/60">salonEmail *</label>
            <Input
              size="large"
              value={form.salonEmail}
              onChange={(e) => onChange("salonEmail", e.target.value)}
              onBlur={() => markTouched("salonEmail")}
              placeholder="e.g. owner@salon.com"
              prefix={<MailOutlined className="text-white/50" />}
              rootClassName="mt-2 !h-11 !rounded-2xl !bg-[#0B0F19] !border-white/10 !text-white placeholder:!text-white/30"
            />
            {shouldShowError("salonEmail") && (
              <div className="mt-1 text-xs text-red-400">{errors.salonEmail}</div>
            )}
          </div>

          <div>
            <label className="text-xs text-white/60">City *</label>
            <Input
              size="large"
              value={form.city}
              onChange={(e) => onChange("city", e.target.value)}
              onBlur={() => markTouched("city")}
              placeholder="e.g. Jaipur"
              prefix={<EnvironmentOutlined className="text-white/50" />}
              rootClassName="mt-2 !h-11 !rounded-2xl !bg-[#0B0F19] !border-white/10 !text-white placeholder:!text-white/30"
            />
            {shouldShowError("city") && (
              <div className="mt-1 text-xs text-red-400">{errors.city}</div>
            )}
          </div>

          <div className="lg:col-span-2">
            <label className="text-xs text-white/60">
              Full fullAddress / Address *
            </label>
            <TextArea
              value={form.fullAddress}
              onChange={(e) => onChange("fullAddress", e.target.value)}
              onBlur={() => markTouched("fullAddress")}
              placeholder="e.g. 2nd Floor, ABC Plaza, Near Metro Station, Jaipur"
              rows={3}
              rootClassName="mt-2 !rounded-2xl !bg-[#0B0F19] !border-white/10 !text-white placeholder:!text-white/30"
            />
            {shouldShowError("fullAddress") && (
              <div className="mt-1 text-xs text-red-400">{errors.fullAddress}</div>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-col  gap-3 sm:items-center sm:justify-between">
          <div className="text-xs text-white/40">
            By registering, you agree to our terms & policies.
          </div>

          <Button
            htmlType="submit"
            loading={loading}
            rootClassName="w-full !h-11 !rounded-2xl !bg-[#6D5EF1] !border-[#6D5EF1] !text-white hover:!bg-[#5B4BEE] disabled:opacity-70"
          >
            Register Salon
          </Button>
        </div>
      </form>
    </ConfigProvider>
  );
};

export default SalonAdminRegister;
