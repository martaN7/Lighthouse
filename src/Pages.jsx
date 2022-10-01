import React from 'react';
import { Link, Outlet, Route, Routes, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';

function Login() {
    return (
        <div>
            <p>login</p>
            <Link to="/home">Log in</Link>
        </div>
    )
}

function Signup() {
    return (
        <div>
            <p>signup</p>
            <Link to="/home">Sign up</Link>
        </div>
    )
}

function StartPage() {
    return (
      <div>
        <h1>StartPage</h1>
        <div>
            <Link to="/login">Log in</Link>
            <Link to="/signup">Sign up</Link>
        </div>
      </div>
    )
}

function Practises() {
    return (
      <div>practises</div>
    )
}

function Entries() {
    return (
      <div>entries</div>
    )
}

function NewEntry() {
    return (
      <div>newEntry</div>
    )
}

function Statistics() {
    return (
      <div>statistics</div>
    )
}

  
function Home() {
    return (
        <div>
            home
            How are you feeling today?
        </div>
    )
}

function NotFound() {
    return (
      <div>Well...shit.</div>
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
            <Route path="home" >
              <Route index element={<Home />} />
              <Route path="new-entry" element={<NewEntry />} />
              <Route path="entries" element={<Entries />} />
              <Route path="stats" element={<Statistics />} />
              <Route path="practices" element={<Practises />} />
            </Route>
          </Route>
        <Route path="*" element={<Navigate replace to="/404" />} />
    </Routes>
  )
}
