import React, { useEffect, useState } from "react";
import Title from '../home/components/title/Title'
import Background from '../../assets/img/homeImage.jpg'
import Imagen from '../../assets/img/cr7.jpg'
import '../home/home.css'
import { searchReservation, updateReservation, selectRoom,deleteReservation } from '../../shared/Services/RequestService'
import { showAlertNotification } from '../../shared/AlertNotification/AlertNotification'

const Home = () => {
  const [nroReserva, setNroReserva] = useState("");
  const [nroHabitacion, setNroHabitacion] = useState("");
  const [incompleteReservation, setIncompleteReservation] = useState(false);
  const [reservation, setReservation] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [codigoReserva, setCodigoReserva] = useState("");
  const [imageUpload, setImageUpload] = useState("");
  const [numeroHabitacion, setNumeroHabitacion] = useState("");

  let idHotel = 0;

  const searchRes = async () => {
    setNroReserva(true)
    if (codigoReserva === "") {
      showAlertNotification('', "Usuario y/o contraseña incorrecta.", 'danger')
    } else {
      const data = await searchReservation(idHotel, codigoReserva);
      if (data && data.huesped.foto !== "") {
        setReservation(data)
        setIncompleteReservation(false)
      } else {
        setReservation(data)
        setIncompleteReservation(true)
      }
    }
  };

  const actualizarDatos = async () => {
    if (codigoReserva === "" || idHotel === '' || imageUpload === "" || tipoDocumento === "" || numeroDocumento === "") {
      showAlertNotification('', "Para actualizar debe ingresar todos los datos.", 'danger')
    } else {
      const data = await updateReservation(idHotel, codigoReserva, imageUpload, tipoDocumento, numeroDocumento);
      showAlertNotification('', data.msg, 'success')
    }
    searchRes();
  }

  const realizarCheckout = async () => {
    const data = await deleteReservation(codigoReserva, idHotel);
    showAlertNotification('', data.msg, 'success')
    setNroReserva(false)
    setNroHabitacion(false)
  }

  const asignarHabitacion = async () => {
    if (numeroHabitacion === "" || codigoReserva === "" || idHotel === '') {
      showAlertNotification('', "Debe seleccionar un número de habitación.", 'danger')
    } else {
      const data = await selectRoom(numeroHabitacion, codigoReserva, idHotel);
      showAlertNotification('', data.msg, 'success')
      setNroHabitacion(true)
    }
  }

    useEffect(() => {
      console.log(reservation);
    }, [reservation])

    useEffect(() => {
      console.log(imageUpload);
    }, [imageUpload])

    useEffect(() => {
      console.log(numeroHabitacion);
    }, [numeroHabitacion])

    useEffect(() => {
      console.log(codigoReserva);
    }, [codigoReserva])

    useEffect(() => {
      console.log(tipoDocumento);
    }, [tipoDocumento])

    useEffect(() => {
      console.log(numeroDocumento);
    }, [numeroDocumento])

    return (
      <div>
        {!nroReserva && <div style={{
          width: "100vw",
          height: "100vh",
          backgroundImage: `url(${Background})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          textAlign: "center",
          fontSize: "30px",
          color: "black",
        }}>
          <input style={{
            width: "300px",
            height: "40px",
            marginRight: "5px",
            position: "absolute",
            left: "300px",
            top: "20px"
          }}
            onChange={(e) => setCodigoReserva(e.target.value)}
            placeholder='Ingrese un codigo de reserva'
          />
          <button onClick={searchRes} style={{
            color: "dimgray",
            backgroundColor: "lightgray",
            border: "2px solid lightgray",
            fontWeight: "bolder",
            width: "150px",
            height: "45px",
            fontSize: "70%",
            position: "absolute",
            left: "615px",
            top: "20px"
          }}
          >Buscar</button>
        </div>}
        {nroReserva && <div style={{
          width: "100vw",
          height: "100vh",
          backgroundImage: `url(${Background})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          textAlign: "center",
          fontSize: "30px",
          color: "black",
        }} >
          <input style={{
            width: "300px",
            height: "40px",
            marginRight: "5px",
            position: "absolute",
            left: "300px",
            top: "20px"
          }}
            onChange={(e) => setCodigoReserva(e.target.value)}
            placeholder='Ingrese un codigo de reserva'
          />
          <button onClick={searchRes} style={{
            color: "dimgray",
            backgroundColor: "lightgray",
            border: "2px solid lightgray",
            fontWeight: "bolder",
            width: "150px",
            height: "45px",
            fontSize: "70%",
            position: "absolute",
            left: "615px",
            top: "20px"
          }}
          >Buscar</button>
          <Title className="title-container" />
          {reservation &&
            <table style={{
              backgroundColor: "white",
              marginLeft: "300px",
              marginRight: "300px",
              textAlign: "left",
              padding: "30px 0",
              borderSpacing: "50px 0",
              fontSize: "large"
            }}>
              <tr>
                {incompleteReservation && <td rowSpan="9"><img src={Imagen} style={{ height: "80%", width: "80%" }} alt="foto-huesped" /><input type="file" name="file" onChange={(e) => setImageUpload(e.target.value)} /></td>}
                {!incompleteReservation && <td rowSpan="9"><img src={reservation.huesped.foto} style={{ height: "80%", width: "80%" }} alt="foto-huesped" /></td>}
                <td colSpan="3" className="table-title">Informacion personal</td>
              </tr>
              <tr>
                <td className="table-subtitle">Huesped</td>
                <td className="table-subtitle">Tipo de doc. N° de doc.</td>
              </tr>
              <tr>
                <td className="table-data">{reservation.huesped.nombre} {reservation.huesped.apellido}</td>
                {incompleteReservation && <td className="table-data"><input style={{
                  width: "50px",
                  height: "25px",
                  marginRight: "20px"
                }}
                  onChange={(e) => setTipoDocumento(e.target.value)}
                /><input style={{
                  width: "100px",
                  height: "25px"
                }}
                  onChange={(e) => setNumeroDocumento(e.target.value)}
                  /></td>}
                {!incompleteReservation && <td className="table-data">{reservation.huesped.tipo} </td>}
                {!incompleteReservation && <td className="table-data">{reservation.huesped.documento}</td>}
              </tr>
              <tr>
                <td className="table-subtitle">Email</td>
                <td></td>
              </tr>
              <tr>
                <td className="table-data">{reservation.huesped.email}</td>
                <td></td>
              </tr>
              <tr>
                <td colSpan="2" className="table-title">Datos de reserva</td>
              </tr>
              <tr>
                <td className="table-subtitle">Comienzo</td>
                <td className="table-subtitle">Fin</td>
              </tr>
              <tr>
                <td className="table-data">{reservation.inicio}</td>
                <td className="table-data">{reservation.fin}</td>
              </tr>
              <tr>
                <td className="table-subtitle">Estado</td>
                {!incompleteReservation && <td className="table-subtitle">Habitacion</td>}
              </tr>
              <tr>
                <td><div>{nroHabitacion && <button onClick={realizarCheckout} style={{
                  color: "dimgray",
                  backgroundColor: "lightgray",
                  border: "2px solid lightgray",
                  fontWeight: "bolder",
                  width: "325px",
                  height: "30px",
                  fontSize: "70%"
                }}
                >Realizar checkout</button>}</div></td>
                <td className="table-data">{reservation.estado}</td>
                <td>{!incompleteReservation && <input style={{
                  width: "50px",
                  height: "25px"
                }}
                  onChange={(e) => setNumeroHabitacion(e.target.value)}
                />}
                  {!incompleteReservation && <button onClick={asignarHabitacion} style={{
                    color: "dimgray",
                    backgroundColor: "lightgray",
                    border: "2px solid lightgray",
                    fontWeight: "bolder",
                    width: "70px",
                    height: "30px",
                    fontSize: "70%",
                    marginLeft: "5px"
                  }}
                  >Asignar</button>}
                  {incompleteReservation && <button onClick={actualizarDatos} style={{
                    color: "dimgray",
                    backgroundColor: "lightgray",
                    border: "2px solid lightgray",
                    fontWeight: "bolder",
                    width: "150px",
                    height: "50px",
                    fontSize: "70%",
                    marginLeft: "5px"
                  }}
                  >Actualizar datos</button>}</td>
              </tr>

            </table>
          }
        </div>}

      </div>
    )
  };
  export default Home;