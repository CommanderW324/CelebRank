import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/home" Component={Home}/>
        <Route path="/login" Component={Login}/>  
      </Routes>
    </BrowserRouter>
  );
}

export default App;
