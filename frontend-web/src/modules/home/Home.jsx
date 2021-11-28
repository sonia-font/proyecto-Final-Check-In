import React, { useEffect, useState } from "react";
import Title from '../home/components/title/Title'
import Background from '../../assets/img/homeImage.jpg'
import Imagen from '../../assets/img/noImage.jpg'
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
  const [imageToSend, setImageToSend] = useState("");
  
  const history = useHistory()

  let idHotel = localStorage.getItem("idHotel")      
  let data = "";

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
    if (codigoReserva === "" || idHotel === '' || imageToSend === "" || tipoDocumento === "" || numeroDocumento === "") {
      showAlertNotification('', "Para actualizar debe ingresar todos los datos.", 'danger')
    } else {
      const data = await updateReservation(idHotel, codigoReserva, imageToSend, tipoDocumento, numeroDocumento);
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

  // const getBase64 = (file) => {
  //   return new Promise(resolve => {
  //     let fileInfo;
  //     let baseURL = "";
  //     // Make new FileReader
  //     let reader = new FileReader();

  //     // Convert the file to base64 text
  //     reader.readAsDataURL(file);

  //     // on reader load somthing...
  //     reader.onload = () => {
  //       // Make a fileInfo Object
  //       console.log("Called", reader);
  //       baseURL = reader.result;
  //       console.log(baseURL);
  //       resolve(baseURL);
  //     };
  //     console.log(fileInfo);
  //   });
  // };


  useEffect(() => {
  }, [reservation])

  useEffect(() => {
  }, [imageToSend])

  useEffect(() => {
    setNumeroHabitacion("")
  }, [])

  useEffect(() => {
    // getBase64(imageUpload).then(result => {
    //   imageUpload["base64"] = result;
    //   console.log("File Is", imageUpload);
    //   this.setState({
    //     base64URL: result,
    //     imageUpload
    //   });
    // })
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
              {incompleteReservation && <td rowSpan="9"><img src={Imagen} style={{ height: "80%", width: "80%" }} alt="foto-huesped" /><input type="file" name="file" onChange={(e) => setImageUpload(e.target.files[0])} /></td>}
              {!incompleteReservation && <td rowSpan="9"><img src={`data:image/jpeg;base64,${reservation.huesped.foto}`} style={{ height: "80%", width: "80%" }} alt="foto-huesped" /></td>}
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