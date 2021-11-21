import { useHistory } from 'react-router-dom'
import Background from '../../assets/img/welcomeImage.jpg'
import Title from './components/title/Title'
import Label from './components/label/Label'

const Welcome = () =>{
    const history = useHistory()

    const buttonWelcome = () => {
        history.push("/login")
    }

    return(
        <div style={{
            width: "100vw",
            height: "100vh",
            backgroundImage: `url(${Background})`,
            backgroundSize:"100% 100%",
            backgroundRepeat:"no-repeat",
            textAlign: "center",
            fontSize: "30px",
            color: "black"}} >             
            <div style={{
                paddingTop: "450px"
            }}>
                <Label text="¡Bienvenido!"/>
                <button onClick={buttonWelcome} style={{
                    color:"dimgray",
                    backgroundColor: "lightgray",
                    border: "2px solid lightgray",
                    marginTop: "5vh",
                    fontWeight: "bolder",
                    width:"300px",
                    height: "50px",
                    fontSize: "70%"
                    }}
                >Check In</button>
            </div>
        </div>
    )
};

export default Welcome;