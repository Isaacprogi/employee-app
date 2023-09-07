import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className='w-full h-[3rem]'>
            <ul className="w-full h-full  flex items-center justify-center text-white">
                <li className='mr-[2rem] hover:underline '>
                    <NavLink end
                        to="/"
                        className={({ isActive }) =>
                            isActive ? " bg-neutral-900 p-2 rounded-md" : "p-2 rounded-md"
                        }
                    >
                        DashBoard
                    </NavLink>
                </li>
                <li className=' p-2 rounded-md hover:underline'>
                    <NavLink end
                        to="/form"
                        className={({ isActive }) =>
                            isActive ? " bg-neutral-900 p-2 rounded-md" : "p-2 rounded-md "
                        }
                    >
                        Add
                    </NavLink>
                </li>
            </ul>
            <div className='bg-neutral-800 h-[.1rem]'></div>
        </nav>
    );
};

export default NavBar;
