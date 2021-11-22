import Axios from "axios";

export const callLogin= async (email,password,idHotel) => {
    let url = `http://localhost:8000/api/${idHotel}/empleado/login`
    const body = {email, password}
    const res = await Axios.post(url,body);
    return res.data;
};

export const getHotels = async () => {
    let url = `http://localhost:8000/api/hoteles/lista`
    const res = await Axios.get(url);
    return res.data;
};

export const searchReservation = async (idHotel, codReserva) => {
    let url = `http://localhost:8000/api/${idHotel}/${codReserva}`
    const res = await Axios.get(url);
    return res.data;
};

export const updateReservation = async ( idHotel, codigoReserva,imageUpload, tipoDocumento, numeroDocumento) => {
    let url = `http://localhost:8000/api/${idHotel}/${codigoReserva}/actualizar/foto`
    const body = {image:imageUpload, tipo:tipoDocumento, documento:numeroDocumento}
    const res = await Axios.put(url,body);
    return res.data;
};

export const selectRoom = async ( numeroHabitacion,codigoReserva,idHotel) => {
    let url = `http://localhost:8000/api/${idHotel}/${codigoReserva}/actualizar/${numeroHabitacion}`
    const res = await Axios.put(url);
    return res.data;
};

export const deleteReservation = async (codigoReserva,idHotel) => {
    let url = `http://localhost:8000/api/${idHotel}/${codigoReserva}/huesped/borrar`
    const res = await Axios.delete(url);
    return res.data;
};

