import React, { useEffect, useState } from "react";
import Title from '../home/components/title/Title'
import Background from '../../assets/img/homeImage.jpg'
import Imagen from '../../assets/img/cr7.jpg'
import '../home/home.css'
import { searchReservation, updateReservation, selectRoom, deleteReservation } from '../../shared/Services/RequestService'
import { showAlertNotification } from '../../shared/AlertNotification/AlertNotification'
import { useHistory } from 'react-router-dom'

const Home = () => {
  const [nroReserva, setNroReserva] = useState("");
  const [nroHabitacion, setNroHabitacion] = useState("");
  const [incompleteReservation, setIncompleteReservation] = useState("false");
  const [reservation, setReservation] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [codigoReserva, setCodigoReserva] = useState("");
  const [imageUpload, setImageUpload] = useState("");
  const [numeroHabitacion, setNumeroHabitacion] = useState("");
  const history = useHistory()

  let idHotel = localStorage.getItem("idHotel")

  const data = "data:image/jpeg;base64,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";
  
  const searchRes = async () => {
    setNroReserva(true)
    if (codigoReserva === "") {
      showAlertNotification('', "Debe ingresar un codigo de reserva", 'danger')
    } else {
      try{
        const data = await searchReservation(idHotel, codigoReserva);
        console.log(data.huesped.foto)
        if (data && data.huesped.foto !== "") {
          setReservation(data)
          setIncompleteReservation(false)
        } else {
          setReservation(data)
          setIncompleteReservation(true)
        }
      }catch(er){
        showAlertNotification('', "Reserva no encontrada", 'danger')
      }      
    }
  };

  const signOff = () => {
    history.push("/login")
  }

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

  const editDate = (date) => {
    let arrayDate = date.split("T")
    let newDate = arrayDate[0];
    arrayDate = newDate.split("-")
    newDate = arrayDate[2] + "-" + arrayDate[1] + "-" + arrayDate[0];
    return newDate
  }

  useEffect(() => {
  }, [reservation])

  useEffect(() => {
    setNumeroHabitacion("")

  }, [])

  useEffect(() => {
  }, [imageUpload])

  useEffect(() => {
  }, [numeroHabitacion])

  useEffect(() => {
  }, [codigoReserva])

  useEffect(() => {
  }, [tipoDocumento])

  useEffect(() => {
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
         <button onClick={signOff} style={{
                  color: "dimgray",
                  backgroundColor: "lightgray",
                  border: "2px solid lightgray",
                  fontWeight: "bolder",
                  width: "150px",
                  height: "50px",
                  fontSize: "70%",
                  marginLeft: "450px",
                  marginTop:"20px"
                }}
                >Salir</button>
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
              {/* {incompleteReservation && <td rowSpan="9"><img src={Imagen} style={{ height: "80%", width: "80%" }} alt="foto-huesped" /><input type="file" name="file" onChange={(e) => setImageUpload(e.target.files[0])} /></td>} */}
              {/* {!incompleteReservation && <td rowSpan="9"><img src={reservation.huesped.foto} style={{ height: "80%", width: "80%" }} alt="foto-huesped" /></td>} */}
              {/* {!incompleteReservation && <td rowSpan="9"><img src={`data:image/jpeg;base64,${data}`} style={{ height: "80%", width: "80%" }} alt="foto-huesped" /></td>} */}
              {reservation && <td rowSpan="9"><img src={`data:image/png;base64,${data}`} style={{ height: "80%", width: "80%" }} alt="foto-huesped" /></td>}
              <td colSpan="3" className="table-title">Informacion personal</td>
            </tr>
            <tr>
              <td className="table-subtitle">Huesped</td>
              <td className="table-subtitle">Tipo de doc. N° de doc.</td>
            </tr>
            <tr>
              <td className="table-data">{reservation.huesped.nombre} {reservation.huesped.apellido}</td>
              {incompleteReservation && <td className="table-data"><input type="text" style={{
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
              <td className="table-data">{editDate(reservation.inicio)}</td>
              <td className="table-data">{editDate(reservation.fin)}</td>
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
                <button onClick={signOff} style={{
                  color: "dimgray",
                  backgroundColor: "lightgray",
                  border: "2px solid lightgray",
                  fontWeight: "bolder",
                  width: "150px",
                  height: "50px",
                  fontSize: "70%",
                  marginLeft: "5px",
                  marginTop:"40px"
                }}
                >Salir</button>

      </div>}
    </div>
  )
};
export default Home;