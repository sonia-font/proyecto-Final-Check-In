import Axios from "axios";

export const callLogin = async (email, password, idHotel) => {
  let url = `http://localhost:8000/api/${idHotel}/empleado/login`;
  const body = { email, password };
  const res = await Axios.post(url, body);
  return res.data;
};

export const getHotels = async () => {
  let url = `http://localhost:8000/api/hoteles/lista`;
  const res = await Axios.get(url);
  return res.data;
};

export const searchReservation = async (idHotel, codReserva) => {
  let url = `http://localhost:8000/api/${idHotel}/${codReserva}`;
  const res = await Axios.get(url);
  return res.data;
};

export const updateReservation = async (idHotel, codigoReserva, imageToSend, tipoDocumento, numeroDocumento, numeroHabitacion, estado) => {
  let body;
  if(estado === "iniciado"){
    body = { image: imageToSend, tipo: tipoDocumento, documento: numeroDocumento, habitacion: numeroHabitacion };
  } else{
    body = {habitacion: numeroHabitacion}
  }
  let url = `http://localhost:8000/api/${idHotel}/${codigoReserva}/actualizar/true`;
  const res = await Axios.put(url, body);
  return res.data;
};

export const deleteReservation = async (codigoReserva, idHotel) => {
  let url = `http://localhost:8000/api/${idHotel}/${codigoReserva}/huesped/borrar`;
  const res = await Axios.delete(url);
  return res.data;
};
