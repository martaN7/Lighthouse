import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {

  return (
    <div className='home__page'>
        <div className='container home__page__container'>
            <div className='home__page__entry'>
                <h1 className='home__page__title'>
                    How are you feeling today?
                </h1>
                <Link to="/home/new-entry" className='home__page__button'>
                  New entry
                </Link>
            </div>

        </div>

    </div>
  )
}
