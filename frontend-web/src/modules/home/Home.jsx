import React, {useEffect, useState} from "react";
import Title from '../home/components/title/Title'
// import Input from '../login/components/input/Input'
import Background from '../../assets/img/homeImage.jpg'
import Label from './components/label/Label'
import Imagen from '../../assets/img/perrito.jpg'
import '../home/home.css'

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
      nombre:"Juan",
      apellido:"Perez",
      tipo:"DNI",
      documento:"12345678",
      email:"juanPerez@gmail.com",
      comienzo:"01/01/2021",
      fin:"02/01/2021",
      estado:"COMPLETO",
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
            <input  style={{
                width: "300px", 
                height: "40px", 
                marginRight: "5px",
                position: "absolute",
                left: "300px",
                top: "20px"
              }}
                onChange={(e) => (e.target.value)}
                placeholder='Ingrese un codigo de reserva'
            />
            <button onClick={buscar} style={{
                color:"dimgray",
                backgroundColor: "lightgray",
                border: "2px solid lightgray",
                fontWeight: "bolder",
                width:"150px",
                height: "45px",
                fontSize: "70%",
                position: "absolute",
                left: "615px",
                top: "20px"
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
            <input  style={{
                width: "300px", 
                height: "40px", 
                marginRight: "5px",
                position: "absolute",
                left: "300px",
                top: "20px"}}
                onChange={(e) => (e.target.value)}
                placeholder='Ingrese un codigo de reserva'
            />
            <button onClick={buscar} style={{
                color:"dimgray",
                backgroundColor: "lightgray",
                border: "2px solid lightgray",
                fontWeight: "bolder",
                width:"150px",
                height: "45px",
                fontSize: "70%",
                position: "absolute",
                left: "615px",
                top: "20px"
                }}
    >Buscar</button>
            <Title className="title-container"/>
            { nroReserva && 
                <table  style={{
                    backgroundColor:"white", 
                    marginLeft:"300px", 
                    marginRight:"300px",
                    textAlign:"left", 
                    padding:"30px 0", 
                    borderSpacing: "50px 0",
                    fontSize: "large"
                  }}>  
                    <tr>
                      <td rowSpan="9"><img src={Imagen} style={{height:"80%",width:"80%"}}/></td>                      
                      <td colSpan="2" className="table-title">Informacion personal</td>       
                    </tr>
                    <tr>
                      <td className="table-subtitle">Huesped</td>
                      <td className="table-subtitle">Documento</td>
                    </tr> 
                    <tr>
                      <td className="table-data">{data.nombre} {data.apellido}</td>
                      <td className="table-data">{data.tipo} {data.documento}</td>
                    </tr> 
                    <tr>
                      <td className="table-subtitle">Email</td>
                      <td></td>
                    </tr> 
                    <tr>
                      <td className="table-data">{data.email}</td>
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
                      <td className="table-data">{data.comienzo}</td>
                      <td className="table-data">{data.fin}</td>
                    </tr> 
                    <tr>
                      <td className="table-subtitle">Estado</td>
                      <td className="table-subtitle">Habitacion</td>
                    </tr>  
                    <tr>
                      <td><div>{nroHabitacion && <button onClick={realizarCheckout} style={{
                color:"dimgray",
                backgroundColor: "lightgray",
                border: "2px solid lightgray",
                fontWeight: "bolder",
                width:"325px",
                height: "30px",
                fontSize: "70%"
                }}
    >Realizar checkout</button>}</div></td> 
                      <td className="table-data">{data.estado}</td>
                      <td>{ nroReserva && <input  style={{
                        width:"50px",
                        height:"25px"
                      }}
                onChange={(e) => (e.target.value)}
            />}
             { nroReserva && <button onClick={asignarHabitacion} style={{
                color:"dimgray",
                backgroundColor: "lightgray",
                border: "2px solid lightgray",
                fontWeight: "bolder",
                width:"70px",
                height: "30px",
                fontSize: "70%",
                marginLeft: "5px"
                }}
    >Asignar</button>}</td>
                    </tr>   
                  
              </table>
            }      
        </div>}
        
      </div>
      
        
    )
};

export default Home;