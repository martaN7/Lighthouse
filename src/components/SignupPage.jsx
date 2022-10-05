import React from 'react';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';

export default function SignupPage() {
  return (
    <div className='container'>
        <div className='signup__page__container'>
            <div className='signup__page__img'>
                <img src='../work2.png'/>
            </div>
            <div className='signup__form'>
                <h1 className='signup__form__title'>Start your journey!</h1>
                <form className='signup__form__container'>
                    <TextField 
                        id="outlined-basic" label="Name" 
                        variant="outlined" margin='normal'
                        helperText = 'Enter your name'
                        size='small' sx={{width: '300px'}}
                    />

                    <TextField 
                        id="outlined-basic" label="E-mail" 
                        variant="outlined" margin='normal'
                        helperText = 'Enter your e-mail'
                        size='small' sx={{width: '300px'}}
                    />

                    <TextField 
                        id="outlined-basic" label="Password" type='password'
                        variant="outlined" margin='normal'
                        helperText = 'Set your password'
                        size='small' sx={{width: '300px'}}
                    />

                    <TextField 
                        id="outlined-basic" label="Password-confirm" type='password'
                        variant="outlined" margin='normal'
                        helperText = 'Confirm your password'
                        size='small' sx={{width: '300px'}}
                    />

                    <button type='button' className='signup__form__button'>
                        <Link to="/home" className='signup__form__link'>Sign up!</Link>
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}