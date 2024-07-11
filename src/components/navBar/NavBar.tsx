import { FC } from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '../../assets/glasses.svg?react';
import AddIcon from '../../assets/plus.svg?react';
import './NavBar.scss';

interface NavbarProps {
  className?: string;
}

const Navbar: FC<NavbarProps> = ({ className }) => {
  return (
    <nav className={`nav-bar ${className}`}>
      <Link to="/">
        <HomeIcon className="icon" />
      </Link>
      <Link to="/add">
        <AddIcon className="icon" />
      </Link>
    </nav>
  );
};

export default Navbar;