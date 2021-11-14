import React, {useEffect, useState} from "react";
import Title from './components/title/Title'
import Label from './components/label/Label'
// import Input from '../login/components/input/Input'
import Dropdown from './components/dropdown/Dropdown'
import '../login/login.scss'
import { useHistory } from 'react-router-dom'
import Background from '../../assets/img/11.jpg'
const Login = () =>{
    const [userName, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    // const [userHotel,setUserHotel] = useState(null);
    const [passwordError, setPasswordError] = useState(false);
    const history = useHistory()

    const buttonLogin = () => {
        debugger
    if (userName =="admin" && password=="admin1234"){
        history.push("/home")
        // callLogin(userName, password);
    } else{
        console.log("Error de login")
        setPasswordError(true);
    }
  };

    return(
        <div style={{
            width: "auto",
            height: "80%",
            backgroundImage: `url(${Background})`,
            backgroundSize: "100%",
            textAlign: "center",
            fontSize: "30px",
            color: "black"}} > 
            <Title className="title-container" />
            <Label text="Usuario"/>
            <input  style={{
                padding: "10px",
                marginBottom: "2%",
                marginTop: "2%"}}
                onChange={(e) => setUserName(e.target.value)}
                placeholder='Ingrese su usuario'
            />
            <Label text="Contraseña"/>
            <input  style={{
                padding: "10px",
                marginBottom: "2%",
                marginTop: "2%"}}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Ingrese su contraseña'
                type="password"
            />
            <Label text="Seleccione su hotel"/>
            <Dropdown />
            <button onClick={buttonLogin} style={{
                color:"#f5f5dc",
                padding: "10px",
                backgroundColor: "transparent",
                border: "2px solid  #50564f",
                marginBottom: "2%",
                marginTop: "2%",
                fontWeight: "bolder",
                width:"200px",
                height: "50px",
                fontSize: "25px"
                }}
    >Ingresar</button>
        </div>
    )
};

export default Login;