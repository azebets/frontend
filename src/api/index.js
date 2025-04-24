import api, { backendUrl } from './axios';

export class UserScript{
    constructor(){
        this.user = null
        this.url = backendUrl()
    }
    async fetchUser(){
        try{
            const response = await api.get(`${this.url}/api/profile/user`)
            return response
        }
        catch(err){
            console.log(err)
        }
    }
}
