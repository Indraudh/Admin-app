import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {  userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext , useState } from "react";
import { DarkModeContext } from "./context/darkModeContext";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const [ userdata , setuserdata] = useState("userdata");
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="users/details" element={<Single userdata = {userdata}/>} />
            <Route path="users">
              <Route index element={<List setuserdata={setuserdata}/>} />
            </Route>
            <Route
                path="register"
                element={<New inputs={userInputs} title="Add New User" />}
              />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
