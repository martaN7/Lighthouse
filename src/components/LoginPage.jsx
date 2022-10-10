import React,  { useRef, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { useAuth } from '../components/Auth/Auth';

export default function LoginPage() {

    const [formError, setFormError] = useState(null);

    const emailRef = useRef();
    const passwordRef = useRef();

    const { signIn } = useAuth();
    const navigateTo = useNavigate();
    

    async function handleLogin(e) {
        e.preventDefault();

        const email = emailRef.current.value
        const password = passwordRef.current.value
        const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


        if(!email.match(validRegex)){
            setFormError('Invalid e-mail address!');
        }else {
            const { user, error } = await signIn({ email, password});

            if (error) {
              alert('error logging in');
              console.log(error.message);
              console.log(error.error_description);
              console.log(user);


            } else {
              navigateTo('/home');
              console.log(user.user_metadata.name);
            }
        }

    }
 

  return (
    <div className='container'>
        <div className='login__page__container'>
            <div className='login__page__img'>
                <img src='../notebook.png'/>
            </div>
            <div className='login__form'>
                <h1 className='login__form__title'>It's good to see you again!</h1>
                <form className='login__form__container' onSubmit={handleLogin}>
                    <TextField 
                        id="login__email" label="E-mail" 
                        variant="outlined" margin='normal'
                        helperText = 'Enter your e-mail'
                        size='small' sx={{width: '300px'}}
                        inputRef={emailRef}
                    />
                    <TextField 
                        id="login__password" label="Password" type='password'
                        variant="outlined" margin='normal'
                        helperText = 'Enter your password'
                        size='small' sx={{width: '300px'}}
                        inputRef={passwordRef}
                    />
                    <button type='submit' className='login__form__button'>
                        Log in
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}
