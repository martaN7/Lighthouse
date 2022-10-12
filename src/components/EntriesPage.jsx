import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/Auth/Auth';
import { supabase } from '../database/supabase';
import { FormControl, InputLabel, Select, MenuItem, TextField} from '@mui/material';
import SingleEntryCard from './SingleEntryCard';

export default function EntriesPage() {

    const [fetchError, setFetchError] = useState('');
    const [userEntries, setUserEntries] = useState([]);
    const [defaultEntries, setDefaultEntries] = useState([]);

    const [query, setQuery] = useState('');

    const [showMood, setShowMood] = useState('');


    const {user} = useAuth();

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


    useEffect(() => {
        fetchEntries();
    }, []);

    const handleDelete = (id) => {
        setUserEntries(prev => {
            return prev.filter(entry => {
                return entry.id !== id
            });
        });
    }

    //sorting data

    const searchTags = async (e) => {

        setUserEntries(prev => {
            return prev.filter(entry => {
                 return entry.tags?.some(tag => tag === query);
            });
        });
        setQuery('');
    }

    const selectMood = (e) => {
        setShowMood(e.target.value);
        setUserEntries(defaultEntries);
        if(e.target.value === 'all'){
            setUserEntries(defaultEntries);
        }else {
            setUserEntries(prev => {
                return prev.filter(entry => {
                     return entry.mood === e.target.value;
                });
            });

        }
        
    }

    const showAll = () => {
        setUserEntries(defaultEntries);
    }


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

                <div className='entries__display__options'>

                    <TextField 
                            id="tag-search" label="Search for a tag..." 
                            variant="outlined" margin='normal'
                            size='small' sx={{width: '250px'}}
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            onKeyUp={e => e.key === "Enter" ? searchTags(e) : null}
                    />

                    <button className='entries__display__all_button' onClick={showAll}>Show all</button>

                    <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                        <InputLabel id="demo-simple-select-label">Show mood</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={showMood}
                            label='Show Mood'
                            onChange={selectMood}
                        >
                            <MenuItem value={'all'}>all</MenuItem>
                            <MenuItem value={'amazing'}>amazing</MenuItem>
                            <MenuItem value={'good'}>good</MenuItem>
                            <MenuItem value={'meh'}>meh</MenuItem>
                            <MenuItem value={'bad'}>bad</MenuItem>
                            <MenuItem value={'awful'}>awful</MenuItem>
                        </Select>
                    </FormControl>

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
