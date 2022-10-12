import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/Auth/Auth';
import { supabase } from '../database/supabase';


export default function StatsPage() {

  const [fetchError, setFetchError] = useState('');
  const [userEntries, setUserEntries] = useState([]);
  const [defaultEntries, setDefaultEntries] = useState([]);

  const {user} = useAuth();

    useEffect(() => {
      const fetchEntries = async () => {
        let { data: UserEntries, error } = await supabase
        .from('UserEntries')
        .select("*")
        .order('created_at', { ascending: false })
        .eq('user_id', user.id)
    
        if (error){
            console.log(error);
            setFetchError('Could not fetch the data');
        }
        if(UserEntries){
            setFetchError('');
            setUserEntries(UserEntries);
            setDefaultEntries(UserEntries);
        }
    
      }

      fetchEntries();
      
  }, []);


  return (
    <div className='stats__page'>
        <h1 className='stats__page__title'>Your statistics</h1>
    </div>
  )
}
