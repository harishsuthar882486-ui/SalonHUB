import React, { useMemo, useState } from "react";
import { Avatar, Button, Card, Form, Input, Tabs, Upload, message, Divider, ConfigProvider, theme, } from "antd";
import type { UploadProps } from "antd";
import { LockOutlined, SaveOutlined, UploadOutlined, UserOutlined,} from "@ant-design/icons";

export type EmployeeProfile = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  username?: string;
  avatarUrl?: string;
};

type Props = {
  initialUser?: EmployeeProfile;
  onSaveProfile?: (
    payload: Omit<EmployeeProfile, "id">,
  ) => Promise<void> | void;
  onChangePassword?: (payload: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void> | void;
};

const EmpProfile: React.FC<Props> = ({
  initialUser = {
    id: "employee-1",
    name: "Employee",
    email: "employee@salon.com",
    phone: "",
    username: "employee",
    avatarUrl: "",
  },
  onSaveProfile,
  onChangePassword,
}) => {
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    initialUser.avatarUrl || undefined,
  );

  const headerAccent = useMemo(
    () => ({
      boxShadow:
        "0 0 0 1px rgba(167, 139, 250, 0.18), 0 18px 60px rgba(139, 92, 246, 0.12)",
    }),
    [],
  );

  const beforeUpload: UploadProps["beforeUpload"] = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Only image files are allowed.");
      return Upload.LIST_IGNORE;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB.");
      return Upload.LIST_IGNORE;
    }
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(String(reader.result));
    reader.readAsDataURL(file);
    return false;
  };

  const handleSaveProfile = async () => {
    try {
      const values = await profileForm.validateFields();
      const payload = {
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone?.trim() || "",
        username: values.username?.trim() || "",
        avatarUrl: avatarPreview || "",
      };

      setSavingProfile(true);
      if (onSaveProfile) {
        await onSaveProfile(payload);
      } else {
        await new Promise((r) => setTimeout(r, 450));
      }
      message.success("Profile updated successfully.");
    } catch (err) {
      if (String(err).includes("validate")) return;
      message.error("Unable to update profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async () => {
    try {
      const values = await passwordForm.validateFields();
      setSavingPassword(true);

      if (onChangePassword) {
        await onChangePassword({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        });
      } else {
        await new Promise((r) => setTimeout(r, 500));
      }

      message.success("Password changed successfully.");
      passwordForm.resetFields();
    } catch (err) {
      if (String(err).includes("validate")) return;
      message.error("Unable to change password.");
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <ConfigProvider theme={{algorithm: theme.darkAlgorithm}}>
      <div className="w-full ml-15 md:ml-54 p-5">
        <div className="rounded-2xl border border-white/10 bg-[#0b1220] p-5 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div
                className="rounded-2xl border border-white/10 bg-[#0f1930] p-3"
                style={headerAccent}
              >
                <Avatar
                  size={56}
                  src={avatarPreview}
                  icon={!avatarPreview ? <UserOutlined /> : undefined}
                  className="bg-[#111c33]"
                />
              </div>
              <div>
                <h2 className="m-0 text-xl font-semibold text-white">
                  {initialUser.name || "Employee"}
                </h2>
                <p className="m-0 text-sm text-white/60">{initialUser.email}</p>
              </div>
            </div>
          </div>

          <Divider className="border-white/10" />

          <Tabs
            defaultActiveKey="profile"
            className="supadm-profile-tabs"
            items={[
              {
                key: "profile",
                label: <span className="text-white/80">Edit Profile</span>,
                children: (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Card
                      className="md:col-span-1"
                      bordered={false}
                      bodyStyle={{ padding: 16 }}
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 16,
                      }}
                    >
                      <div className="flex flex-col items-center gap-3">
                        <Avatar
                          size={96}
                          src={avatarPreview}
                          icon={!avatarPreview ? <UserOutlined /> : undefined}
                          className="bg-[#111c33]"
                        />
                        <Upload
                          showUploadList={false}
                          beforeUpload={beforeUpload}
                          accept="image/*"
                        >
                          <Button
                            icon={<UploadOutlined />}
                            rootClassName="border-white/10 bg-white/5 text-white hover:!border-violet-400/40 hover:!bg-violet-500/10"
                          >
                            Upload Avatar
                          </Button>
                        </Upload>
                        <p className="m-0 text-xs text-white/50">
                          JPG/PNG/WebP, max 2MB
                        </p>
                      </div>
                    </Card>

                    <Card
                      className="md:col-span-2"
                      bordered={false}
                      bodyStyle={{ padding: 16 }}
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 16,
                      }}
                    >
                      <Form
                        form={profileForm}
                        layout="vertical"
                        initialValues={{
                          name: initialUser.name,
                          email: initialUser.email,
                          phone: initialUser.phone,
                          username: initialUser.username,
                        }}
                        requiredMark={false}
                      >
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <Form.Item
                            label={
                              <span className="text-white/70">Full Name</span>
                            }
                            name="name"
                            rules={[
                              { required: true, message: "Name is required" },
                              { min: 2, message: "Name is too short" },
                            ]}
                          >
                            <Input
                              size="large"
                              placeholder="Enter your name"
                              rootClassName="!bg-white/5 !text-white placeholder:!text-white/30"
                            />
                          </Form.Item>

                          <Form.Item
                            label={
                              <span className="text-white/70">Username</span>
                            }
                            name="username"
                            rules={[
                              { min: 3, message: "Username is too short" },
                            ]}
                          >
                            <Input
                              size="large"
                              placeholder="employee"
                              rootClassName="!bg-white/5 !text-white placeholder:!text-white/30"
                            />
                          </Form.Item>

                          <Form.Item
                            label={<span className="text-white/70">Email</span>}
                            name="email"
                            rules={[
                              { required: true, message: "Email is required" },
                              { type: "email", message: "Enter a valid email" },
                            ]}
                          >
                            <Input
                              size="large"
                              placeholder="name@domain.com"
                              rootClassName="!bg-white/5 !text-white placeholder:!text-white/30"
                            />
                          </Form.Item>

                          <Form.Item
                            label={<span className="text-white/70">Phone</span>}
                            name="phone"
                            rules={[
                              {
                                pattern: /^[0-9+\-\s()]{7,20}$/,
                                message: "Enter a valid phone number",
                              },
                            ]}
                          >
                            <Input
                              size="large"
                              placeholder="+91 9xxxx xxxxx"
                              rootClassName="!bg-white/5 !text-white placeholder:!text-white/30"
                            />
                          </Form.Item>
                        </div>

                        <div className="mt-2 flex items-center justify-end">
                          <Button
                            type="primary"
                            icon={<SaveOutlined />}
                            loading={savingProfile}
                            onClick={handleSaveProfile}
                            rootClassName="!border-0 !bg-violet-600 hover:!bg-violet-500"
                          >
                            Save Changes
                          </Button>
                        </div>
                      </Form>
                    </Card>
                  </div>
                ),
              },
              {
                key: "security",
                label: <span className="text-white/80">Security</span>,
                children: (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Card
                      className="md:col-span-1"
                      bordered={false}
                      bodyStyle={{ padding: 16 }}
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 16,
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1 rounded-xl bg-violet-500/15 p-2 text-violet-200">
                          <LockOutlined />
                        </div>
                        <div>
                          <h3 className="m-0 text-base font-semibold text-white">
                            Change Password
                          </h3>
                          <p className="mt-1 text-sm text-white/60">
                            Use a strong password (8+ chars, mixed case, number,
                            symbol).
                          </p>
                        </div>
                      </div>
                      <Divider className="border-white/10" />
                      <div className="text-xs text-white/50">
                        Tip: Never reuse your old passwords.
                      </div>
                    </Card>

                    <Card
                      className="md:col-span-2"
                      bordered={false}
                      bodyStyle={{ padding: 16 }}
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 16,
                      }}
                    >
                      <Form
                        form={passwordForm}
                        layout="vertical"
                        requiredMark={false}
                      >
                        <Form.Item
                          label={
                            <span className="text-white/70">
                              Current Password
                            </span>
                          }
                          name="currentPassword"
                          rules={[
                            {
                              required: true,
                              message: "Current password required",
                            },
                          ]}
                        >
                          <Input.Password
                            size="large"
                            placeholder="Enter current password"
                            rootClassName="!bg-white/5 !text-white placeholder:!text-white/30"
                          />
                        </Form.Item>

                        <Form.Item
                          label={
                            <span className="text-white/70">New Password</span>
                          }
                          name="newPassword"
                          rules={[
                            {
                              required: true,
                              message: "New password required",
                            },
                            { min: 8, message: "Minimum 8 characters" },
                            {
                              validator: async (_, value) => {
                                if (!value) return;
                                const hasUpper = /[A-Z]/.test(value);
                                const hasLower = /[a-z]/.test(value);
                                const hasNumber = /\d/.test(value);
                                const hasSymbol = /[^A-Za-z0-9]/.test(value);
                                if (
                                  hasUpper &&
                                  hasLower &&
                                  hasNumber &&
                                  hasSymbol
                                )
                                  return;
                                throw new Error(
                                  "Include uppercase, lowercase, number, and symbol",
                                );
                              },
                            },
                          ]}
                          hasFeedback
                        >
                          <Input.Password
                            size="large"
                            placeholder="Enter new password"
                            rootClassName="!bg-white/5 !text-white placeholder:!text-white/30"
                          />
                        </Form.Item>

                        <Form.Item
                          label={
                            <span className="text-white/70">
                              Confirm New Password
                            </span>
                          }
                          name="confirmPassword"
                          dependencies={["newPassword"]}
                          rules={[
                            {
                              required: true,
                              message: "Confirm your new password",
                            },
                            ({ getFieldValue }) => ({
                              validator: async (_, value) => {
                                if (
                                  !value ||
                                  getFieldValue("newPassword") === value
                                )
                                  return;
                                throw new Error("Passwords do not match");
                              },
                            }),
                          ]}
                          hasFeedback
                        >
                          <Input.Password
                            size="large"
                            placeholder="Re-enter new password"
                            rootClassName="!bg-white/5 !text-white placeholder:!text-white/30"
                          />
                        </Form.Item>

                        <div className="mt-2 flex items-center justify-end">
                          <Button
                            type="primary"
                            icon={<SaveOutlined />}
                            loading={savingPassword}
                            onClick={handleChangePassword}
                            rootClassName="!border-0 !bg-violet-600 hover:!bg-violet-500"
                          >
                            Update Password
                          </Button>
                        </div>
                      </Form>
                    </Card>
                  </div>
                ),
              },
            ]}
          />

          <style>{`
          .supadm-profile-tabs .ant-tabs-nav::before { border-bottom: 1px solid rgba(255,255,255,0.10); }
          .supadm-profile-tabs .ant-tabs-tab { padding: 10px 12px; }
          .supadm-profile-tabs .ant-tabs-tab-btn { color: rgba(255,255,255,0.72); }
          .supadm-profile-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn { color: rgba(255,255,255,0.92); }
          .supadm-profile-tabs .ant-tabs-ink-bar { background: rgba(139,92,246,1); }
          .supadm-profile-tabs .ant-tabs-content-holder { padding-top: 6px; }
          .ant-form-item-label > label { color: rgba(255,255,255,0.72) !important; }
          .ant-input, .ant-input-password, .ant-input-affix-wrapper { border-color: rgba(255,255,255,0.10) !important; }
          .ant-input:hover, .ant-input-password:hover, .ant-input-affix-wrapper:hover { border-color: rgba(167,139,250,0.35) !important; }
          .ant-input:focus, .ant-input-focused, .ant-input-affix-wrapper-focused { box-shadow: 0 0 0 2px rgba(139,92,246,0.22) !important; }
          `}</style>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default EmpProfile;
