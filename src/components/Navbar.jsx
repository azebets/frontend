import React, { useContext } from 'react'
import "../styles/navbar.css"
import { assets } from '../constants'
import { useNavigate, NavLink, useLocation } from "react-router";
import AuthLayout from '../modals/Layout';
import { AppContext } from '../context/AppContext';

export default function Navbar() {
    const location = useLocation()
    const {Modalroutes} = useContext(AppContext)
    const params = new URLSearchParams(location.search)
    const pageTab = params.get("tab")


  return (
    <>

    {pageTab === "auth" &&<AuthLayout />}
        <div className="css-1cn0dze" style={{height: "64px"}}>
        <div className="css-jbqya4">
        <NavLink to="/" style={{marginRight: "auto"}}>
            <img src={assets?.logo} className="logo" alt="cyclix" />
        </NavLink>
        <button onClick={()=> Modalroutes("auth", "login")} className="css-1wkotyo">Login</button>
        <button onClick={()=> Modalroutes("auth", "signup")} className="css-1psueex">Join Now</button>
        <button onClick={()=> Modalroutes("search","all-game")} className="css-qik1t1">
            <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" size="19" className="css-1duiatx">
                <title>search</title>
                <g id="search" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g transform="translate(2.000000, 2.000000)" fill="currentColor" id="Search">
                        <path d="M10.8907486,1.88158344 C8.56851055,-0.456863326 4.86024486,-0.63790201 2.32381727,1.46334318 C-0.212610329,3.56458838 -0.747072288,7.26041735 1.08908942,10.0015429 C2.92525113,12.7426685 6.5310935,13.6319691 9.41939979,12.0560283 L13.2412484,15.70857 C13.6557604,16.1041785 14.3079901,16.0960217 14.7125973,15.6901693 L15.6934965,14.703431 C16.1021678,14.2898609 16.1021678,13.621943 15.6934965,13.208373 L11.9848285,9.47072793 C13.3299497,6.97621926 12.8848765,3.88894492 10.8907486,1.88158344 Z M8.99640128,9.04521142 C7.93947287,10.1089675 6.34957152,10.4274154 4.96820775,9.8520349 C3.58684398,9.27665439 2.6861184,7.92078373 2.6861184,6.41678442 C2.6861184,4.91278512 3.58684398,3.55691446 4.96820775,2.98153395 C6.34957152,2.40615343 7.93947287,2.72460133 8.99640128,3.78835743 C10.4351638,5.24178142 10.4351638,7.59178743 8.99640128,9.04521142 L8.99640128,9.04521142 Z"></path>
                    </g>
                </g>
            </svg>
        </button>
        <button  className="css-qik1t1">
            <svg width="16px" height="15px" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" size="15.5" top="1" className="css-ouqosf">
                <title>global-chat</title>
                    <g id="\uD83D\uDCDD-Style-Guide" stroke="none" strokeWidth="1" fill="currentColor" fillRule="evenodd">
                        <g id="Rollbit-StyleGuide" transform="translate(-332.000000, -3228.000000)">
                            <g id="Group-33" transform="translate(250.000000, 3192.000000)">
                                <g id="global-chat" transform="translate(80.000000, 33.000000)"><g>
                                    <path d="M4,15 C2.8954305,15 2,14.1045695 2,13 L2,5 C2,3.8954305 2.8954305,3 4,3 L16,3 C17.1045695,3 18,3.8954305 18,5 L18,13 C18,14.1045695 17.1045695,15 16,15 L15,15 L15,17.5350238 C15,17.6299398 14.9662479,17.721763 14.9047757,17.7940832 C14.7617012,17.9624062 14.5092636,17.9828741 14.3409406,17.8397995 L14.3409406,17.8397995 L11,15 L4,15 Z" id="Combined-Shape" fill="currentColor"></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        </button>
    </div>
    </div>
    </>

  )
}
