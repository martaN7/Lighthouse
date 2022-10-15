import React,  { useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
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
            return
        }
        if(password.length < 6){
            setFormError(`Your password must be min. 6 characters long`);
            return
        }
        if (password !== passwordConfirm){
            setFormError(`Passwords don't match!`);
            return
        }
        if (!email || !password || !passwordConfirm){
            setFormError('Please fill in all fields correctly');
            return
        }

        try{
            const { user, error } = await signUp({ email, password});
            if (error) {
                setFormError(`Error signing up  
                ${error.message || error.error_description}`);
                console.log(error.message || error.error_description);

            } else {
                setNewUser(user);
                setFormError(null);
            }

        }catch(error){
            setFormError(error.message || error.error_description);
        }
      }

      const addUserName = async (e) => {
        e.preventDefault();

        const userName = nameRef.current.value;

        if (userName.length < 2){
            setFormError('Username too short!');
            return
        }

        try{
            const { user, error } = await supabase.auth.update({ data: {name: userName}});
            if (error) {
                setFormError('Error sending name');
            } 
            
            if (user) {
            navigateTo('/home');
            }

        }catch(error){
            setFormError(error.message || error.error_description);
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
                            {formError && <div className='new__entry__error'><p>{formError}</p></div>}
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
                <img src='../work2.png' alt='man with laptop on a rock'/>
            </div>
            <div className='signup__form'>
                <h1 className='signup__form__title'>Start your journey!</h1>
                <form className='signup__form__container' onSubmit={e=>handleSignUp(e)}>

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
                    {formError && <div className='new__entry__error'><p>{formError}</p></div>}
                    <button type='submit' className='signup__form__button'>
                        Sign up!
                    </button>
                </form>                
            </div>
        </div>
    </div>
  )
}