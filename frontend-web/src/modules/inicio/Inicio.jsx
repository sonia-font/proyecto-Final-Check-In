import React from "react";
import Background from '../../assets/img/homeImage.jpg'
import { useHistory } from 'react-router-dom'

const Inicio = () => {
  const history = useHistory()

  const continueToLogin = () => {
    history.push("/login")
  }

  return (
    <div>
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
        <label style={{ marginTop: "40vh", padding: "2%", color: "black", fontWeight: "bolder", width: "10%", height: "8%", fontSize: "70%" }}>"¡Bienvenidos!"</label>
        <button onClick={continueToLogin} style={{
          color: "#f5f5dc",
          backgroundColor: "grey",
          border: "2px solid  #50564f",
          marginTop: "50vh",
          marginLeft: "2%",
          fontWeight: "bolder",
          width: "10%",
          height: "8%",
          fontSize: "70%"
        }}
        >Check-In</button>
      </div>

    </div>


  )
};

export default Inicio;