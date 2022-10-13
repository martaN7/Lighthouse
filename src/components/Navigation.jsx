import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/Auth/Auth';

export default function Navigation() {

    // Get current user and signOut function from context
   const { user, signOut } = useAuth();
   const navigateTo = useNavigate();
   const userName = user?.user_metadata.name;


  async function handleSignOut() {
     // Ends user session
     try {
        const { error } = await signOut();
        if(error){
            throw error;
        }
     }catch(error){
        throw error;
     }

     // Redirects the user to Login page
     navigateTo('/');
  }


  return (
    <>
    <header className='header'>
        <div className='container header__container'>
            
            <nav>
                <ul className='nav__links'>
                    <li>
                        <Link to="/home" className='nav__link__logo'>Lighthouse</Link>
                    </li>
                    <li className='nav__links__img__box'>
                        <img src='../lighthouse.png' className='nav__links__img'/>
                    </li>
                    {userName && (
                    
                    <div className='nav__links__right'>
                        <li>
                            <Link to="/home/entries" className='nav__link'>Entries</Link>
                        </li>
                        <li>
                            <Link to="/home/stats" className='nav__link'>Statistics</Link>
                        </li>
                        <li className='nav__user'>
                            <div className='nav__user__container'>
                                <i className="fa-solid fa-user nav__user__icon"></i>
                                <span className='nav__user__name'>{user.user_metadata.name}</span>
                            </div>                          
                            
                            <div className='nav__user__dropdown'>
                                <ul className='nav__user__options'>
                                    <li className='nav__user__option'>
                                        <Link to={'/home/account/' + user.id} className='nav__user__link'>
                                            Account
                                        </Link>
                                    </li>
                                    <li className='nav__user__option' onClick={handleSignOut}>
                                        <span className='nav__user__link'>
                                            Log out
                                        </span>
                                    </li>
                                    
                                </ul>
                            </div>
                        </li>
                    </div>
                    )}

                </ul>
            </nav>
        </div>
    </header>
    <Outlet />
    </>
  )
}
