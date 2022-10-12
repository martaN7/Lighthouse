import React,  { useRef, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { useAuth } from '../components/Auth/Auth';
import { supabase } from '../database/supabase';

export default function SignupPage() {

    const [formError, setFormError] = useState(null);
    const [newUser, setNewUser] = useState(null);

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
  
    const { signUp } = useAuth();  
    const navigateTo = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
    
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const passwordConfirm = passwordConfirmRef.current.value;

        const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        
    
        // SignUp verification
   
        if(!email.match(validRegex)){
            setFormError('Invalid e-mail address!');
        }else if (password !== passwordConfirm){
            setFormError(`Passwords don't match!`);
        }else if (!email || !password || !passwordConfirm){
            setFormError('Please fill in all fields correctly');
        }else {
            const { user, error } = await signUp({ email, password});
            if (error) {
              alert('error signing in');
              console.log(error.message);
              console.log(error.error_description);
        
        
            } else {
              setNewUser(user);
              console.log(user);
              
            }

        }

      }

      const addUserName = async () => {

        const userName = nameRef.current.value;

        if (userName.length < 2){
            setFormError('Username too short!');
            console.log(formError);
            return
        }

        const { user, error } = await supabase.auth.update({ data: {name: userName}});
        if (error) {
          alert('error with name');
          console.log(error.message);
          console.log(error.error_description);
        } 
        
        if (user) {
          navigateTo('/home');
          console.log(user);
          console.log(user.user_metadata.name);
        }

      }
    
    if (newUser){
        return (
            <div className='container'>
                <div className='signup__page__container'>
                    <div className='signup__name__page'>
                        <form className='signup__name__form' onSubmit={addUserName}>
                            <h1 className='signup__name__title'>Give us your name:</h1>
                            <TextField 
                                    id="sign-up__name" label="Name" 
                                    variant="outlined" margin='normal'
                                    helperText = 'Enter your name'
                                    size='small' sx={{width: '300px'}}
                                    inputRef={nameRef}
                            />
                            <button type='submit' className='signup__form__button'>
                                    Save
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        )
    }


  return (
    <div className='container'>
        <div className='signup__page__container'>
            <div className='signup__page__img'>
                <img src='../work2.png'/>
            </div>
            <div className='signup__form'>
                <h1 className='signup__form__title'>Start your journey!</h1>
                <form className='signup__form__container' onSubmit={handleSignUp}>
                    {/* <TextField 
                        id="sign-up__user-name" label="Name" 
                        variant="outlined" margin='normal'
                        helperText = 'Enter your name'
                        size='small' sx={{width: '300px'}}
                        inputRef={nameRef}

                    /> */}

                    <TextField 
                        id="sign-up__email" label="E-mail" 
                        variant="outlined" margin='normal'
                        helperText = 'Enter your e-mail'
                        size='small' sx={{width: '300px'}}
                        inputRef={emailRef}
                    />

                    <TextField 
                        id="sign-up__password" label="Password" type='password'
                        variant="outlined" margin='normal'
                        helperText = 'Set your password'
                        size='small' sx={{width: '300px'}}
                        inputRef={passwordRef}
                    />

                    <TextField 
                        id="sign-up__password-confirm" label="Password-confirm" type='password'
                        variant="outlined" margin='normal'
                        helperText = 'Confirm your password'
                        size='small' sx={{width: '300px'}}
                        inputRef={passwordConfirmRef}
                    />
                    <button type='submit' className='signup__form__button'>
                        Sign up!
                    </button>
                    {formError && <p className='signup__display__error'>{formError}</p>}
                </form>                
            </div>
        </div>
    </div>
  )
}