import React, { useState} from "react";
import Title from './components/title/Title'
import Label from './components/label/Label'
// import Input from '../login/components/input/Input'
import Dropdown from './components/dropdown/Dropdown'
import '../login/login.scss'
import { useHistory } from 'react-router-dom'
import Background from '../../assets/img/loginImage.jpg'
import { showAlertNotification } from '../../shared/AlertNotification/AlertNotification'

const Login = () =>{
    const [userName, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    // const [userHotel,setUserHotel] = useState(null);
    const history = useHistory()

    const buttonLogin = () => {
    if (userName === "admin" && password === "admin1234"){
        history.push("/home")
        // callLogin(userName, password);
    } else{
        showAlertNotification('', "Usuario y/o contraseña incorrecta.", 'danger')
    }
  };

    return(
        <div style={{
            width: "100vw",
            height: "100vh",
            backgroundImage: `url(${Background})`,
            backgroundSize:"100% 100%",
            backgroundRepeat:"no-repeat",
            textAlign: "center",
            fontSize: "30px",
            // marginLeft:"18%",
            color: "black"}} > 
            <Title className="title-container" />
            <Label text="Usuario"/>
            <input  style={{
                padding: "1%",
                marginBottom: "2%",
                marginTop: "5%"
            }}
                onChange={(e) => setUserName(e.target.value)}
                placeholder='Ingrese su usuario'
            />
            <Label text="Contraseña"/>
            <div  style={{padding:"2%"}}>
            <input  style={{
                padding: "1%",
                marginBottom: "5vh",
                marginTop: "2%"}}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Ingrese su contraseña'
                type="password"
            />
            </div>
            
            {/* <Label text="Seleccione su hotel"/> */}
            {/* <Dropdown /> */}
            <button onClick={buttonLogin} style={{
                color:"#f5f5dc",
                backgroundColor: "grey",
                border: "2px solid  #50564f",
                marginTop: "5vh",
                fontWeight: "bolder",
                width:"10%",
                height: "8%",
                fontSize: "70%"
                }}
    >Ingresar</button>
        </div>
    )
};

export default Login;