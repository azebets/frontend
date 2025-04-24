import { toast } from "sonner";
import api, { backendUrl } from "../axios";
import { setCookie } from "../cookies";

export class AuthScript{
    constructor(){
        this.url = backendUrl();
    }
    fetchVistorsDevice = async()=>{
        const device = await api.get(`https://ipinfo.io/json?token=0d65c9c7910c63`)
        return device
    }
    async login(data){
        const response = await api.post(`${this.url}/auth/login`, data)
        toast.success("login successfully")
         setCookie("token", response.token, 7)
        return response
    }
    async signup(data){
        const response = await api.post(`${this.url}/auth/signup`, data)
        toast.success("Signup successfully")
        setCookie("token", response.token, 7)
        return response
    }
 
}   