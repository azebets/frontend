import React, { useContext } from 'react'
import "../styles/navbar.css"
import {  useLocation } from "react-router";
import AuthLayout from '../modals/Layout';
import { AppContext } from '../context/AppContext';
import SearchLayout from '../search/SearchLayout';
import NotLoggedInDestop from './navbarAuth/NotLoggedInDestop';
import LoginDestop from './navbarAuth/LoginDestop';
import WalletLayout from '../modals/wallet/WalletLayout';

export default function Navbar() {
    const location = useLocation()
    const {Modalroutes, user} = useContext(AppContext)
    const params = new URLSearchParams(location.search)
    const pageTab = params.get("tab")
    
  return (
    <>
    {pageTab === "wallet" && <WalletLayout />}
    {pageTab === "search" && <SearchLayout />}
    {pageTab === "auth" &&<AuthLayout />}
       {!user && <NotLoggedInDestop />}
       {user && <LoginDestop />}
    </>

  )
}
