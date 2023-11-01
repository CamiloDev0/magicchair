import { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
// import { CameraOptions, useFaceDetection } from 'react-use-face-detection';
// import FaceDetection from '@mediapipe/face_detection';
// import { Camera } from '@mediapipe/camera_utils';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';
import axios from 'axios';
import './App.css';

const width = 985;
const height = 1751;

function App() {
  const [screenACtive, setScreenActive] = useState(1);
  const [product, setProduct] = useState(0);
  const [hairstyle, setHairStyle] = useState('');
  const [countdown, setCountdown] = useState(3);
  const [image, setImage] = useState<string | null>('');
  const [imageKey, setImageKey] = useState('');

  // const result: FaceDetectionResult = useFaceDetection({
  //   faceDetectionOptions: {
  //     model: 'short',
  //   },
  //   faceDetection: new FaceDetection.FaceDetection({
  //     locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
  //   }),
  //   camera: ({ mediaSrc, onFrame }: CameraOptions) =>
  //     new Camera(mediaSrc, {
  //       onFrame,
  //       width,
  //       height,
  //     }),
  // });

  // const { webcamRef: untypedWebcamRef, boundingBox, isLoading } = result;

  const webcamRef = useRef<Webcam | null>(null);

  const hairstyles = {
    2000: [
      {
        key: '2000-hair-5',
        file: 'peluca5.png',
      },
      {
        key: '2000-hair-6',
        file: 'peluca6.png',
      },
      {
        key: '2000-hair-7',
        file: 'peluca7.png',
      },
      {
        key: '2000-hair-8',
        file: 'peluca8.png',
      },
    ],
    1990: [
      {
        key: '1990-hair-9',
        file: 'peluca9.png',
      },
      {
        key: '1990-hair-10',
        file: 'peluca10.png',
      },
      {
        key: '1990-hair-3',
        file: 'peluca3.png',
      },
    ],
    1980: [
      {
        key: '1980-hair-11',
        file: 'peluca11.png',
      },
      {
        key: '1980-hair-12',
        file: 'peluca12.png',
      },
      {
        key: '1980-hair-13',
        file: 'peluca13.png',
      },
      {
        key: '1980-hair-14',
        file: 'peluca14.png',
      },
    ],
    1970: [
      {
        key: '1970-hair-15',
        file: 'peluca15.png',
      },
      {
        key: '1970-hair-16',
        file: 'peluca16.png',
      },
      {
        key: '1970-hair-17',
        file: 'peluca17.png',
      },
    ],
  };

  const menu = {
    0:[
      {
        key: 'decade-2000',
        file: '2000.png',
        id: 2000,
      },
    ],
    1:[
      {
        key: 'decade-1990',
        file: '1990.png',
        id: 1990,
      },
    ],
    2:[
      {
        key: 'decade-1980',
        file: '1980.png',
        id: 1980,
      },
    ],
    3:[
      {
        key: 'decade-1970',
        file: '1970.png',
        id: 1970,
      },
    ]
  };

  const exportAsImage = async () => {
    const element = document.querySelector('.screen-five');
    if (element instanceof HTMLElement) {
      const canvas = await html2canvas(element, {
        allowTaint: true,
        useCORS: true,
        logging: true,
      });
      const canvasImage = canvas.toDataURL('image/png', 1.0);
      const headers = {
        'Content-Type': 'application/json',
      };
      const data = JSON.stringify({ image: canvasImage, id: imageKey, folder: 'mirror' });
      axios({ method: 'post', url: 'https://mocionws.info/', headers, data })
        .then(() => {
          setImage(canvasImage);
          setScreenActive(6)
          //setTimeout(() => setScreenActive(6), 5000);
        })
        .catch((error) => console.log(`REQUEST IMAGE SAVE ERROR ====> ${error}`));
    } else console.error('Element not found');
  };

  const processPicture = () => {
    const strUnique = Math.random().toString(36).substring(2, 7);
    setImageKey(strUnique);
    let imageSrc: string | undefined | null;
    if (webcamRef && 'current' in webcamRef) {
      imageSrc = webcamRef.current?.getScreenshot();
    }
    setImage(imageSrc!);
    setScreenActive(5);
  };

  const renderWebCam = () => (
    <div className="webcamContainer" style={{display: `${screenACtive > 1 && screenACtive < 5 ? 'block' : 'none'}`}}>
       <div style={{ width, height, position: 'relative' }}>
        {/*{boundingBox.map((box: any, index: any) => (
          <div
            key={`${index + 1}`}
            style={{
              border: '4px solid red',
              position: 'absolute',
              top: `${box.yCenter * 100}%`,
              left: `${box.xCenter * 100}%`,
              width: `${box.width * 100}%`,
              height: `${box.height * 100}%`,
              zIndex: 1,
            }}
          />
        ))} */}
        <Webcam
          ref={webcamRef}
          forceScreenshotSourceSize
          screenshotFormat="image/png"
          style={{
            height,
            width
          }}
        />
      </div>
    </div>
  );

  const renderScreen = () => {
    let html: any;
    switch (screenACtive) {
      case 2:
        html = (
          <div className={`screen screen-two ${screenACtive === 2 && 'active'}`}>
            <h1>elige la década</h1>
            <div className="left">
              {Object.entries(menu).map(([, value]) => (
                <div
                  className={`menu menu-white ${value[0].key}`}
                  onClick={() => setProduct(value[0].id)}
                  role="button"
                  aria-hidden="true"
                  key={value[0].key}
                />
              ))}
            </div>
            <div className="right">
              {product !== 0 && (
                <>
                  <div
                    className="menu menu-transparent btn-back"
                    onClick={() => setScreenActive(screenACtive - 1)}
                    role="button"
                    aria-hidden="true"
                  />
                  <div
                    className="menu menu-transparent btn-next"
                    onClick={() => setScreenActive(screenACtive + 1)}
                    role="button"
                    aria-hidden="true"
                  />
                </>
              )}
            </div>
          </div>
        );
        break;
      case 3:
        html = (
          <div className={`screen screen-two ${screenACtive === 3 && 'active'}`}>
            <h1>elige un peinado</h1>
            <div className="left">
              {hairstyles[product as keyof typeof hairstyles].map(
                (data: { key: string; file: string }) => (
                  <div
                    className={`menu menu-white ${data.key}`}
                    onClick={() => setHairStyle(data.key)}
                    style={{ backgroundImage: `url(/${data.file})` }}
                    role="button"
                    aria-hidden="true"
                    key={data.key}
                  />
                ),
              )}
            </div>
            <div className="right">
              {hairstyle && (
                <>
                  <div
                    className="menu menu-transparent btn-back"
                    onClick={() => setScreenActive(screenACtive - 1)}
                    role="button"
                    aria-hidden="true"
                  />
                  <div
                    className="menu menu-transparent btn-next"
                    onClick={() => setScreenActive(screenACtive + 1)}
                    role="button"
                    aria-hidden="true"
                  />
                </>
              )}
            </div>
          </div>
        );
        break;
      case 4:
        setTimeout(() => setCountdown(countdown - 1), 1000);
        html = (
          <div className={`screen screen-four ${screenACtive === 4 && 'active'}`}>
            {countdown > 0 && (
              <><h1>¡sonríe!</h1>
              <img
                className="countdown"
                src={`/${countdown}.png`}
                alt="final countdown"
              /></>
            )}
          </div>
        );
        break;
      case 6:
        html = (
          <div className={`screen screen-six ${screenACtive === 6 && 'active'}`} style={{ backgroundImage: `url('${image}')` }}>
            <div className="qr-container">
              <QRCode
                size={256}
                bgColor="rgba(255,255,255,0.7)"
                style={{ height: 'auto', maxWidth: '256px', width: '100%' }}
                value={`https://mocionws.info/download.html?url=https://mocionws.info/mirror/${imageKey}.png&name=Wella Beauty Festival - Sebastian Mirror`}
                viewBox="0 0 256 256"
              />
            </div>
            <div
              className="buttonFinish"
              role="button"
              aria-hidden="true"
              onClick={() => setScreenActive(1)}
            />
          </div>
        );
        break;
      default:
        html = (
          <div
            className={`screen screen-one ${screenACtive === 1 && 'active'}`}
            onClick={() => setScreenActive(2)}
            role="button"
            aria-hidden="true"
          />
        );
        break;
    }
    return html;
  };

  useEffect(() => {
    if (screenACtive === 4) {
      setTimeout(() => processPicture(), 5000);
    }
    if (screenACtive === 5) {
      setTimeout(() => exportAsImage(), 5000);
    }
  }, [screenACtive]);

  return (
    <div className="container">
      {/* Screens [ START ] */}
      {screenACtive !== 5 && renderScreen()}
      <div className={`screen screen-five ${screenACtive === 5 && 'active'}`}>
        <div className="image-container">
          <div className="image">
            {image && (
              <img
                src={image}
                alt="Wella Beauty Festival - Sebastian Mirror"
                style={{ width: '100%', height: '100%' }}
              />
            )}
          </div>
        </div>
      </div>
      {renderWebCam()}
      {/* Screens [ END ] */}
    </div>
  );
};
export default App;
