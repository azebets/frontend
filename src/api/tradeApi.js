import api from './axios';


async function createAd(data) {
    try {
        const res = await api.post('/api/trade/createAd', data);
        return res.data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export {
    createAd
}