import { io } from "socket.io-client";
import axios from "axios"
import { serverUrl } from "$lib/backendUrl";
import { publicChat } from "$lib/store/profile";
import { dicegameplays } from "$lib/games/ClassicDice/store/index";

const URL = serverUrl()
const socket = io(`${URL}`);

export const handleSocketConnection = (async()=>{
    socket.on("dice-gamePLayers", data => {
        dicegameplays.set(data)
    })
    socket.on("new-message", data => {
        publicChat.set(data)
    })
    const handlePublicChat = (async(data)=>{
        socket.emit("public-chat", data)
    })
    const handleDicebet = (async(data)=>{
        socket.emit("dice-game", data)
    })
    return {handlePublicChat, handleDicebet}
})

export const handleFetchPublicChat = (async()=>{
    await axios.get(`${URL}/auth/previus-chats`)
    .then((res) => {
        publicChat.set(res.data);
    })
    .catch((error)=>{
        console.log(error)
    })
})