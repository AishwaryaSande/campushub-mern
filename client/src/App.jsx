import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home';
import LostItems from './pages/LostItems';
import ItemDetails from './pages/ItemDetails';
import ReportItem from './pages/ReportItem';
import MyItems from './pages/MyItems';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items" element={<LostItems />} />
            <Route path="/items/:id" element={<ItemDetails />} />
            <Route
              path="/report"
              element={
                <PrivateRoute>
                  <ReportItem />
                </PrivateRoute>
              }
            />
            <Route
              path="/my-items"
              element={
                <PrivateRoute>
                  <MyItems />
                </PrivateRoute>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}
