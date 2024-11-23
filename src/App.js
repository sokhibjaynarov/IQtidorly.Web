import './App.css';
import { Route, Routes, useLocation } from "react-router-dom";
import Login from './pages/login/Login';
import Admin from "./pages/admin/Admin"
import Auth from './Auth/Auth';
import Main from './pages/admin/main/Main';
import Test from './pages/admin/test/Test';
import Create from './pages/admin/test/create/Create';
import Addtest from './pages/admin/test/create/addtest/Addtest';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path="/" element={<Auth />}>
          <Route path="admin" element={<Admin />}>
            <Route path="main" element={<Main />} /> 
            <Route path="test" element={<Test />} /> 
            <Route path='test/create' element={<Create/>}/>
            <Route path='test/create/addtest' element={<Addtest/>}/>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

