import { useEffect, useState } from "react";
import Device from "./components/device";
import Voice from "./components/voice";
import { init, createModel,getDHTData } from "./utils/api";

function App() {
  const [recognizer, setRecognizer] = useState(null);
  const [sensorData, setSensorData] = useState(null);
  

  useEffect(() => {
    createModel().then((utility) => {
      setRecognizer(utility);
    });

    const sensorPolling = setInterval( async ()=>{
      const dhtData = (await getDHTData()).data.split('-');
      setSensorData({temperature:dhtData[0], humidity:dhtData[1]});
      console.log(dhtData);
    },2000);
  }, []);



  if (recognizer && sensorData) {
    return (
      <div className="flex min-h-screen flex-col justify-between border border-black">
        <div>
          <div className="flex items-center justify-between  border border-black px-8   py-2">
            <h1 className="text-3xl font-semibold">Assistant</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-8 w-8"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div className=" py-8 px-8 font-sans">
            <h1 className="text-2xl font-medium ">Sensors</h1>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-lg  border border-black p-2">
                <h1 className="text-xl">Temperature</h1>
                <h1 className="mt-2 text-4xl font-bold">{sensorData.temperature}'C</h1>
              </div>
              <div className="rounded-lg border border-black p-2">
                <h1 className="text-xl">Humidity</h1>
                <h1 className="mt-2 text-4xl font-bold">{sensorData.humidity}%</h1>
              </div>
            </div>
          </div>

          <div className=" py-8 px-8 font-sans">
            <h1 className="text-2xl font-medium ">Devices</h1>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Device name={"Main Light"} id="main-light"/>
              <Device name={"Night Light"} id="night-light"/>
              {/* <Device name={"Fan"} /> */}
            </div>
          </div>
        </div>

        <div className="mx-8 mb-2 flex justify-center rounded-xl border border-black py-2">
          <Voice recognizer={recognizer}/>
        </div>
      </div>
    );
  }
}

export default App;
