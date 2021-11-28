import React, { useState, useEffect } from "react";
import Title from './components/title/Title'
import Label from './components/label/Label'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { callLogin, getHotels } from '../../shared/Services/RequestService'
import '../login/login.scss'
import { useHistory } from 'react-router-dom'
import Background from '../../assets/img/loginImage.jpg'
import { showAlertNotification } from '../../shared/AlertNotification/AlertNotification'

const Login = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [hotels, setHotels] = useState([]);
    const [idHotel, setIdHotel] = useState("");
    const history = useHistory()

    const buttonLogin = async () => {
        let response;
        
        try{
            if(idHotel === ""){
                showAlertNotification('', "Debe seleccionar un hotel.", 'danger')
            } else if(email !== "" && password !== ""){
                response = await callLogin(email, password, idHotel);
                if (response) {
                    history.push("/home")
                }
            } else {
                showAlertNotification('', "Email y/o contraseña incorrecta.", 'danger')
            }
        } catch (er) {
            response = false
        }
    };

    const searchHotels = async () => {
        try{
            const responseHotels = await getHotels();
            const hotels = responseHotels.map(function (hotel) {
                return { value: hotel.id, label: hotel.nombre }
            })
            setHotels(hotels)
        }catch(er){
            showAlertNotification('', "No hay hoteles para mostrar", 'danger')
        }        
    }

    useEffect(() => {
        searchHotels();
    }, [])

    useEffect(() => {
        localStorage.setItem("idHotel", idHotel);
    }, [idHotel])


    return (
        <div style={{
            width: "100vw",
            height: "100vh",
            backgroundImage: `url(${Background})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            textAlign: "center",
            fontSize: "30px",
            color: "black"
        }} >
            <Dropdown options={hotels} placeholder="Seleccione un hotel" onChange={(e) => setIdHotel(e.value)} />
            <Title className="title-container" />
            <Label text="Email" />
            <input style={{
                padding: "1%",
                marginBottom: "2%",
                marginTop: "2%",
                width: "200px"
            }}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Ingrese su email'
            />
            <Label text="Contraseña" />
            <div>
                <input style={{
                    padding: "1%",
                    marginBottom: "5vh",
                    marginTop: "2%",
                    width: "200px"
                }}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Ingrese su contraseña'
                    type="password"
                />
            </div>

            <button onClick={buttonLogin} style={{
                color: "dimgray",
                backgroundColor: "lightgray",
                border: "2px solid lightgray",
                marginTop: "5vh",
                fontWeight: "bolder",
                width: "300px",
                height: "50px",
                fontSize: "70%"
            }}
            >Ingresar</button>
        </div>
    )
};

export default Login;