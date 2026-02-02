import {
  faBuilding,
  faCalendar,
  faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

export const superAdminDash = [
  {
    heading: "Total Salons",
    total: 5,
    growth: "+2 this month",
    icon: faBuilding,
  },
  {
    heading: "Active Companies",
    total: 3,
    growth: "+33%",
    icon: faArrowTrendUp,
  },
  {
    heading: "Total Employees",
    total: 2,
    growth: "+2 this month",
    icon: faUsers,
  },
  {
    heading: "Total Bookings",
    total: 4,
    growth: "+15% vs last month",
    icon: faCalendar,
  },
];


export interface Revenue {
  month: string;
  totalRevenue: number;
}

export const revenueData: Revenue[] = [
  { month: "January", totalRevenue: 32000 },
  { month: "February", totalRevenue: 31000 },
  { month: "March", totalRevenue: 45000 },
  { month: "April", totalRevenue: 80000 },
  { month: "May", totalRevenue: 72000 },
  { month: "June", totalRevenue: 112000 },
];
