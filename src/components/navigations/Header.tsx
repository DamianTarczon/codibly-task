import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../logo.svg'
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

function Header() {
    const [open, setOpen] = useState<boolean>(false);
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
      };

    return (
        <>
        <nav className="w-full shadow-nav">
            <div className="main-container py-5 flex flex-wrap gap-5 justify-between items-center">
                <NavLink to="/" className='flex items-center'>
                    <img src={logo} className='w-16' alt="logo" />
                    <p className='text-2xl'>Codibly task</p>
                </NavLink>
                <ul className='gap-5 items-center hidden sm:flex'>
                    <li>
                        <NavLink 
                            to="/"
                            className={({isActive}) => `${isActive ? 'text-blue-400': ''} text-lg hover:text-blue-500 animation-300` }
                        >
                            Homepage
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/products"
                            className={({isActive}) => `${isActive ? 'text-blue-400': ''} text-lg hover:text-blue-500 animation-300` }
                        >
                            Products
                        </NavLink>
                    </li>
                </ul>
                <div className="w-fit sm:hidden">
                    <IconButton onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                </div>
            </div>
        </nav>
        <Drawer 
            open={open} 
            onClose={toggleDrawer(false)}
        >
            <div className='min-w-[320px] flex flex-col gap-5 p-2'>
                <div className="flex justify-end">
                    <IconButton className="text-end w-fit" onClick={() => setOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <ul className='p-4 space-y-3'>
                    <li onClick={toggleDrawer(false)}>
                        <NavLink 
                            to="/"
                            className={({isActive}) => `${isActive ? 'text-blue-400': ''} text-xl hover:text-blue-500 animation-300`}
                        >
                            Homepage
                        </NavLink>
                    </li>
                    <li onClick={toggleDrawer(false)}>
                        <NavLink 
                            to="/products"
                            className={({isActive}) => `${isActive ? 'text-blue-400': ''} text-xl hover:text-blue-500 animation-300` }
                        >
                            Products
                        </NavLink>
                    </li>
                </ul>
            </div>
        </Drawer>
      </>
    );
  }
  
  export default Header;