import { BrowserRouter, Routes, Route, Navigate, redirect} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import React, { useState } from 'react'
import Header from './components/Header'
import InfluencerPage from 'pages/InfluencerPage'
import { Auth } from 'aws-amplify'
import Influencer from 'pages/Influencer'
function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [signOutFunc, setSignOutFunc] = useState(()=>{})
  const authenticate = () => {Auth.currentUserInfo().then((res)=>{
    setIsAuth(res);
  })};
  React.useEffect(authenticate, []);
  
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Header isAuth={isAuth} signOut={signOutFunc}/>
        <Routes>
          <Route path="/home" element={<Home auth={true}/>}/>
            <Route path="/login" Component={Login}/> 
            <Route path="/profile" element={<Profile signOut={undefined} user={undefined}/>}/> 
            <Route path="/influencers" element={<InfluencerPage signOut={undefined} user={undefined}/>}/>
            <Route path="/influencer/:id" element={<Influencer signOut={undefined} user={undefined} />} /> 
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
