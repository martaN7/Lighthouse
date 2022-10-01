import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Navigation() {
  return (
    <>
    <div className='app__container'>
        <div className='nav__container'>
            <nav>
                <ul className='nav__links'>
                    <li>
                        <Link to="/home" className='nav__link'>Lighthouse</Link>
                    </li>
                    <div>
                        <li>
                            <Link to="/home/entries" className='nav__link'>Entries</Link>
                        </li>
                        <li>
                            <Link to="/home/stats" className='nav__link'>Statistics</Link>
                        </li>
                        <li>
                            <Link to="/home/practices" className='nav__link'>Practises</Link>
                        </li>
                    </div>
                </ul>
            </nav>
        </div>
    </div>
    <Outlet />
    </>
  )
}
