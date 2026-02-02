import {
  faCalendar,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

export const empDashData = [
    {
      heading: "Total Bookings",
      total: 1,
      icon: faCalendar,
    },
    {
        heading: "Total Hours",
        total: '0.3h',
        icon: faClock,
    },
    {
        heading: "Today's Revenue",
        total: '₹'+199,
        icon: faUsers,
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
