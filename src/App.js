import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/Profilepage';
import { useCallback, useState } from 'react';
import { NavBar } from './components/NavBar';

function App() {
  const [isLoggedIn,setIsLoggedIn]=useState(true);


  return (
    <>
      <NavBar/>
    </>
  );
}

export default App;

//<Routes>
// <Route path='/' element={<ProtectedRoute isLoggedIn={isLoggedIn} ><MainPage/></ProtectedRoute>}/>
//  <Route path='/login' element={<LoginPage/>}/>
//  <Route path='/profile' element={<ProtectedRoute isLoggedIn={isLoggedIn}><ProfilePage/></ProtectedRoute>}/>
//</Routes>