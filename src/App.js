import React, { useState } from "react";
import { createWorker, setLogging} from "tesseract.js";
import "./App.css";
import { jsPDF } from "jspdf";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [file, setFile] = useState(null);
  const [ocr, setOcr] = useState("");
  const [lang, setLang] = useState("eng");

  const [progress, setProgress] = useState("0");
  const notify = () => toast.dark("Copied to Clipboard!");
  const notify1 = () => toast.dark("File Downloaded");
  const notify2 = () => toast.dark("Converting!");
  const worker = createWorker({
    logger: (m) => setProgress(m.progress * 100),
  });
  const doOCR = async () => {
    await worker.load();
    await worker.loadLanguage(lang);
    await worker.initialize(lang);
    const {
      data: { text },
    } = await worker.recognize(file);
    setOcr(text);   
  };
  const handleOnClick = (e) => {
    e.preventDefault();
    notify2();
    doOCR();
  };
  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text(ocr, 20, 20);
    doc.save("OCR-APP_Result.pdf");
    notify1();
  };
  setLogging(true);

  return (
        <div className="container">
      <div className="heading center-align">     
          <h1>OCR APP</h1>         
           
      </div>
      <div className="row">
        <div className="col s6">
          <div className="box">
            <form action="/">
              <div className="inputDiv center-align">
                <label style={{fontSize : "15px"}}> Select Your File! <span> </span>
                   <input
                className="fileupload"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => setFile(e.target.files[0])}
              />
                </label>
               
              </div>
              
              <div className="imgDiv">
                <img className="reviewImg" src={file? URL.createObjectURL(file) : null} alt={file? file.name : null} />
              </div>
              <a
                href=""
                className="button btn-floating btn-large waves-effect waves-light red"
                onClick={handleOnClick}
              >
                <i className="material-icons">done</i>
              </a>
              <div className="progress">
                <div
                  className="determinate"
                  style={{ width: progress + "%" }}
                ></div>
              </div>

              <div className="checkBoxes ">
                <div className="radio center-align">
                  <div className="row">
                    <div className="col s4">
                      <label>
                        <input
                          className="with-gap"
                          name="group1"
                          type="radio"
                          value="hin"
                          onChange={(e) => setLang(e.target.value)}
                        />

                        <span>Hindi</span>
                      </label>
                    </div>
                    <div className="col s4">
                      <label>
                        <input
                          className="with-gap"
                          name="group1"
                          type="radio"
                          value="eng"
                          defaultChecked
                          onChange={(e) => setLang(e.target.value)}
                        />

                        <span>English</span>
                      </label>
                    </div>
                    <div className="col s4">
                      <label>
                        <input
                          className="with-gap"
                          name="group1"
                          type="radio"
                          value="mar"
                          onChange={(e) => setLang(e.target.value)}
                        />
                        <span>Marathi</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col s6">
          <div className="box">
            <div className="output " id="style-1">              
              {ocr}
            </div>
            {/* <div className="darkMode">
            <DarkModeToggle
              onChange={setIsDarkMode}
              checked={isDarkMode}
              size={60}
            />
          </div> */}

            <a
              href=""
              className="download btn-floating btn-medim waves-effect waves-light red "
              onClick={handleDownload}
            >
              <i className="material-icons">
                file_download
              </i>
            </a>
            <a
              href=""
              className="ctc btn-floating btn-medim waves-effect waves-light red "
              onClick={(navigator.clipboard.writeText(ocr), notify)}
            >
              <i className="material-icons">content_copy</i>
            </a>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
