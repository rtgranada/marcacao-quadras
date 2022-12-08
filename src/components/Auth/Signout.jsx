import React from "react";
import { useNavigate } from "react-router";
import { useUserAuth } from '../../context/UserAuthContext';

export const SignOut = () => {
  const { logOut } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  handleLogout();
  return (
    <>
      
    </>
  );
};