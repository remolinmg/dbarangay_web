import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import './admin-components/assets/css/style.css';
import Admin from "./admin-components/admin";
import RegisterA from "./admin-components/register-admin";
import Bceritificate from "./admin-components/d-barangay-certificate"
import Dashboard from "./admin-components/dashboard"
import Bindigency from "./admin-components/d-barangay-indigency";
import Binstallation from "./admin-components/d-barangay-installation";
import Blivelihood from "./admin-components/d-barangay-livelihood";
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
import ResidentsInactiveAdmin from "./admin-components/resident-inactive"
import Residentsaccounts from "./admin-components/residents-accounts";
import Complaintsadmin from "./admin-components/complaints-admin";


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
import ScrollToTopButton from "./user-components/scrolltotop";



import Sample from "./admin-components/sample"
import Usersample from "./user-components/usersample";
function App() {
  return (
    <BrowserRouter>
      <div>

        <Routes>

        <Route path="sample" element={<Sample />} />
        <Route path="usersample" element={<Usersample />} />

          <Route path="admin" element={<Admin />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="d-barangay-certificate" element={<Bceritificate />} />
          <Route path="d-barangay-indigency" element={<Bindigency />} />
          <Route path="d-barangay-livelihood" element={<Blivelihood />} />
          <Route path="d-barangay-installation" element={<Binstallation />} />
          <Route path="d-barangay-construction" element={<BconstuctionAdmin />} />
          <Route path="d-barangay-id" element={<Biddmin />} />
          <Route path="announcement-admin" element={<AnnouncementAdmin />} />
          <Route path="livelihood-admin" element={<LivelihoodAdmin />} />
          <Route path="emergency-admin" element={<EmergencyAdmin />} />
          <Route path="blotter-admin" element={<BlotterAdmin />} />
          <Route path="residents-admin" element={<ResidentsAdmin />} />
          <Route path="resident-inactiveadmin" element={<ResidentsInactiveAdmin/>} />
          <Route path="b-permit-admin" element={<BpermitAdmin />} />
          <Route path="b-promotion-admin" element={<BpromotionAdmin />} />
          <Route path="b-officials-admin" element={<BofficialsAdmin />} />
          <Route path="staff-logs-admin" element={<StafflogsAdmin />} />
          <Route path="feedbacks-admin" element={<FeedbackAdmin />} />
          <Route path="admin-profile" element={<AdminProfile />} />
          <Route path="admin-accounts" element={<Adminaccounts />} />
          <Route path="residents-accounts" element={<Residentsaccounts />} />
          <Route path="complaints-admin" element={<Complaintsadmin />} />

          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
          <Route path="/" element={<Homepage />} />
          <Route path="stats" element={<Stats />} />
          <Route path="brgy-official" element={<BrgyOfficial />} />
          <Route path="community" element={<Community />} />
          <Route path="mission-vision" element={<MissionVision />} />
          <Route path="footer" element={<Footer />} />
          <Route path="announcement" element={<Announcement />} />
          <Route path="livelihood" element={<Livelihood />} />
          <Route path="evacuation" element={<Evacuation />} />
          <Route path="service" element={<UserService />} />
          <Route path="business" element={<UserBusiness />} />
          <Route path="userprofile" element={<UserProfile />} />
          <Route path="scrollup" element={<ScrollToTopButton />} />


        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
