import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import SignupForm from './pages/Signup'
import Login from './pages/login'
function App() {
  return (
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<SignupForm/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
  )
}

export default App;
