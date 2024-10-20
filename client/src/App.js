import './App.css';
import Home from './components/Home';
import Navbar from "./components/Navbar"
import About from "./components/About"
import Alert from "./components/Alert"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useState } from 'react';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message,type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar/>
          <Alert alert={alert} />
          <div className="container">
          <Routes>
            <Route exact path="/iNoteBook" element={<Home showAlert={showAlert} />}></Route>
          {/* </Routes> */}
          {/* <Routes> */}
            <Route exact path="/about" element={<About />}></Route>
            <Route exact path="/login" element={<Login showAlert={showAlert} />}></Route>
            <Route exact path="/signup" element={<Signup showAlert={showAlert} />}></Route>
          </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
