import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/Auth/Auth';
import { supabase } from '../database/supabase';
import SingleEntryCard from './SingleEntryCard';

export default function EntriesPage() {

    const [fetchError, setFetchError] = useState('');
    const [userEntries, setUserEntries] = useState([]);
    
    const {user} = useAuth();

    const handleDelete = (id) => {
        setUserEntries(prev => {
            return prev.filter(entry => {
                return entry.id !== id
            });
        });
    }

    useEffect(() => {
        
        const fetchEntries = async () => {
            let { data: UserEntries, error } = await supabase
            .from('UserEntries')
            .select("*")
            .eq('user_id', user.id);

            if (error){
                console.log(error);
                setFetchError('Could not fetch the data');
            }
            if(UserEntries){
                setUserEntries(UserEntries);
            }

        }

        fetchEntries();
    }, []);


  return (
    <>
    <div className='bg'></div>
    <section className='entries'>
        <div className='container'>
            <div className='entries__box'>
                <div className='entries__header'>
                    <h1 className='entries__title'>Your entries</h1>
                    <Link to="/home/new-entry" className='entries__button'>New entry</Link>
                </div>
                <div className='entries__list'>
                    {userEntries.length === 0 && <p>You have no entries yet</p>}
                    {fetchError && <div className='new__entry__error'><p>{fetchError}</p></div>}
                    {userEntries && (
                        userEntries.map((userEntry) => {
                            return <SingleEntryCard key={userEntry.id} entryData={userEntry} handleDelete={handleDelete}/>
                        })
                    )}                    
                </div>
            </div>
        </div>
    </section>
    </>
  )
}
