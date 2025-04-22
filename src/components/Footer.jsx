import React from 'react'
import { assets } from '../constants'
import '../styles/footer.css'

export default function Footer() {
    const [screen, setScreen] = React.useState(window.innerWidth)
  return (
    <div className="css-smran7">
        <div className={screen > 750 ? "css-1d3r2lt" : "css-1vfwx11"}>
            <div className={screen > 750 ? "css-8at0mx" : "css-i0m45y"}>
                <img src={assets?.logo} alt="" className="css-z34z8j" />
                <div className="css-j2onl9">Copyright © 2024 CyclixGames.com. All rights reserved. Cyclix Games is a brand name of Global Dragon Ventures Ltd. Company Address: 2118 Guava Street, Belama Phase 1, Belize City, Belize. 
            </div>
        <div className="css-j2onl9">Cyclix Games Casino is licensed and authorized by the Government of Anjouan.</div>
        <div className="css-j2onl9">Crypto trading is not gambling, and therefore not covered by our gaming license</div>
        <div className="css-1sg2lsz" style={{paddingTop: "8px"}}>

            <div className="css-1c2cxsw">18+</div>
        </div>
    </div>
     {/* <div className="css-8at0mx">
        <div className="{screen > 750 ? "css-8at0mx" : "css-i0m45y"}">Platform</div>
        <a className="css-cac6yr" href="/?faq">FAQ</a>
        <a className="css-cac6yr" href="/?partnership-program">Partnership Program</a>
        <a href="?https://blog.cyclix.com/" target="_blank" className="css-cac6yr">Blog</a>
        <a href="?https://help.cyclix.com/" target="_blank" className="css-cac6yr">Help Center</a>
    </div>  */}
    <div className="css-8at0mx">
         <div className={screen > 750 ? "css-8at0mx" : "css-i0m45y"}>About us</div>
         {/* <a className="css-cac6yr" href="/?aml">AML Policy</a>
         <a className="css-cac6yr" href="/?sports-policy">Sports Policy</a>
         <a className="css-cac6yr" href="/?responsible-gaming">Responsible Gaming</a> */}
        <a className="css-cac6yr" href="/?support">Support</a>
        <a className="css-cac6yr" href="/?privacy">Privacy Policy</a>
        <a className="css-cac6yr" href="/?terms-and-conditions">Terms and Conditions</a>
    </div>
    <div className="css-8at0mx">
        <div className={screen > 750 ? "css-8at0mx" : "css-i0m45y"}>Community</div>
         <a href="https://facebook.com" target="_blank" className="css-cac6yr">Facebook</a> 
        <a href="https://x.com" target="_blank" className="css-cac6yr">X</a>
         <a href="https://instagram.com" target="_blank" className="css-cac6yr">Instagram</a> 
        <a href="https://discord.gg" target="_blank" className="css-cac6yr">Discord</a> 
        
    </div>
</div>
</div>
  )
}
