import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from 'react';
import { createContext, useState } from "react";
import { useCookies } from "react-cookie";
import './admin-components/assets/css/style.css';

import Admin from "./admin-components/admin";
import RegisterA from "./admin-components/register-admin";
import Bceritificate from "./admin-components/d-barangay-certificate"
import Dashboard from "./admin-components/dashboard"
import Bindigency from "./admin-components/d-barangay-indigency";
import Binstallation from "./admin-components/d-barangay-installation";
import AnnouncementAdmin from "./admin-components/announcement-admin";
import LivelihoodAdmin from "./admin-components/livelihood-admin";
import EmergencyAdmin from "./admin-components/emergency-admin";
import BlotterAdmin from "./admin-components/blotter-admin";
import ResidentsAdmin from "./admin-components/residents-admin";
import BpermitAdmin from "./admin-components/b-permit-admin";
import BpromotionAdmin from "./admin-components/b-promotion-admin";
import BofficialsAdmin from "./admin-components/b-officials-admin";
import StafflogsAdmin from "./admin-components/staff-logs-admin";
import AdminProfile from "./admin-components/admin-profile";
import Adminaccounts from "./admin-components/admin-accounts";
import BconstuctionAdmin from "./admin-components/d-barangay-construction"
import Biddmin from "./admin-components/d-barangay-id"
import Residentsaccounts from "./admin-components/residents-accounts";
import Complaintsadmin from "./admin-components/complaints-admin";
import Healthadmin from "./admin-components/health-admin";
import Dashboard1 from "./admin-components/dashboard1";
import Dashboard2 from "./admin-components/dashboard2";

import UserNav from "./user-components/user-navbar";
import Announcement from "./user-components/user-announcement";
import BrgyOfficial from "./user-components/brgy-officials";
import MissionVision from "./user-components/mission-vision";
import Community from "./user-components/community";
import Homepage from "./user-components/homepage";
import Stats from "./user-components/stats";
import Footer from "./user-components/footer";
import Livelihood from "./user-components/user-livelihood";
import Evacuation from "./user-components/user-evacuation";
import Login from "./user-components/login";
import Registration from "./user-components/registration";
import UserService from "./user-components/user-service";
import UserBusiness from "./user-components/user-business";
import FeedbackAdmin from "./admin-components/feedback";
import UserProfile from "./user-components/user-profile";
import ForgotPassword from "./user-components/forgotpassword";
import ResetPassword from "./user-components/resetpassword";
import RecoveredPassword from "./user-components/recoveredpassword";
import ScrollToTopButton from "./user-components/scrolltotop";
import ProtectedRoute from "./utils/protectedRoutes";
import AdminRoute from "./utils/adminRoutes";
import SuperRoute from "./utils/superRoutes";
import Landpage from "./user-components/landingpage";



export const RecoveryContext = createContext();

function App() {

  const [cookies] = useCookies(['access_token']);
  const isAuthenticated = !!cookies.access_token;
  const [email, setEmail] = useState();
  const [otp, setOTP] = useState();

  return (
    <BrowserRouter>
      <div>
        <RecoveryContext.Provider value={{ otp, setOTP, setEmail, email }}>
          <Routes>




            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/visitor" element={<Landpage />}/>
            <Route path="/forgotpass" element={<ForgotPassword />} />
            <Route path="/resetpass" element={<ResetPassword />} />
            <Route path="/recoveredpass" element={<RecoveredPassword />} />



            {/* SUPERADMIN */}
            <Route element={<SuperRoute />}>
              <Route path="/admin-accounts" element={<Adminaccounts />} isAuthenticated={isAuthenticated} />
              <Route path="/staff-logs-admin" element={<StafflogsAdmin />} isAuthenticated={isAuthenticated} />
            </Route>


            {/* ADMIN */}
            <Route element={<AdminRoute />}>
              <Route path="dashboard" element={<Dashboard />} isAuthenticated={isAuthenticated} />
              <Route path="dashboard1" element={<Dashboard1 />} isAuthenticated={isAuthenticated} />
              <Route path="dashboard2" element={<Dashboard2 />} isAuthenticated={isAuthenticated} />
              <Route path="d-barangay-certificate" element={<Bceritificate />} isAuthenticated={isAuthenticated} />
              <Route path="d-barangay-indigency" element={<Bindigency />} isAuthenticated={isAuthenticated} />
              <Route path="d-barangay-installation" element={<Binstallation />} isAuthenticated={isAuthenticated} />
              <Route path="d-barangay-construction" element={<BconstuctionAdmin />} isAuthenticated={isAuthenticated} />
              <Route path="d-barangay-id" element={<Biddmin />} isAuthenticated={isAuthenticated} />
              <Route path="announcement-admin" element={<AnnouncementAdmin />} isAuthenticated={isAuthenticated} />
              <Route path="livelihood-admin" element={<LivelihoodAdmin />} isAuthenticated={isAuthenticated} />
              <Route path="emergency-admin" element={<EmergencyAdmin />} isAuthenticated={isAuthenticated} />
              <Route path="blotter-admin" element={<BlotterAdmin />} isAuthenticated={isAuthenticated} />
              <Route path="residents-admin" element={<ResidentsAdmin />} isAuthenticated={isAuthenticated} />
              <Route path="b-permit-admin" element={<BpermitAdmin />} isAuthenticated={isAuthenticated} />
              <Route path="b-officials-admin" element={<BofficialsAdmin />} isAuthenticated={isAuthenticated} />
              <Route path="feedbacks-admin" element={<FeedbackAdmin />} isAuthenticated={isAuthenticated} />
              <Route path="admin-profile" element={<AdminProfile />} isAuthenticated={isAuthenticated} />
              <Route path="residents-accounts" element={<Residentsaccounts />} isAuthenticated={isAuthenticated} />
              <Route path="complaints-admin" element={<Complaintsadmin />} isAuthenticated={isAuthenticated} />
              <Route path="health-admin" element={<Healthadmin />} isAuthenticated={isAuthenticated} />
              <Route path="b-promotion-admin" element={<BpromotionAdmin />} isAuthenticated={isAuthenticated} />
            </Route>
            {/* User */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Homepage />} isAuthenticated={isAuthenticated} />
              <Route path="/stats" element={<Stats />} isAuthenticated={isAuthenticated} />
              <Route path="/brgy-official" element={<BrgyOfficial />} isAuthenticated={isAuthenticated} />
              <Route path="/community" element={<Community />} isAuthenticated={isAuthenticated} />
              <Route path="/mission-vision" element={<MissionVision />} isAuthenticated={isAuthenticated} />
              <Route path="/footer" element={<Footer />} isAuthenticated={isAuthenticated} />
              <Route path="/announcement" element={<Announcement />} isAuthenticated={isAuthenticated} />
              <Route path="/livelihood" element={<Livelihood />} isAuthenticated={isAuthenticated} />
              <Route path="/evacuation" element={<Evacuation />} isAuthenticated={isAuthenticated} />
              <Route path="/service" element={<UserService />} isAuthenticated={isAuthenticated} />
              <Route path="/business" element={<UserBusiness />} isAuthenticated={isAuthenticated} />
              <Route path="/userprofile" element={<UserProfile />} isAuthenticated={isAuthenticated} />
              <Route path="/scrollup" element={<ScrollToTopButton />} isAuthenticated={isAuthenticated} />
            </Route>

          </Routes>
        </RecoveryContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
