import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Modal from 'react-modal';
import Home from './pages/home/Home'
import Navbar from './components/navBar/NavBar';
import CocktailForm from './components/cocktailForm/CocktailForm';
import './App.css'

Modal.setAppElement('#root')

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<CocktailForm />} />
      </Routes>
    </Router>
  )
}

export default App
