import React, { useEffect, useMemo, useState } from "react";
import { Button, ConfigProvider, Input, message } from "antd";
import {
  LockOutlined,
  MailOutlined,
  UserOutlined,
  PhoneOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

type FormState = {
  fullName: string;
  userEmail: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

type TouchedState = Partial<Record<keyof FormState, boolean>>;

const SignnUp: React.FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<TouchedState>({});

  const [form, setForm] = useState<FormState>({
    fullName: "",
    userEmail: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const loggedInUser = localStorage.getItem("login");
    if (loggedInUser) navigate("/");
  }, [navigate]);

  const markTouched = <K extends keyof FormState>(key: K) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
  };

  const errors = useMemo(() => {
    const e: Partial<Record<keyof FormState, string>> = {};

    if (!form.fullName.trim()) e.fullName = "This field is required";

    if (!form.userEmail.trim()) e.userEmail = "This field is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.userEmail.trim()))
      e.userEmail = "Enter a valid email";

    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^\+?\d[\d\s-]{9,14}$/.test(form.phone.trim()))
      e.phone = "Enter a valid phone number";

    if (!form.password) e.password = "This field is required";
    else if (form.password.length < 8) e.password = "Use at least 8 characters";

    if (!form.confirmPassword) e.confirmPassword = "This field is required";
    else if (form.confirmPassword !== form.password)
      e.confirmPassword = "Passwords do not match";

    return e;
  }, [form]);

  const shouldShowError = <K extends keyof FormState>(key: K) =>
    !!errors[key] && (submitted || touched[key]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const hasErrors = Object.keys(errors).length > 0;
    if (hasErrors) {
      message.error("Please fill all required fields correctly.");
      return;
    }

    setLoading(true);

    const payload = {
      fullName: form.fullName.trim().replace(/\s+/g, " "),
      userEmail: form.userEmail.trim().toLowerCase(),
      phone: form.phone.trim(),
      password: form.password,
    };

    try {
      const response = await fetch("http://localhost:3200/login/user-reg", {
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
        message.success("Account created successfully!");
        setForm({
          fullName: "",
          userEmail: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });
        setTouched({});
        setSubmitted(false);

        setTimeout(() => navigate("/login"), 800);
      } else {
        message.error(data?.message || "Signup failed. Try again!");
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
      <h1 className="mt-6 text-2xl font-bold">Create account</h1>
      <p className="mt-1 text-sm text-white/60">
        Sign up to book appointments or manage your salon.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-2">
        <div>
          <label className="text-xs text-white/60">Full Name *</label>
          <Input
            size="large"
            value={form.fullName}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, fullName: e.target.value }))
            }
            onBlur={() => markTouched("fullName")}
            placeholder="Enter your name"
            prefix={<UserOutlined className="text-white/50" />}
            rootClassName="mt-2 !h-11 !rounded-2xl !bg-[#0B0F19] !border-white/10 !text-white placeholder:!text-white/30"
          />
          {shouldShowError("fullName") && (
            <div className="mt-1 text-xs text-red-400">{errors.fullName}</div>
          )}
        </div>

        <div>
          <label className="text-xs text-white/60">Email *</label>
          <Input
            size="large"
            value={form.userEmail}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, userEmail: e.target.value }))
            }
            onBlur={() => markTouched("userEmail")}
            placeholder="Enter your email"
            prefix={<MailOutlined className="text-white/50" />}
            rootClassName="mt-2 !h-11 !rounded-2xl !bg-[#0B0F19] !border-white/10 !text-white placeholder:!text-white/30"
          />
          {shouldShowError("userEmail") && (
            <div className="mt-1 text-xs text-red-400">{errors.userEmail}</div>
          )}
        </div>

        <div>
          <label className="text-xs text-white/60">Contact (Phone) *</label>
          <Input
            size="large"
            value={form.phone}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, phone: e.target.value }))
            }
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
          <label className="text-xs text-white/60">Password *</label>
          <Input.Password
            size="large"
            value={form.password}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
            onBlur={() => markTouched("password")}
            placeholder="Create a password"
            prefix={<LockOutlined className="text-white/50" />}
            iconRender={(visible: boolean) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined className="text-white/50" />
            }
            rootClassName="mt-2 !h-11 !rounded-2xl !bg-[#0B0F19] !border-white/10 !text-white placeholder:!text-white/30"
          />
          {shouldShowError("password") ? (
            <div className="mt-1 text-xs text-red-400">{errors.password}</div>
          ) : (
            <div className="mt-2 text-xs text-white/40">Use at least 8 characters.</div>
          )}
        </div>

        <div>
          <label className="text-xs text-white/60">Confirm Password *</label>
          <Input.Password
            size="large"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, confirmPassword: e.target.value }))
            }
            onBlur={() => markTouched("confirmPassword")}
            placeholder="Re-enter your password"
            prefix={<LockOutlined className="text-white/50" />}
            iconRender={(visible: boolean) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined className="text-white/50" />
            }
            rootClassName="mt-2 !h-11 !rounded-2xl !bg-[#0B0F19] !border-white/10 !text-white placeholder:!text-white/30"
          />
          {shouldShowError("confirmPassword") && (
            <div className="mt-1 text-xs text-red-400">
              {errors.confirmPassword}
            </div>
          )}
        </div>

        <Button
          htmlType="submit"
          loading={loading}
          rootClassName="w-full !h-11 !rounded-2xl !bg-[#6D5EF1] !border-[#6D5EF1] !text-white hover:!bg-[#5B4BEE]"
        >
          Sign up
        </Button>
      </form>
    </ConfigProvider>
  );
};

export default SignnUp;
