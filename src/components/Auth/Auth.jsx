import React, { useContext, useState, useEffect, createContext } from 'react';
import { supabase } from '../../database/supabase';

export function useAuth() {
    return useContext(AuthContext);
  }

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      // Check active sessions and sets the user
      const session = supabase.auth.session();
  
      setUser(session?.user ?? null); //Nullish coalescing operator - zwraca prawą stronę, jeśli lewa to null/undefined
      setLoading(false);
  
      // Listen for changes on auth state (logged in, signed out, etc.)
      const { data } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          
          setUser(session?.user ?? null);
          setLoading(false);
        }
      )
    }, [])
  
    // Will be passed down to Signup, Login and Dashboard components
    const value = {
      signUp: (data) => supabase.auth.signUp(data),
      signIn: (data) => supabase.auth.signIn(data),
      signOut: () => supabase.auth.signOut(),
      user,
    }
  
    return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    )
  }

  export {AuthContext}