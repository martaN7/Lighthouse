import React from 'react';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';

export default function LoginPage() {
  return (
    <div className='container'>
        <div className='login__page__container'>
            <div className='login__page__img'>
                <img src='../notebook.png'/>
            </div>
            <div className='login__form'>
                <h1 className='login__form__title'>It's good to see you again!</h1>
                <form className='login__form__container'>
                    <TextField 
                        id="outlined-basic" label="E-mail" 
                        variant="outlined" margin='normal'
                        helperText = 'Enter your e-mail'
                        size='small' sx={{width: '300px'}}
                    />
                    <TextField 
                        id="outlined-basic" label="Password" type='password'
                        variant="outlined" margin='normal'
                        helperText = 'Enter your password'
                        size='small' sx={{width: '300px'}}
                    />
                    <Link to="/home" className='login__form__button'>
                        Log in
                    </Link>
                </form>
            </div>
        </div>
    </div>
  )
}
