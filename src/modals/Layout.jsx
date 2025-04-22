import React from 'react'
import CloseButton from '../components/CloseButton'
import { useLocation, useNavigate } from 'react-router'
import "../styles/auth.css"
import Login from './auth/Login'
import Signup from './auth/Signup'

export default function Layout() {
    const location = useLocation()
    const navigate = useNavigate()
    const params = new URLSearchParams(location.search)
    const referral = params.get("ref")
    const pageTab = params.get("tab")
    const pageModal = params.get("modal")
    const routes = ((tab, modal)=>{
        navigate(`?tab=${tab}&modal=${modal}`)
    })

  return (
    <div className="rollbit-modal-popover-container">
        <div className="css-1yogdko">
            <div className="css-xzyayo">
                <div className="css-16ejn9l" width="840">
                    <div className="css-1vkcgi9"> 
                        <CloseButton />
                        <div className="css-nwen1v">
                        <div className="css-uqeajf">
                            <div className="css-1mo5975">
                                <button onClick={()=> routes("auth","login") } className={pageModal === "login" ? "css-ak6yid" : "css-1otg8po"}>Login</button>
                                <button onClick={()=> routes("auth","signup")} className={pageModal === "signup" ? "css-ak6yid" : "css-1otg8po"}>Register</button>
                            </div>
                        </div>
                        { pageModal === "signup" &&  <Signup {...referral}/>}   
                        {pageModal === "login" &&  <Login />}  
                        { pageTab === "forget" &&   <Forget />}
                        { pageTab === "reset" && <Reset />}                   
                        {pageTab === "fa" && <Fa />}
                            
                    </div>
                    <div className="css-97vdup">
                        <div className="css-1uqg8wt">
                            <div></div>
                            {/* <div className="css-92mle7">By accessing the site, I attest that I am at least 18 years old and have read the 
                                <a className="css-1hv393j" href="/terms-and-conditions" target="_blank">Terms &amp; Conditions.</a>
                            </div>  */}
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}
