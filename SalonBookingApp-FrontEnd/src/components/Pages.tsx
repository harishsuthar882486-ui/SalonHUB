import CustomerBookings from "../pages/customer/CustomerBookings";
import CustomerDashboard from "../pages/customer/CustomerDashboard";
import CustomerNavbar from "../pages/customer/CustomerNavbar";
import CustomerProfile from "../pages/customer/CustomerProfile";
import EmployeeBookings from "../pages/employee/EmployeeBookings";
import EmployeeDashboard from "../pages/employee/EmployeeDashboard";
import EmpProfile from "../pages/employee/EmpProfile";
import Bookings from "../pages/salonAdmin/Bookings";
import SalAdmProfile from "../pages/salonAdmin/SalAdmProfile";
import SalonAdminDashboard from "../pages/salonAdmin/SalonAdminDashboard";
import SalonProfile from "../pages/salonAdmin/SalonProfile";
import SalonServices from "../pages/salonAdmin/SalonServices";
import SalonStaff from "../pages/salonAdmin/SalonStaff";
import ManageSalonRequests from "../pages/superAdmin/ManageSalonRequests";
import SalonsDetail from "../pages/superAdmin/SalonsDetail";
import SupAdmProfile from "../pages/superAdmin/SupAdmProfile";
import SuperAdminDashboard from "../pages/superAdmin/SuperAdminDashboard";
import Users from "../pages/superAdmin/Users";
import EmpSidebar from "./employee/EmpSidebar";
import Protected from "./Auth/Protected";
import SalAdmSidebar from "./salonAdmin/SalAdmSidebar";
import SuperAdminSidebar from "./superAdmin/SuperAdminSidebar";


export const superAdmDash = (<Protected><main className="flex"><SuperAdminSidebar/><SuperAdminDashboard/></main></Protected>);
export const superAdmSalons = (<Protected><main className="flex"><SuperAdminSidebar/><SalonsDetail/></main></Protected>);
export const superAdmManageSalons = (<Protected><main className="flex"><SuperAdminSidebar/><ManageSalonRequests/></main></Protected>);
export const manageUsers = (<Protected><main className="flex"><SuperAdminSidebar/><Users/></main></Protected>);
export const supAdmProfile = (<Protected><main className="flex"><SuperAdminSidebar/><SupAdmProfile/></main></Protected>);

export const salonAdm = (<Protected><main className="flex"><SalAdmSidebar/><SalonAdminDashboard/></main></Protected>);
export const salStaff = (<Protected><main className="flex"><SalAdmSidebar/><SalonStaff/></main></Protected>);
export const salBookings = (<Protected><main className="flex"><SalAdmSidebar/><Bookings/></main></Protected>);
export const salServices = (<Protected><main className="flex"><SalAdmSidebar/><SalonServices/></main></Protected>);
export const salProfile = (<Protected><main className="flex"><SalAdmSidebar/><SalonProfile/></main></Protected>);
export const salAdmProfile = (<Protected><main className="flex"><SalAdmSidebar/><SalAdmProfile/></main></Protected>);

export const empDashboard = (<Protected><main className="flex"><EmpSidebar/><EmployeeDashboard/></main></Protected>);
export const empBookings = (<Protected><main className="flex"><EmpSidebar/><EmployeeBookings/></main></Protected>);
export const empProfile = (<Protected><main className="flex"><EmpSidebar/><EmpProfile/></main></Protected>);

export const cusDashboard = (<Protected><CustomerNavbar/><CustomerDashboard/></Protected>)
export const cusBookings = (<Protected><CustomerNavbar/><CustomerBookings/></Protected>)
export const cusProfile = (<Protected><CustomerNavbar/><CustomerProfile/></Protected>)

{/* </> */}