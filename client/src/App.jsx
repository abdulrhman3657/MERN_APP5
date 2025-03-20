import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
    
    <BrowserRouter>

        <Header/>
        
        <Routes>

          <Route path='/' element={<Dashboard/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          
        </Routes>

    </BrowserRouter>

    <ToastContainer/>

    </>
  )
}

export default App
