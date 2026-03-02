import { Route, Routes, BrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PublicOnlyRoute from "./components/PublicOnlyRoute.jsx";
import Landing from './components/Landing.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Dashboard from './components/Dashboard.jsx';
import Filter from './components/Filter.jsx';

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing/>}></Route>
          <Route path='/auth/login' element={<PublicOnlyRoute><Login/></PublicOnlyRoute>}></Route>
          <Route path='/auth/signup' element={<PublicOnlyRoute><Signup/></PublicOnlyRoute>}></Route>
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}></Route>
          <Route path='/filter' element={<ProtectedRoute><Filter/></ProtectedRoute>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
