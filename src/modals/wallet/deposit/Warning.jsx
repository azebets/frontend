import React from 'react'
import { NavLink } from 'react-router'

export default function Warning({handleClose}) {
  return (
    <div className="css-1yogdko">
        <div className="css-xzyayo">
            <div className="css-1bws6us" width="600">
                <div className="css-1nc5kzu">
                    <button onClick={handleClose} className="css-1ou4ub2">
                        <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" size="20" className="css-1cvv4jt">
                            <title>cross</title>
                            <g id="cross" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <path d="M12.5490552,5.44652354 L10.0190552,7.97452354 L7.48905518,5.44452354 C7.12622749,5.06665914 6.58740604,4.91458087 6.08055863,5.04698605 C5.57371122,5.17939123 5.17811268,5.57557067 5.04645136,6.08261183 C4.91479005,6.58965298 5.0676588,7.1282507 5.44605518,7.49052354 L7.97505518,10.0205235 L5.44805518,12.5475235 C4.89838994,13.1154377 4.90565787,14.0192007 5.46438558,14.5782014 C6.0231133,15.137202 6.9268726,15.1449113 7.49505518,14.5955235 L10.0190552,12.0635235 L12.5470552,14.5925235 C12.9101461,14.9696355 13.4486088,15.1212283 13.9551127,14.9889326 C14.4616166,14.8566368 14.8571684,14.461085 14.9894642,13.9545811 C15.12176,13.4480771 14.9701671,12.9096144 14.5930552,12.5465235 L12.0690552,10.0215235 L14.5960552,7.49452354 C15.1457204,6.92660935 15.1384525,6.02284638 14.5797248,5.46384572 C14.0209971,4.90484505 13.1172378,4.89713573 12.5490552,5.44652354 Z" id="Close" fill="currentColor"></path>
                            </g>
                        </svg>
                    </button>
                </div>
                <div className="css-av8uu6">
                    <h1 className="css-1bsu6qd">Please verify your account to deposit</h1>
                    <div className="css-1ms7584">
                        <div className="css-x3ayqu">
                            <svg width="21" height="19" viewBox="0 0 21 19" xmlns="http://www.w3.org/2000/svg" size="20" color="#ffe500" glow="#FFB018" className="css-3fqycy">
                                <path fillRule="evenodd" clipRule="evenodd" d="M11.7013 1.19853C11.3182 0.522528 10.3443 0.522527 9.96124 1.19853L0.962978 17.0785C0.585235 17.7451 1.06679 18.5715 1.83301 18.5715H19.8295C20.5957 18.5715 21.0773 17.7451 20.6996 17.0785L11.7013 1.19853ZM11.5541 12.1603C11.777 12.1603 11.8456 12.0574 11.8627 11.8345L12.017 6.92026C12.017 6.68026 11.9484 6.5774 11.7084 6.5774H9.97127C9.73127 6.5774 9.64555 6.68026 9.64555 6.92026L9.81698 11.8345C9.83413 12.0574 9.9027 12.1603 10.1256 12.1603H11.5541ZM11.7084 15.806C11.9313 15.806 12.017 15.7203 12.017 15.4803V13.646C12.017 13.4231 11.9313 13.3203 11.7084 13.3203H9.97127C9.73127 13.3203 9.64555 13.4231 9.64555 13.646V15.4803C9.64555 15.7203 9.73127 15.806 9.97127 15.806H11.7084Z" fill="currentColor"></path>
                            </svg>
                            Don't deposit to any previous addresses, as deposits will not be credited
                        </div>
                    </div>
                    <div className="css-8uluvh">
                        <div className="css-1ukjvr7" style={{margin: "0px", width: "100%", padding: "14px 16px 16px"}}>
                            <div className="css-1l763us">
                                <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" size="18" className="css-oluyn3">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.36621 0.994275C4.36621 0.58206 4.69828 0.25 5.11047 0.25H6.83952C7.25172 0.25 7.58377 0.58206 7.58377 0.994275V1.58206C7.58377 1.65076 7.51887 1.69657 7.45782 1.67748C6.98837 1.54771 6.49982 1.48283 6.00362 1.48283C5.48837 1.48283 4.98454 1.55152 4.4998 1.69275C4.43492 1.71183 4.37003 1.66221 4.37003 1.59733V0.994275H4.36621ZM6.00005 11.75C3.32827 11.75 1.16797 9.5859 1.16797 6.91795C1.16797 4.25 3.33209 2.08588 6.00005 2.08588C8.6718 2.08588 10.8321 4.24618 10.8321 6.91795C10.8321 9.58205 8.66795 11.75 6.00005 11.75ZM6.0153 3.41794C6.0153 3.37578 6.0495 3.34152 6.09165 3.3424C6.79175 3.35714 7.4733 3.57436 8.0534 3.9686C8.65455 4.37715 9.11905 4.95694 9.3866 5.63275C9.6542 6.30855 9.7125 7.0492 9.55395 7.75855C9.4009 8.44305 9.0528 9.0679 8.55255 9.5579C8.5224 9.5874 8.47405 9.58585 8.4452 9.5551L6.036 6.9896C6.0227 6.97545 6.0153 6.95675 6.0153 6.93735V3.41794Z" fill="currentColor"></path>
                                </svg>
                                Verification is required
                            </div>
                            <NavLink to="/verification">
                                <button className="css-vmbe4r">Verify Account</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

  )
}
