import React from 'react';
import { Link, Outlet, Route, Routes, Navigate } from 'react-router-dom';
import Navigation from './Navigation';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import HomePage from './HomePage';
import NewEntryPage from './NewEntryPage';
import EntriesPage from './EntriesPage'
import EditEntryPage from './EditEntryPage';
import SingleEntryPage from './SingleEntryPage';
import PracticesPage from './PracticesPage';
import StatsPage from './StatsPage';
import NotFoundPage from './NotFoundPage';

import ProtectedRoute from '../components/Auth/ProtectedRoute';


function Login() {
    return (
        <div className='login__page'>
            <Navigation />
            <LoginPage />
        </div>
    )
}

function Signup() {
    return (
        <div className='signup__page'>
            <Navigation />
            <SignupPage />
        </div>
    )
}

function StartPage() {
    return (
      <div className='start__page'>
        <div className='container start__page__container'>
          <h1 className='start__page__title'>Welcome!</h1>
          <div className='start__page__buttons'>
              <Link to="/login" className='start__page__button'>Log in</Link>
              <Link to="/signup" className='start__page__button'>Sign up</Link>
          </div>
        </div>
      </div>
    )
}

function Practises() {
    return (
      <PracticesPage />
    )
}

function Entries() {
    return (
      <EntriesPage />
    )
}

function NewEntry() {
    return (
        <NewEntryPage />
    )
}


function EditEntry() {
  return (
    <EditEntryPage />
  )
}

function SingleEntry() {
  return (
    <SingleEntryPage />
  )
}


function Statistics() {
    return (
      <StatsPage />
    )
}

  
function Home() {
    return (
        <>
            <HomePage />
        </>
    )
}

function NotFound() {
    return (
      <NotFoundPage />
    )
}

export default function Pages() {
  return (
    <Routes>
        <Route path="/404" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Navigation />}>
            <Route index element={<StartPage />} />
            <Route path="home" element={<ProtectedRoute />} >
              <Route index element={<Home />} />
              <Route path="new-entry" element={<NewEntry />} />
              <Route path="edit-entry/:id" element={<EditEntry/>} />
              <Route path="entry/:id" element={<SingleEntry />} />
              <Route path="entries" element={<Entries />} />
              <Route path="stats" element={<Statistics />} />
              <Route path="practices" element={<Practises />} />
            </Route>
          </Route>
        <Route path="*" element={<Navigate replace to="/404" />} />
    </Routes>
  )
}
