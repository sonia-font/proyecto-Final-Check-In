import React, {useEffect, useState} from "react";
import Title from '../login/components/title/Title'
import Label from '../login/components/label/Label'
// import Input from '../login/components/input/Input'
import Dropdown from '../login/components/dropdown/Dropdown'
import '../login/login.css'

const Login = () =>{
    const [userName, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    // const [userHotel,setUserHotel] = useState(null);
    const [passwordError, setPasswordError] = useState(false);
    
    const buttonLogin = () => {
        debugger
    if (userName && password){
        console.log("Username", userName)
        console.log("password", password)

        // callLogin(userName, password);
    } else{
        console.log("NADA")
        setPasswordError(true);
    }
  };

    return(
        <div className='login-container'> 
            <Title className="title-container" />
            <Label text="Usuario"/>
            <input  style={{
                padding: "10px",
                marginBottom: "15px",
                marginTop: "15px"}}
                onChange={(e) => setUserName(e.target.value)}
                placeholder='Ingrese su usuario'
            />
            <Label text="Contraseña"/>
            <input  style={{
                padding: "10px",
                marginBottom: "15px",
                marginTop: "15px"}}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Ingrese su contraseña'
            />
            <Label text="Seleccione su hotel"/>
            <Dropdown />
            <button onClick={buttonLogin} style={{
                color:"#f5f5dc",
                padding: "10px",
                backgroundColor: "transparent",
                border: "2px solid  #50564f",
                marginBottom: "40px",
                marginTop: "40px",
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