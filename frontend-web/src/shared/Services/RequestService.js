import Axios from "axios";

export const callLogin= async (email,password,idHotel) => {
    let url = `http://localhost:8000/api/${idHotel}/empleado/login`
    const body = {email, password}
    const res = await Axios.post(url,body);
    console.log(res)
    return res.data;
};

export const getHotels= async () => {
    let url = `http://localhost:8000/api/hoteles/lista`
    const res = await Axios.get(url);
    console.log(res)
    return res.data;
};