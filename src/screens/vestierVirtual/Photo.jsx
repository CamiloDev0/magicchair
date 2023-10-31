import { useEffect, useRef, useState } from "react"
import sombra from "/wella/images/sombra.png"
import portada from "/wella/images/portada.png"
import bcomenzar from "/wella/images/botcomenzar.png"
import boton2 from "/wella/images/boton2.png"
import peluca1 from "/wella/images/peluca1.png"
import peluca2 from "/wella/images/peluca2.png"
import peluca3 from "/wella/images/peluca3.png"
import peluca4 from "/wella/images/peluca4.png"
import plantilla from "/Wella/images/plantilla.png"
import finalframe from "/wella/images/finalframe.png"
import { Element } from 'react-scroll';


let interval = null
let timeout = null
let contador = 0
const defValue = { nombre: "", email: "", telefono: "" }
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

export default function usePhoto() {
  const webcamRef = useRef(null);
  // CMS states
  const [show, setShow] = useState(false)
  const [devices, setDevices] = useState(false)
  const [producto, setProducto] = useState(0)
  const [pelo, setPelo] = useState(0)

  const [tab, setTab] = useState(0)
  const [data, setData] = useState(defValue)
  const [counter, setCounter] = useState(false)
  const [loading, setLoading] = useState(false)

  const close = () => setShow(false)
  const next = () => setTab(o => (o + 1))
  const onChange = (e) => setData(o => ({ ...o, [e.target.name]: e.target.value }))
  const src = counter === 3 ? '/wella/images/3.png' : counter === 2 ? '/wella/images/2.png' : counter === 1 ? '/wella/images/1.png': ''
  const [resultado, setImagenResultado] = useState(null);
  const imgfinal=new Image();
  const capturedImage = new Image();

  function sendPhoto(imageBase64) {
    setLoading(true)
    const canvas = document.createElement('canvas');
    const context = canvas.getContext("2d");
    canvas.width = 1080;
    canvas.height = 1920;

    const loadImage = (src, callback, x = 0, y = 0,w=0,h=0) => {
      const img = new Image()
      img.src = src
      img.onload = () => {
        context.drawImage(img, x, y,w,h)
        callback()
      } 
    }



    const efectofoto = () => {
      const imageDataUrl = canvas.toDataURL()
      const containerDiv = document.querySelector(".fullcontainer");
      //const capturedImage = new Image();
      capturedImage.src = imageDataUrl;
      capturedImage.id = "capturedImage";
      setImagenResultado(capturedImage.src);
      containerDiv.appendChild(capturedImage);
      setTimeout(() => {
        containerDiv.removeChild(capturedImage);
        next();
      }, 2000);
    }

    const img = new Image()
    img.src = imageBase64
    img.onload = () => {
      let w = img.width;
      let h = img.height;
      let a = h * 56.25 / 100
      let b = (w - a) / 2
      context.drawImage(img, b, 0, a, h, 0, 0, 1080, 1920)
      const r = Math.floor(Math.random() * 6) + 1;
      if (pelo==0) {
        loadImage(sombra,efectofoto)
      } else  {
        /////////////////Fotos de los 00's /////////////////////// POSICION Y ESCALA /// X // Y // W // H
        if (pelo==5){loadImage(sombra, () => loadImage(`/Wella/images/peluca${pelo}.png`, efectofoto, 350, 370,420,320))};
        if (pelo==6){loadImage(sombra, () => loadImage(`/Wella/images/peluca${pelo}.png`, efectofoto, 380, 280,340,280))};
        if (pelo==7){loadImage(sombra, () => loadImage(`/Wella/images/peluca${pelo}.png`, efectofoto, 260, 220,520,680))};
        if (pelo==8){loadImage(sombra, () => loadImage(`/Wella/images/peluca${pelo}.png`, efectofoto, 400, 320,280,280))};
       /////////////////Fotos de los 90's /////////////////////// POSICION Y ESCALA 
       if (pelo==9){loadImage(sombra, () => loadImage(`/Wella/images/peluca${pelo}.png`, efectofoto, 340, 360,340,340))};
       if (pelo==10){loadImage(sombra, () => loadImage(`/Wella/images/peluca${pelo}.png`, efectofoto, 430, 360,240,240))};
       if (pelo==3){loadImage(sombra, () => loadImage(`/Wella/images/peluca${pelo}.png`, efectofoto, 320, 310,420,480))};
       /////////////////Fotos de los 80's /////////////////////// POSICION Y ESCALA 
       if (pelo==11){loadImage(sombra, () => loadImage(`/Wella/images/peluca${pelo}.png`, efectofoto, 250, 330,600,500))};
       if (pelo==12){loadImage(sombra, () => loadImage(`/Wella/images/peluca${pelo}.png`, efectofoto, 320, 310,340,460))};
       if (pelo==13){loadImage(sombra, () => loadImage(`/Wella/images/peluca${pelo}.png`, efectofoto, 390, 310,320,340))};
       if (pelo==14){loadImage(sombra, () => loadImage(`/Wella/images/peluca${pelo}.png`, efectofoto, 400, 330,280,300))};
         /////////////////Fotos de los 70's /////////////////////// POSICION Y ESCALA 
         if (pelo==15){loadImage(sombra, () => loadImage(`/Wella/images/peluca${pelo}.png`, efectofoto, 410, 330,260,240))};
         if (pelo==16){loadImage(sombra, () => loadImage(`/Wella/images/peluca${pelo}.png`, efectofoto, 320, 380,460,480))};
         if (pelo==17){loadImage(sombra, () => loadImage(`/Wella/images/peluca${pelo}.png`, efectofoto, 280, 330,500,520))};
      };
    }
  }

  function pelucas(){
      if (producto==1){
        return (
          <div className="vertical izquierda" >
          <Element name="image1" className="smooth-scroll-image">
            <img src="/wella/images/peluca5.png" alt="Imagen 1" onClick={() =>setPelo(5)} />
          </Element>
          <Element name="image2" className="smooth-scroll-image">
            <img src="/wella/images/peluca6.png" alt="Imagen 2" onClick={() =>setPelo(6)}  />
          </Element>
          <Element name="image3" className="smooth-scroll-image">
            <img src="/wella/images/peluca7.png" alt="Imagen 3" onClick={() =>setPelo(7)}/>
          </Element>
          <Element name="image4" className="smooth-scroll-image">
            <img src="/wella/images/peluca8.png" alt="Imagen 4" onClick={() =>setPelo(8)} />
          </Element>
        </div>
        );
      }

      if (producto==2){
        return (
          <div className="vertical izquierda" >
          <Element name="image1" className="smooth-scroll-image">
            <img src="/wella/images/peluca9.png" alt="Imagen 1" onClick={() =>setPelo(9)}  />
          </Element>
          <Element name="image2" className="smooth-scroll-image">
            <img src="/wella/images/peluca10.png" alt="Imagen 2" onClick={() =>setPelo(10)}  />
          </Element>
          <Element name="image3" className="smooth-scroll-image">
            <img src="/wella/images/peluca3.png" alt="Imagen 2" onClick={() =>setPelo(3)}  />
          </Element>
        </div>
        );
      }

      if (producto==3){
        return (
          <div className="vertical izquierda" >
          <Element name="image1" className="smooth-scroll-image">
            <img src="/wella/images/peluca11.png" alt="Imagen 1" onClick={() =>setPelo(11)}  />
          </Element>
          <Element name="image2" className="smooth-scroll-image">
            <img src="/wella/images/peluca12.png" alt="Imagen 2" onClick={() =>setPelo(12)}   />
          </Element>
          <Element name="image3" className="smooth-scroll-image">
            <img src="/wella/images/peluca13.png" alt="Imagen 3" onClick={() =>setPelo(13)} />
          </Element>
          <Element name="image4" className="smooth-scroll-image">
            <img src="/wella/images/peluca14.png" alt="Imagen 4" onClick={() =>setPelo(14)}  />
          </Element>
        </div>
        );
      }
      if (producto==4){
        return (
          <div className="vertical izquierda" >
          <Element name="image1" className="smooth-scroll-image">
            <img src="/wella/images/peluca15.png" alt="Imagen 1" onClick={() =>setPelo(15)}  />
          </Element>
          <Element name="image2" className="smooth-scroll-image">
            <img src="/wella/images/peluca16.png" alt="Imagen 2" onClick={() =>setPelo(16)}   />
          </Element>
          <Element name="image3" className="smooth-scroll-image">
            <img src="/wella/images/peluca17.png" alt="Imagen 3" onClick={() =>setPelo(17)} />
          </Element>
        </div>
        );
      }
  }

 const comenzar=() => {
  next();
 };
  const showCMS = () => {
    timeout && clearTimeout(timeout)
    contador++
    timeout = setTimeout(() => (contador = 0), 1000);
    contador >= 6 && setShow(true)
  }

  const capture = () => {
    interval && clearInterval(interval)
    interval = setInterval(() => setCounter(o => o ? o - 1 : 3), 1000);
    next();
  };

  const empezar = () => {
    next()
  }
  const handleDevices = mediaDevices => setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput"))

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  useEffect(() => {
    if (!loading && counter === 0 ) {
      setCounter(false)
      setData(defValue)
    }
  }, [loading])

  useEffect(() => {
    if (counter !== false && counter < 1) {
      interval && clearInterval(interval)
      const imageSrc = webcamRef.current.getScreenshot();
      sendPhoto(imageSrc)
    }
  }, [counter])

  const terminar=() => {
    setTab(0);
   };

   const retroceder=() => {
    setTab(1);
   };
  return {
    src, devices, webcamRef, resultado,loading, show, tab, img, data,imgfinal,
    setProducto, onChange,setPelo,retroceder ,pelucas,terminar,empezar,comenzar ,capture, showCMS,terminar ,close
  }
}


const img = {

  empezar: "https://firebasestorage.googleapis.com/v0/b/multirepos.appspot.com/o/cerave%2Fempezar.png?alt=media&token=36a87251-1177-4425-adb2-f5a4e9412cc9",
  instrucciones: "https://firebasestorage.googleapis.com/v0/b/multirepos.appspot.com/o/cerave%2Finstruccion.png?alt=media&token=e200f4ed-858e-45eb-b93a-e4440d708a22",
  sombra,plantilla ,portada,bcomenzar,boton2,peluca1,peluca2,peluca3,peluca4,finalframe,
}


