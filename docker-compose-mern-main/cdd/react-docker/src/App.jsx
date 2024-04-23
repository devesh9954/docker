import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import UserSearch from './pages/Search';
// import Calculator from './pages/calculator';

// import "./styles.css";

import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <BrowserRouter>
      {/* header */}
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/search' element={<  UserSearch/>} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          {/* <Route path='/calculator' element={<Calculator />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
