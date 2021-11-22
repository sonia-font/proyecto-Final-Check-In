import React from "react";
import Background from '../../assets/img/welcomeImage.jpg'
import { useHistory } from 'react-router-dom'
import Label from './components/label/Label'

const Inicio = () => {
  const history = useHistory()

  const continueToLogin = () => {
    history.push("/login")
  }

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      backgroundImage: `url(${Background})`,
      backgroundSize: "100% 100%",
      backgroundRepeat: "no-repeat",
      textAlign: "center",
      fontSize: "30px",
      color: "black",
    }}>
      <div style={{
        paddingTop: "450px"
      }}>
        <Label text="¡Bienvenido!" />
        <button onClick={continueToLogin} style={{
          color: "dimgray",
          backgroundColor: "lightgray",
          border: "2px solid lightgray",
          marginTop: "5vh",
          fontWeight: "bolder",
          width: "300px",
          height: "50px",
          fontSize: "70%"
        }}
        >Check In</button>
      </div>
    </div>
  )
};

export default Inicio;