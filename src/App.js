// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CardDetail from './pages/CardDetail';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cards/:id" element={<CardDetail />} />
    </Routes>
  </BrowserRouter>
);

export default App;