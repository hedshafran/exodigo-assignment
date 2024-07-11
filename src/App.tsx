import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Modal from 'react-modal';
import Home from './pages/home/Home'
import CocktailForm from './pages/cocktailForm/CocktailForm';
import Navbar from './components/navBar/NavBar';
import './App.scss'

Modal.setAppElement('#root')

function App() {
  return (
    <Router>
      <Navbar className="nav-bar" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<CocktailForm />} />
      </Routes>
    </Router>
  )
}

export default App
