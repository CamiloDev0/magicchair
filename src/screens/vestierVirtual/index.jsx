import "./index.css"
import Webcam from "react-webcam";
import { useState } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdOutlineUploadFile } from "react-icons/md";
import usePhoto from "./Photo";
import { Link, NavLink } from 'react-router-dom';
import { useRef } from "react";
import { Element } from 'react-scroll';



export default function index() {

  const [deviceId, setDeviceId] = useState({ facingMode: "user", })
  const {
    webcamRef, canvasRef,device, loading, imgfinal, resultado,show, tab, src, img, data,
    setProducto, pelucas,onChange ,empezar,terminar,setPelo ,retroceder,comenzar,capture, showCMS, close
  } = usePhoto()
  
  return (
    <div className="fullcontainer">
    <div>
    <img style={{ position: "absolute" , transform: 'translate(300px, 800px)'}} src={'/wella/images/loading.png'} alt="" />
    </div>
      {tab === 0 ? <>
      <img style={{ position: "absolute" }} src={img.portada} alt="" />
      <img src={img.bcomenzar} alt=""
      style={{width:389,height:91, transform: 'translate(340px, 1428px)', }}
      onClick={comenzar}
      />
      </> : null}
      <div>
      </div>
     {tab === 1 ? <>
      <Webcam
      ref={webcamRef}
      audio={false}
      mirrored={true}
      //style={{ transform: 'scaleX(-1)' }}
      screenshotFormat="image/png"
      videoConstraints={deviceId}
      />
        <div className="titulo1">
          <h1>ELIGE LA DÉCADA</h1>
        </div>
        <div className="vertical izquierda" >
        <Element name="image1" className="smooth-scroll-image">
          <img src="/wella/images/00's.png" alt="Imagen 1" onClick={() => setProducto(1) }/>
        </Element>
        <Element name="image2" className="smooth-scroll-image">
          <img src="/wella/images/90's.png" alt="Imagen 2" onClick={() =>setProducto(2)}  />
        </Element>
        <Element name="image3" className="smooth-scroll-image">
          <img src="/wella/images/80's.png" alt="Imagen 3"  onClick={() =>setProducto(3)}/>
        </Element>
        <Element name="image4" className="smooth-scroll-image">
          <img src="/wella/images/70's.png" alt="Imagen 4" onClick={() =>setProducto(4)}/>
        </Element>
        </div>
        <div className="vertical derecha">
          <img className="button2" src={'/wella/images/regreso.png'} alt="" onClick={() => { terminar()} }/>
          <img className="button2" src={img.boton2} alt="" onClick={() => { comenzar()} }/>
        </div>
      </> : null}

      {tab === 2 ? <>
        <Webcam
      ref={webcamRef}
      audio={false}
      mirrored={true}
      //style={{ transform: 'scaleX(-1)' }}
      screenshotFormat="image/png"
      videoConstraints={deviceId}
      />
        <div className="silueta">
        <img style={{ position: "absolute" }} src={img.plantilla} alt="" />
        </div>
        <div className="titulo1">
          <h1>ELIGE UN PEINADO</h1>
        </div>
          {pelucas()}
        <div className="vertical derecha">
          <img className="button2" src={'/wella/images/regreso.png'} alt="" onClick={() => { retroceder()} }/>
          <img className="button2" src={img.boton2} alt="" onClick={() => { capture()} }/>
        </div>
      </> : null}

      {/* Conteo regresivo */}
      {tab === 3 ? <>
      <Webcam
      ref={webcamRef}
      audio={false}
      mirrored={true}
      screenshotFormat="image/png"
      videoConstraints={deviceId}
      />
      <div className="silueta">
        <img style={{ position: "absolute" }} src={img.plantilla} alt="" />
      </div>
      <div className="titulo1">
          <h1>¡SONRÍE!</h1>
        </div>
      <img className="button3" src={src} alt="" />
        {/* CMS y pantalla de carga */}
        {show ? <CMS {...{ devices, setDeviceId, close }} /> : null}
        {loading ? <div className="loading full vertical center">
        <MdOutlineUploadFile size="30%" />
        <h2>Cargando...</h2>
      </div> : null}
      </> : null}
      {tab === 4 ? <>
        <img style={{ position: "absolute" }} src={resultado} alt="" />
        <img style={{ position: "absolute",transform: 'translate(0px, 758px)' }} src={'wella/images/qrfondo.png'} alt="" />
      <img src={'/Wella/images/botonfinal.png'} alt="" onClick={() =>terminar()}
      style={{width:389,height:91, transform: 'translate(360px, 1240px)' }}
      />
      </> : null}
    </div>
  )
}

const CMS = ({ devices, setDeviceId, close }) => {
  return (
    <div className="cms vertical" style={{ gap: 10 }}>
      <AiOutlineCloseCircle onClick={close} style={{ cursor: "pointer" }} size="6vw" />
      <h2>Camaras</h2>
      {devices.map((i, k) =>
        <button key={k} onClick={() => setDeviceId({ deviceId: i.deviceId })}>
          {i.label}
        </button>)
      }
    </div>
  )
}
