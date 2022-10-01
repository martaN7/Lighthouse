import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Navigation() {
  return (
    <>
    <header className='header'>
        <div className='container header__container'>
            
            <nav>
                <ul className='nav__links'>
                    <li>
                        <Link to="/home" className='nav__link__logo'>Lighthouse</Link>
                    </li>
                    <li>
                        <img src='../lighthouse.png' className='nav__links__img'/>
                    </li>
                    <div className='nav__links__right'>
                        <li>
                            <Link to="/home/entries" className='nav__link'>Entries</Link>
                        </li>
                        <li>
                            <Link to="/home/stats" className='nav__link'>Statistics</Link>
                        </li>
                        <li>
                            <Link to="/home/practices" className='nav__link'>Practices</Link>
                        </li>
                    </div>
                </ul>
            </nav>
        </div>
    </header>
    <Outlet />
    </>
  )
}
