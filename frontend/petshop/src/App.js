import logo from './logo.svg';
import './App.css';
import './variables.css';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Layout from './views/layout/layout';
import Home from './views/home/home';
import Admin from './views/admin/admin';
import Gallery from './views/gallery/gallery';



function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
