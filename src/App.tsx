import "./App.css";
import Login from "./page/Login";
import "./firebase";
import { Route, Routes } from "react-router-dom";
import Register from "./page/Register";
import Auth from "./component/auth";
import ProjectPage from "./page/ProjectPage";
import { Home } from "./page/Home";
import GlobalContextProvider from "./context";
import { ModalBox } from "./component/Modalbox";

function App() {
  return (
    <div className="App">
      <GlobalContextProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <Auth>
                <Login />
              </Auth>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/modal" element={<ModalBox />} />
        </Routes>
      </GlobalContextProvider>
    </div>
  );
}
export default App;
