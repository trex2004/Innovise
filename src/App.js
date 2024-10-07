import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/Profilepage';
import RegisterPage from './pages/RegisterPage';
import ProfilePageOtherUser from './pages/ProfilePageOtherUser';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<ProtectedRoute><MainPage/></ProtectedRoute>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/profile' element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
        <Route path='/profile/:username' element={<ProtectedRoute><ProfilePageOtherUser/></ProtectedRoute>}/>
      </Routes>
    </>
  );
}

export default App;
