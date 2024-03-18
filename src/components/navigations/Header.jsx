import { NavLink } from 'react-router-dom';
import logo from '../../logo.svg'

function Header() {
    return (
        <nav className="w-full shadow-nav">
            <div className="main-container py-5 flex flex-wrap gap-5 justify-between items-center">
                <NavLink to="/" className='flex items-center'>
                    <img src={logo} className='w-16' alt="logo" />
                    <p>Codibly task</p>
                </NavLink>
                <ul className='flex gap-5 items-center'>
                    <li>
                        <NavLink 
                            to="/"
                            className={({isActive}) => isActive ? 'text-blue-500': '' }
                        >
                            Homepage
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/products"
                            className={({isActive}) => isActive ? 'text-blue-500': '' }
                        >
                            Products
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
  }
  
  export default Header;