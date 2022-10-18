import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import PrivateRoute from './pages/private/PrivateRoute';
import PanelHome from './pages/panel/PanelHome';
import PanelArticles from "./pages/panel/PanelArticles";
import PanelSearch from './pages/panel/PanelSearch';
import PanelSearchLogAll from './pages/panel/PanelSearchLogAll';
import PanelSearchLog from './pages/panel/PanelSearchLog';
import PanelUsers from './pages/panel/PanelUser';
import PanelUserEdit from './pages/panel/PanelUserEdit';
import PanelStartSearch from './pages/panel/PanelStartSearch';
import Loginpage from './pages/login/LoginPage';
import SignUp from './pages/login/SignUp';
import VerifyCode from './pages/login/VerifyCode';
import VerifyCodeToPassword from './pages/login/VerifyCodeToPassword'; 
import ForgotPassword from './pages/login/ForgotPassword'
import ResetPassword from './pages/login/ResetPassword'
import {AuthProvider} from './context/authContext';
import "./App.css";


function App() {
  return (
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Loginpage/>} />
          <Route path="/sign-up" element={<SignUp/>} />
          <Route path="/sign-up/verify-code/:username" element={<VerifyCode/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/verify-code-to-password/:username" element={<VerifyCodeToPassword/>} />
          <Route path="/password-reset/:code" element={<ResetPassword/>} />
            <Route element={<PrivateRoute />}>
              <Route path='/dashboart/home' element={<PanelHome />} />
              <Route path='/dashboart/search' element={<PanelSearch />} />
              <Route path='/dashboart/start-search' element={<PanelStartSearch />} />
              <Route path='/dashboart/search-log' element={<PanelSearchLogAll />} />
              <Route path='/dashboart/search-log/:idLog' element={<PanelSearchLog />} />
              <Route path='/dashboart/list-articles/:searchId/:company' element={<PanelArticles />} />
              <Route path='/dashboart/user' element={<PanelUsers />} />
              <Route path='/dashboart/user/:userId' element={<PanelUserEdit />} />
            </Route>
          <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
      </AuthProvider>
  );
}

export default App;
