import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard";
import Login from "./components/Auth/Login"
import { superAdmDash, superAdmSalons, superAdmManageSalons, manageUsers, supAdmProfile, salonAdm, salStaff, salBookings, salServices, salProfile, empDashboard, empBookings, cusBookings, cusDashboard, salAdmProfile, empProfile, cusProfile,  } from "./components/Pages";
import SignUp from "./components/Auth/SignUp";


function App() {

  return (
    <Routes>
      <Route path="/superadmin" element={superAdmDash} />
      <Route path="/superadmin/salons" element={superAdmSalons} />
      <Route path="/superadmin/salonsreq" element={superAdmManageSalons}/>
      <Route path="/superadmin/users" element={manageUsers}/>
      <Route path="/superadmin/profile" element={supAdmProfile}/>

      <Route path="/salonadmin" element={salonAdm}/>
      <Route path="/salonadmin/staff" element={salStaff}/>
      <Route path="/salonadmin/bookings" element={salBookings}/>
      <Route path="/salonadmin/services" element={salServices}/>
      <Route path="/salonadmin/company-profile" element={salProfile}/>
      <Route path="/salonadmin/profile" element={salAdmProfile}/>

      <Route path="/employee" element={empDashboard}/>
      <Route path="/employee/bookings" element={empBookings}/>
      <Route path="/employee/profile" element={empProfile}/>

      <Route path="/customer" element={cusDashboard}/>
      <Route path="/customer/bookings" element={cusBookings}/>
      <Route path="/customer/profile" element={cusProfile}/>
      
      <Route path='/*' element={<Dashboard/>}/>
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp/>} />
    </Routes>
  )
}

export default App