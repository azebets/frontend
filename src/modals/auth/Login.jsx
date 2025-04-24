import React from 'react'
import { AppContext } from '../../context/AppContext'
import Google from './Google'
import { useNavigate } from 'react-router'

export default function Login() {
    const navigate = useNavigate()
    const {Modalroutes, _auth, setWallet, setUser} = React.useContext(AppContext)
    const [loading, setLoading] = React.useState(false)
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [showPassword, setShowPassword] = React.useState(false)
    const [track, setTrack] = React.useState(false)
    const [error, setError] = React.useState("")
    const [success, setSuccess] = React.useState("")

    const handleSubmit = async (e) => {
        try{
            setLoading(true)
            const data = {
                email: email,
                password: password,
                device: await _auth?.fetchVistorsDevice()
            }
            const response = await _auth.login(data)
            setUser(response.user)
            setWallet(response.wallet)
            setLoading(false)
            navigate(window.location.pathname)
        }
        catch(err){
            console.log(err)
            setLoading(false)
        }
 
    }

  return (
    <>
         <div className="css-exhu38">
        <label htmlFor="rollbit-field-112" className="css-1vec8iw">
            Email<span className="css-1vr6qde"> *</span>
        </label>
    <div>
        <div className="css-14hgewr">
            <input type="email" name="email" onChange={(e)=> setEmail(e.target.value)} placeholder="youremail@domain.com" id="rollbit-field-112" value={email}/>
        </div>
        </div>
    </div>
    <div className="css-exhu38">
        <label htmlFor="rollbit-field-113" className="css-1vec8iw">
            Password
            <span className="css-1vr6qde"> *</span>
        </label>
        <div>
            <div className="css-14hgewr">
            <input type="password" name="password" onChange={(e)=> setPassword(e.target.value)} placeholder="********" id="rollbit-field-113" value={password} />  
            <button onClick={()=> togglePasswordVisibility("pass")} className="css-u44gsswwe"
                aria-label={showPassword ? 'Hide password' : 'Show password'} >
                {showPassword ? 
                  <svg fill="currentColor" viewBox="0 0 64 64" className="svg-icon " > <title></title> <path fillRule="evenodd" clipRule="evenodd" d="M0 32c6.63-11.67 18.48-19.45 32-19.45S57.37 20.33 64 32c-6.63 11.67-18.48 19.45-32 19.45S6.63 43.67 0 32Zm18.19 0c0 7.66 6.21 13.87 13.87 13.87h.01c7.654 0 13.86-6.206 13.86-13.86V32c0-7.66-6.21-13.87-13.87-13.87-7.66 0-13.87 6.21-13.87 13.87Zm13.87 8.2a8.2 8.2 0 0 0 0-16.4 8.2 8.2 0 0 0 0 16.4Z"></path></svg>
                :
                <svg fill="currentColor" viewBox="0 0 64 64" className="svg-icon " > <title></title> <path fillRule="evenodd" clipRule="evenodd" d="M47.7 47.72 3.86 3.89.12 7.63l11.51 11.51C6.858 22.546 2.954 26.852.102 31.836L0 32.03C6.63 43.7 18.48 51.48 32 51.48h.012c3.613 0 7.095-.56 10.367-1.593L52.602 60.11l3.74-3.74-8.64-8.64-.002-.01ZM32.06 45.9c-7.656-.012-13.86-6.222-13.86-13.88 0-1.9.382-3.712 1.074-5.362l-.034.092 4.66 4.65v.63a8.2 8.2 0 0 0 8.2 8.2h.63l4.65 4.65c-1.544.646-3.336 1.02-5.218 1.02h-.102Zm0-27.74h.002c7.66 0 13.87 6.21 13.87 13.87 0 1.904-.384 3.72-1.079 5.373l-.003-.003-.034.09.037-.087 7.527 7.527c4.764-3.414 8.664-7.722 11.518-12.706L64 32.03c-6.63-11.67-18.48-19.45-32-19.45a34.73 34.73 0 0 0-10.616 1.668l.246-.068 5.07 5.06c1.582-.682 3.424-1.08 5.36-1.08Zm8.16 14.61-8.9-8.9.033-.003a8.76 8.76 0 0 1 .667-.037 8.2 8.2 0 0 1 8.2 8.2v.74Z"></path></svg>
                }
            </button>
            </div>
        </div>
        <div className="css-g5wbxx">
            <button onClick={()=> Modalroutes("auth","forget")} className="css-19mv5jr">Forgot password?</button>
        </div>
    </div>
    <div className="css-1vec8iw"></div>

        <div className="css-1nsxilh">This site is protected by reCAPTCHA and the Google 
            <a href="#" rel="noreferrer">Privacy Policy</a> 
            and
            <a href="#" rel="noreferrer">Terms of Service</a> apply.
        </div>
        <button className="css-u44gss button" disabled={loading} onClick={handleSubmit} type="submit"> {loading ? "Loading..." : "Login"}</button>
        <Google text={"Sign in with Google"}/>

    </>
  )
}
