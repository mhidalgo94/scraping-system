import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage'
import PrivateRoute from './pages/private/PrivateRoute'
import PanelHome from './pages/panel/PanelHome'
import PanelUser from "./pages/panel/PanelUser";
import PanelSearch from './pages/panel/PanelSearch'
import PanelSearchLog from './pages/panel/PanelSearchLog'
import PanelRegister from './pages/panel/PanelRegister'
import Loginpage from './pages/login/LoginPage'
import SignUp from './pages/login/SignUp'
import {AuthProvider} from './context/authContext'
import "./App.css";


function App() {
  return (
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Loginpage/>} />
          <Route path="/sign-up" element={<SignUp/>} />
            <Route element={<PrivateRoute />}>
              <Route path='dashboart/home' element={<PanelHome />} />
              <Route path='dashboart/search' element={<PanelSearch />} />
              <Route path='/dashboart/search-log' element={<PanelSearchLog />} />
              <Route path='/dashboart/list-user' element={<PanelUser />} />
              <Route path='dashboart/register-user' element={<PanelRegister />} />
            </Route>
          <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
      </AuthProvider>
  );
}

export default App;
