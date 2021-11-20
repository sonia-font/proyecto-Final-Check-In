import React, {useEffect, useState} from "react";
import Title from '../home/components/title/Title'
// import Input from '../login/components/input/Input'
import Background from '../../assets/img/homeImage.jpg'
import Label from './components/label/Label'
import Imagen from '../../assets/img/perrito.jpg'

const Home = () =>{
    
    const [nroReserva, setNroReserva] = useState("");
    const [nroHabitacion, setNroHabitacion] = useState("");

    const buscar = () => {
      setNroReserva(true)
};
    const asignarHabitacion = ()=> {
      setNroHabitacion(true)
    }
    const realizarCheckout = () => {
      setNroReserva(false)
      setNroHabitacion(false)
    }

    const data = {
      nroReserva:"01",
      nombreHuesped:"Dummy",
      dni:"12345678",
      numeroDeHuespedes:"2",
      acompañante1:"Dummy tummy",
      dniAcompañante1:"12312312",
      numeroDeHabitacion:null,
    }
    return(
      <div>
{ !nroReserva && <div style={{
            width: "100vw",
            height: "100vh",
            backgroundImage: `url(${Background})`,
            backgroundSize: "100% 100%",
            backgroundRepeat:"no-repeat",
            textAlign: "center",
            fontSize: "30px",
            color: "black",
            }}>
            <Title className="title-container"/>
            <Label text="Ingrese el número de reserva"/>
            <input  style={{
                padding: "1%",
                marginBottom: "2%"}}
                onChange={(e) => (e.target.value)}
                placeholder='Número de reserva'
            />
            <button onClick={buscar} style={{
                color:"#f5f5dc",
                backgroundColor: "grey",
                border: "2px solid  #50564f",
                marginTop: "5vh",
                marginLeft:"2%",
                fontWeight: "bolder",
                width:"10%",
                height: "8%",
                fontSize: "70%"
                }} >Buscar</button>
        </div>}
  {nroReserva &&        <div style={{
            width: "100vw",
            height: "100vh",
            backgroundImage: `url(${Background})`,
            backgroundSize: "100% 100%",
            backgroundRepeat:"no-repeat",
            textAlign: "center",
            fontSize: "30px",
            color: "black",
            }} > 
            <Title className="title-container"/>
            <Label text="Ingrese el número de reserva"/>
            <input  style={{
                padding: "1%",
                marginBottom: "2%"}}
                onChange={(e) => (e.target.value)}
                placeholder='Número de reserva'
            />
            <button onClick={buscar} style={{
                color:"#f5f5dc",
                backgroundColor: "grey",
                border: "2px solid  #50564f",
                marginTop: "5vh",
                marginLeft:"2%",
                fontWeight: "bolder",
                width:"10%",
                height: "8%",
                fontSize: "70%"
                }}
    >Buscar</button>
            {nroReserva && <div><img src={Imagen} style={{height:"10%",width:"10%", marginBottom:"5%"}}/></div>}
            { nroReserva && 
                <table  style={{color:"#f5f5dc", borderColor:"white", margin:"auto",textAlign:"center",  border: "3px solid #50564f"}}>
                <tr style={{ backgroundColor:"#f5f5dc", color:"black"}}>
                  <td>N° de reserva: </td>
                  <td>{data.nroReserva}</td>
                </tr>
                <tr style={{ backgroundColor:"#f5f5dc", color:"black"}}>
                  <td>Reserva a nombre de: </td>
                  <td>{data.nombreHuesped}</td>
                </tr>
                <tr style={{ backgroundColor:"#f5f5dc", color:"black"}}>
                  <td>DNI: </td>
                  <td>{data.dni}</td>
                </tr>
                <tr style={{ backgroundColor:"#f5f5dc", color:"black"}}>
                  <td>Habitación para  </td>
                  <td>{data.numeroDeHuespedes} persona/s.</td>
                </tr>
                <tr style={{ backgroundColor:"#f5f5dc", color:"black"}}>
                  <td>Nombre del acompañante: </td>
                  <td>{data.acompañante1}</td>
                </tr>
                <tr style={{ backgroundColor:"#f5f5dc", color:"black"}}>
                  <td>DNI del acompañante: </td>
                  <td>{data.dniAcompañante1}</td>
                </tr>
              </table>
            }
             { nroReserva && <Label text="Ingrese el número de habitación"/>}
             { nroReserva && <input  style={{
                padding: "1%",
                marginBottom: "2%"}}
                onChange={(e) => (e.target.value)}
                placeholder='Número de habitación'
            />}
             { nroReserva && <button onClick={asignarHabitacion} style={{
                color:"#f5f5dc",
                backgroundColor: "grey",
                border: "2px solid  #50564f",
                marginTop: "5vh",
                marginLeft:"2%",
                fontWeight: "bolder",
                width:"10%",
                height: "8%",
                fontSize: "70%"
                }}
    >Asignar habitación</button>}
    <div>{nroHabitacion && <button onClick={realizarCheckout} style={{
                color:"#f5f5dc",
                backgroundColor: "grey",
                border: "2px solid  #50564f",
                marginTop: "5vh",
                marginLeft:"2%",
                fontWeight: "bolder",
                width:"10%",
                height: "8%",
                fontSize: "70%"
                }}
    >Realizar checkout</button>}</div>
    
        </div>}
        
      </div>
      
        
    )
};

export default Home;