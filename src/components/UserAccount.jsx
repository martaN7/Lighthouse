import React, { useRef, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/Auth/Auth';
import { TextField } from '@mui/material';
import { supabase } from '../database/supabase';

export default function UserAccount() {
    const { user } = useAuth();
    const navigateTo = useNavigate();

    const [formError, setFormError] = useState(null);

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const saveNewName = async (e) => {
        e.preventDefault();

        const newUserName = nameRef.current.value;
        
        if (newUserName.length < 2){
            setFormError('Username too short!');
            return
        }

        try{
            const { user, error } = await supabase.auth.update({ 
                data: { name: newUserName }
            });
            if (error) {
            console.log(error);
            setFormError('Error updating data');
            } 
            
            if (user) {
            navigateTo('/home');
            }
        }catch(error){
            console.log(error);
            setFormError('Error updating data');
        }
        
    }

    const saveNewEmail = async (e) => {
        e.preventDefault();

        const newEmail = emailRef.current.value;
        const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(!newEmail.match(validRegex)){
            setFormError('Invalid e-mail address!');
            return
        }

        try{
            const { user, error } = await supabase.auth.update({ 
                email: newEmail,
            });
            if (error) {
            console.log(error);
            setFormError('Error updating data');
            } 
            
            if (user) {
            navigateTo('/home');
            }
        }catch(error){
            console.log(error);
            setFormError('Error updating data');
        }
        

    }

    const saveNewPassword = async (e) => {
        e.preventDefault();

        const newPassword = passwordRef.current.value;
        const newPasswordConfirm = passwordConfirmRef.current.value;
        
        if (newPassword !== newPasswordConfirm){
            setFormError(`Passwords don't match!`);
            return
        }

        if (!newPassword || !newPasswordConfirm){
            setFormError('Please fill in all fields correctly');
            return
        }

        try{
            const { user, error } = await supabase.auth.update({ 
                password: newPassword,
            });
            if (error) {
            console.log(error);
            setFormError('Error updating data');
            } 
            
            if (user) {
            navigateTo('/home');
            }
        }catch(error){
            console.log(error);
            setFormError('Error updating data');
        }
    }


  return (
    <div className='user__account__page'>
        <div className='container'>
            <div className='user__account__page__container'>
                <div className='signup__name__page'>
                    <form className='user__account__form'>
                        <h1 className='signup__name__title'>Change your personal data</h1>

                        <div className='account__input__box'>
                            <TextField 
                                id="sign-up__name" label="Name" 
                                variant="outlined" margin='normal'
                                helperText = 'Change your name'
                                size='small' sx={{width: '300px'}}
                                inputRef={nameRef}
                            />

                            <button onClick={e => saveNewName(e)} type='submit' className='account__form__button'>
                                Save new name
                            </button>
                        </div>

                        <div className='account__input__box'>
                            <TextField 
                                id="sign-up__email" label="E-mail" 
                                variant="outlined" margin='normal'
                                helperText = 'Change your e-mail'
                                size='small' sx={{width: '300px'}}
                                inputRef={emailRef}
                            />
                            <button onClick={e => saveNewEmail(e)} type='submit' className='account__form__button'>
                                    Save new e-mail
                            </button>
                        </div>

                        <div className='account__input__box'>
                            <div className='account__password__box'>
                                <TextField 
                                    id="sign-up__password" label="Password" type='password'
                                    variant="outlined" margin='normal'
                                    helperText = 'Set new password'
                                    size='small' sx={{width: '300px'}}
                                    inputRef={passwordRef}
                                />
                                <TextField 
                                    id="sign-up__password-confirm" label="Password-confirm" type='password'
                                    variant="outlined" margin='normal'
                                    helperText = 'Confirm new password'
                                    size='small' sx={{width: '300px'}}
                                    inputRef={passwordConfirmRef}
                                />
                            </div>
                            <button onClick={e => saveNewPassword(e)} type='submit' className='account__form__button'>
                                    Save new password
                            </button>

                        </div>

                        {formError && <div className='new__entry__error'><p>{formError}</p></div>}

                    </form>

                </div>
            </div>
        </div>
    </div>
  )
}
