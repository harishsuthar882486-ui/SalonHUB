import { faCalendar, faIndianRupee, faScissors} from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

export const salAdmDash = [
  {
    heading: "Today's Bookings",
    total: 5,
    growth: "+2 this month",
    icon: faCalendar,
  },
  {
    heading: "Total Revenue",
    total: '₹'+34826,
    growth: "+36%",
    icon: faIndianRupee,
  },
  {
    heading: "Active Employees",
    total: 2,
    icon: faUsers,
  },
  {
    heading: "Active Services",
    total: 4,
    icon: faScissors,
  },
];


export interface Revenue {
  month: string;
  totalRevenue: number;
}


