import React, { useState} from "react";
import Title from './components/title/Title'
import Label from './components/label/Label'
// import Input from '../login/components/input/Input'
//import Dropdown from './components/dropdown/Dropdown'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import '../login/login.scss'
import { useHistory } from 'react-router-dom'
import Background from '../../assets/img/loginImage.jpg'
import { showAlertNotification } from '../../shared/AlertNotification/AlertNotification'

const Login = () =>{
    const [userName, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const _onSelect = value => () => {
        setSelectedOption(value);
        setIsOpen(false);
    };

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

    const options = ["Hilton", "Sheraton"];

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
            <Dropdown options={options} onChange={_onSelect} placeholder="Seleccione un hotel" />                         
            <Title className="title-container" />
            <Label text="Usuario"/>
            <input  style={{
                padding: "1%",
                marginBottom: "2%",
                marginTop: "2%",
                width: "200px"
            }}
                onChange={(e) => setUserName(e.target.value)}
                placeholder='Ingrese su usuario'
            />
            <Label text="Contraseña"/>
            <div>
            <input  style={{
                padding: "1%",
                marginBottom: "5vh",
                marginTop: "2%",
                width: "200px"}}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Ingrese su contraseña'
                type="password"
            />
            </div>
            
            {/* <Label text="Seleccione su hotel"/> */}
            {/* <Dropdown /> */}
            <button onClick={buttonLogin} style={{
                color:"dimgray",
                backgroundColor: "lightgray",
                border: "2px solid lightgray",
                marginTop: "5vh",
                fontWeight: "bolder",
                width:"300px",
                height: "50px",
                fontSize: "70%"
                }}
    >Ingresar</button>
        </div>
    )
};

export default Login;