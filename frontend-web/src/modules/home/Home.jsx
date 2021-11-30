import React, { useEffect, useState } from "react";
import Title from '../home/components/title/Title'
import Background from '../../assets/img/homeImage.jpg'
import Dropdown from 'react-dropdown';
import Imagen from '../../assets/img/noImage.jpg'
import '../home/home.css'
import { searchReservation, updateReservation, deleteReservation, updateStateReservation } from '../../shared/Services/RequestService'
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
  const [numeroHabitacion, setNumeroHabitacion] = useState("");
  const [file, setFile] = useState("");
  const [base64URL, setBase64] = useState("");
  
  const history = useHistory()

  let idHotel = localStorage.getItem("idHotel")      
  const tiposDocumento = [{ "value": 0, "label": "DNI" }]

  const getBase64 = async (file) => {
    return await new Promise(resolve => {
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);
      };
    });
  }

  const searchRes = async () => {   
    setNroReserva(true)
    if (codigoReserva === "") {
      showAlertNotification('', "Debe ingresar un codigo de reserva", 'danger')
    } else {
      try{
        const data = await searchReservation(idHotel, codigoReserva);
        console.log(data)
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
    debugger
    if ((codigoReserva === "" || idHotel === '' || base64URL === "" || tipoDocumento === "" || numeroDocumento === "" || numeroHabitacion === "") && reservation.estado === "iniciado") {
      showAlertNotification('', "Para actualizar debe ingresar todos los datos.", 'danger')
    }else if (numeroHabitacion === "" && reservation.estado === "completo"){
      showAlertNotification('', "Para actualizar debe ingresar el número de habitación.", 'danger')
    } else {
      const data = await updateReservation(idHotel, codigoReserva, base64URL, tipoDocumento, numeroDocumento, numeroHabitacion, reservation.estado);
      showAlertNotification('', data.msg, 'success')
    }
    searchRes();
  }

  const realizarCheckout = async () => {
    const updateState =  await updateStateReservation(idHotel, codigoReserva, "finalizado");
    showAlertNotification('', updateState.msg, 'success')
    const data = await deleteReservation(codigoReserva, idHotel);
    showAlertNotification('', data.msg, 'success')
    setNroReserva(false)
    setNroHabitacion(false)
  }

  const editDate = (date) => {
    let arrayDate = date.split("T")
    let newDate = arrayDate[0];
    arrayDate = newDate.split("-")
    newDate = arrayDate[2] + "-" + arrayDate[1] + "-" + arrayDate[0];
    return newDate
  }

  const editarFoto = (foto) => {
    setFile(foto)
    getBase64(foto)
    .then(result => {
      let splitResult = result.split(",")
      setBase64(splitResult[1]);
    })
    .catch(err => {
      console.log(err)
    })
  }
  
  useEffect(() => {
  }, [reservation])

  useEffect(() => {
    setNumeroHabitacion("")
    setBase64("")
    setFile("")
  }, [])

  useEffect(() => {
  }, [numeroHabitacion])

  useEffect(() => {
  }, [file])

  useEffect(() => {
    debugger
  }, [base64URL])

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
                  alignContent:"end",
                  marginLeft: "650px",
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
        <div>
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
        >Buscar</button>        { <button onClick={signOff} style={{
          color: "dimgray",
          backgroundColor: "lightgray",
          border: "2px solid lightgray",
          fontWeight: "bolder",
          width: "150px",
          height: "50px",
          fontSize: "70%",
          alignContent:"end",
          marginLeft: "650px",
          marginTop:"20px"
        }}
        >Salir</button> }
        </div>
        <Title className="title-container" />
        {reservation &&
          <table style={{
            backgroundColor: "white",
            marginLeft: "300px",
            marginRight: "300px",
            textAlign: "left",
            padding: "30px 0",
            borderSpacing: "50px 0",
            fontSize: "medium"
          }}>
            <tr>
                {(reservation.estado === "iniciado" || (reservation.estado === "iniciado" && !reservation.huesped.foto))&& <td rowSpan="9"><div style={{ height: "250px", width: "250px", backgroundImage: `url(${Imagen})`, backgroundSize: "100% 100%" }}></div>{reservation.estado !== "inactivo" && <input type="file" name="file" onChange={(e) => {
                editarFoto(e.target.files[0]);}} />}</td>}
              {(reservation.estado === "inactivo" || reservation.estado === "finalizado") && <td rowSpan="9"><div  style={{ height: "250px", width: "250px", backgroundImage: `url(${Imagen})`, backgroundSize: "100% 100%" }}> </div></td>}
              {reservation.estado === "completo" && <td  style={{ height: "50%", width: "50%" }} rowSpan="9"><div style={{ height: "auto", width: "250px", size:"fitContent"}}></div> <img src={`data:image/jpeg;base64,${reservation.huesped.foto}`} style={{height: "250px", width: "250px" }} alt="foto-huesped" /></td>}
              <td colSpan="2" className="table-title">Informacion personal</td>
            </tr>
            <tr>
              <td className="table-subtitle">Huesped</td>
              <td className="table-subtitle">Tipo y nro de documento</td>
            </tr>
            <tr>
              <td className="table-data">{reservation.huesped.nombre} {reservation.huesped.apellido}</td>
              {reservation.estado === "iniciado" && <td className="table-data"><Dropdown options={tiposDocumento} placeholder="Tipo doc" onChange={(e) => setTipoDocumento(e.label)} />
              <input style={{
                width: "100px",
                height: "25px"
              }}
                onChange={(e) => setNumeroDocumento(e.target.value)}
                /></td>}
              {reservation.estado !== "iniciado" && reservation.estado !== "inactivo" && <td className="table-data">{reservation.huesped.tipo} </td>}
              {reservation.estado !== "iniciado" && reservation.estado !== "inactivo" && <td className="table-data">{reservation.huesped.documento}</td>}
              {reservation.estado === "inactivo" && <td className="table-data">-</td>}
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
              {(reservation.estado === "iniciado" || reservation.estado === "completo" || reservation.estado === "finalizado") && <td className="table-subtitle">Habitacion</td>}
            </tr>
            <tr>
              <td><div>{reservation.habitacion !== null &&  reservation.estado === "completo" && <button onClick={realizarCheckout} style={{
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
              {reservation.habitacion !== null && <td className="table-data">{reservation.habitacion}</td>}
              <td style={{display:"flex"}}>{(reservation.estado === "iniciado" || reservation.estado === "completo") && reservation.habitacion === null && <input style={{
                width: "50px",
                height: "25px"
              }}
                onChange={(e) => setNumeroHabitacion(e.target.value)}
              />}
                {reservation.estado === "completo" && reservation.habitacion === null  && <button onClick={actualizarDatos} style={{
                  color: "dimgray",
                  backgroundColor: "lightgray",
                  border: "2px solid lightgray",
                  fontWeight: "bolder",
                  width: "70px",
                  height: "30px",
                  fontSize: "70%",
                  marginLeft:"25px"
                }}
                >Asignar</button>}
                {reservation.estado === "iniciado" && <button onClick={actualizarDatos} style={{
                  color: "dimgray",
                  backgroundColor: "lightgray",
                  border: "2px solid lightgray",
                  fontWeight: "bolder",
                  width: "70px",
                  height: "30px",
                  fontSize: "70%",
                  marginLeft:"25px"

                }}
                >Actualizar datos</button>}{!incompleteReservation || reservation.estado === "inactivo" && <td className="table-data">-</td>}</td>
            </tr>
          </table> 
        }
      </div>}
    </div>
  )
};
export default Home;