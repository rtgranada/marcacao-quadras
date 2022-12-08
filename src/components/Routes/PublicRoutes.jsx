import React from "react";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { Home } from "../Home";
import { Login } from "../Auth/Login";
import { Signup } from "../Auth/Signup";
import { MyProfile } from "../Profile/MyProfile";
import { SignOut } from "../Auth/Signout";
import { Schedule } from "../Schedule/Schedule";
import { FormProvider } from "../../context/ScheduleContext";

export const PublicRoutes = () => (
  <Routes>
    <Route
      path="/profile"
      element={
        <ProtectedRoute>
          <MyProfile />
        </ProtectedRoute>
      }
    />
    {/* <Route path="/users">
        <Route index element={<ListUsers />} /> 
        <Route path=":id" element={<User />} />
        <Route path="new" element={<NewUser />} />
     </Route> */}
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/signout" element={<SignOut />} />
    <Route
      path="/agenda"
      element={
        <FormProvider>
          <Schedule />
        </FormProvider>
      }
    />
  </Routes>
);
