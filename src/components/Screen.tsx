import "./screen.css"
import Webcam from "react-webcam";
import { useState } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdOutlineUploadFile } from "react-icons/md";
import usePhoto from "./Photo";
import { Element } from 'react-scroll';



export default function Screen() {
    const devices:any = []
    const [deviceId, setDeviceId] = useState({ facingMode: "user", })
    const {
        webcamRef, loading, resultado,show, tab, src, img,
        setProducto, pelucas, terminar, retroceder,comenzar,capture, close
    } = usePhoto()
  
  return (
    <div className="fullcontainer">
        <div>
            <img style={{ position: "absolute" , transform: 'translate(300px, 800px)'}} src={'/loading.png'} alt="" />
        </div>
        {tab === 0 ? <>
            <img style={{ position: "absolute" }} src={img.portada} alt="" />
            <img src={img.bcomenzar} style={{width:389,height:91, transform: 'translate(340px, 1428px)', }} onClick={comenzar}/>
        </> : null}
        <div></div>
        {tab === 1 ? <>
            <Webcam ref={webcamRef} audio={false} mirrored={true} screenshotFormat="image/png" videoConstraints={deviceId}/>
            <div className="titulo1">
            <h1>ELIGE LA DÉCADA</h1>
            </div>
            <div className="vertical izquierda" >
                <Element name="image1" className="smooth-scroll-image">
                    <img src="/00's.png" alt="Imagen 1" onClick={() => setProducto(1) }/>
                </Element>
                <Element name="image2" className="smooth-scroll-image">
                    <img src="/90's.png" alt="Imagen 2" onClick={() =>setProducto(2)}  />
                </Element>
                <Element name="image3" className="smooth-scroll-image">
                    <img src="/80's.png" alt="Imagen 3"  onClick={() =>setProducto(3)}/>
                </Element>
                <Element name="image4" className="smooth-scroll-image">
                    <img src="/70's.png" alt="Imagen 4" onClick={() =>setProducto(4)}/>
                </Element>
            </div>
            <div className="vertical derecha">
            <img className="button2" src={'/regreso.png'} alt="" onClick={() => { terminar()} }/>
            <img className="button2" src={img.boton2} alt="" onClick={() => { comenzar()} }/>
            </div>
        </> : null}

        {tab === 2 ? <>
            <Webcam ref={webcamRef} audio={false} mirrored={true} screenshotFormat="image/png" videoConstraints={deviceId}/>
            <div className="silueta">
                <img style={{ position: "absolute" }} src={img.plantilla} />
            </div>
            <div className="titulo1">
                <h1>ELIGE UN PEINADO</h1>
            </div>
            {pelucas()}
            <div className="vertical derecha">
                <img className="button2" src={'/regreso.png'} alt="" onClick={() => { retroceder()} }/>
                <img className="button2" src={img.boton2} alt="" onClick={() => { capture()} }/>
            </div>
        </> : null}

        {/* Conteo regresivo */}
        {tab === 3 ? <>
            <Webcam ref={webcamRef} audio={false} mirrored={true} screenshotFormat="image/png" videoConstraints={deviceId}/>
            <div className="silueta">
                <img style={{ position: "absolute" }} src={img.plantilla} alt="" />
            </div>
            <div className="titulo1">
                <h1>¡SONRÍE!</h1>
            </div>
            <img className="button3" src={src} />
            {/* CMS y pantalla de carga */}
            {show ? CMS( {...{ devices, setDeviceId, close }} ) : null}
            {loading ? <div className="loading full vertical center">
                <MdOutlineUploadFile size="30%" />
                <h2>Cargando...</h2>
            </div> : null}
        </> : null}
      
        {tab === 4 ? <>
            <img style={{ position: "absolute" }} src={resultado || ''} />
            <img style={{ position: "absolute",transform: 'translate(0px, 758px)' }} src={'wella/images/qrfondo.png'} />
            <img src={'/botonfinal.png'} alt="" onClick={() =>terminar()} style={{width:389,height:91, transform: 'translate(360px, 1240px)' }}/>
        </> : null}
    </div>
  )
}

const CMS = ({ devices, setDeviceId, close }:any) => {
    return (
    <div className="cms vertical" style={{ gap: 10 }}>
        <AiOutlineCloseCircle onClick={close} style={{ cursor: "pointer" }} size="6vw" />
        <h2>Camaras</h2>
        {devices.map((i:any, k:any) =>
        <button key={k} onClick={() => setDeviceId({ deviceId: i.deviceId })}>
            {i.label}
        </button>)
        }
    </div>
    )
}