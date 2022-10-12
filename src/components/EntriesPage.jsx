import React, {useEffect, useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/Auth/Auth';
import { supabase } from '../database/supabase';
import SingleEntryPreview from './SingleEntryPreview';

export default function EntriesPage() {

    const [fetchError, setFetchError] = useState(null);
    const [userEntries, setUserEntries] = useState([]);
    const {user} = useAuth();

    useEffect(() => {
        const fetchEntries = async () => {
            let { data: UserEntries, error } = await supabase
            .from('UserEntries')
            .select("*")
            .eq('user_id', user.id);

            if (error){
                console.log(error);
            }
            if(UserEntries){
                setUserEntries(UserEntries);
                console.log(typeof UserEntries);
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
                    {userEntries && (
                        userEntries.map((userEntry) => {
                            return <SingleEntryPreview key={userEntry.id} entryData={userEntry}/>
                        })
                    )}                    
                </div>
            </div>
        </div>
    </section>
    </>
  )
}
