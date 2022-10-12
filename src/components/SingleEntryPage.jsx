import React, {useState, useEffect} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { supabase } from '../database/supabase';

export default function SingleEntryPage() {

    const navigateTo = useNavigate();

    const {id} = useParams();

    const [loading, setLoading] = useState(false);
    const [entryData, setEntryData] = useState(null);
    const [mood, setMood] = useState('');
    const [tags, setTags] = useState([]);
    const [dateCreated, setDateCreated] = useState('');
    //mood, title, entry, tags, created_at, day_created, week_day_created, month_created, color


    useEffect(()=>{
        const fetchEntry = async () => {

            try {
                setLoading(true);
                const { data, error } = await supabase
                .from('UserEntries')
                .select()
                .eq('id', id)
                .single();
                if (error){
                    navigateTo('/home', {replace: true});
                    throw error;
                }

                if(data){
                    console.log(data);
                    setEntryData(data);
                    setMood(data.mood);
                    setTags(data.tags);
                    setDateCreated(data.date_created);
                }

            } catch (error) {
                throw error;

            } finally {
                setLoading(false);
            }

        }
        fetchEntry();

    }, [id, navigateTo]);




  return (
    <section className='display__entry'>
        <div className='container'>
            <div className='display__entry__box'>
                <div className='display__entry__box__content'>
                {loading ? (<p className='display__entry__prompt'>Fetching your entry...</p>) :
                    (<>
                    <div>
                        <div className='display__entry__header'>
                            <span className='display__entry__date'>{entryData?.week_day_created}, {dateCreated.slice(8,10)} {entryData?.month_created} {dateCreated.slice(0,4)}</span>
                            <div className='display__button' style={{backgroundColor: entryData?.color ? entryData.color : '#fff' }}>
                                {mood === 'amazing' && <i className="fa-regular fa-face-laugh emoji__clicked" />}
                                {mood === 'good' && <i className="fa-regular fa-face-smile-wink emoji__clicked"/>}
                                {mood === 'meh' && <i className="fa-regular fa-face-meh emoji__clicked"/>}
                                {mood === 'bad' && <i className="fa-regular fa-face-frown-open emoji__clicked"/>}
                                {mood === 'awful' && <i className="fa-regular fa-face-tired emoji__clicked"/>}
                            </div>
                            <div className='display__entry__buttons'>
                                <Link to="/home/edit-entry" className='display__entry__button display__button__edit'>
                                    <i className="fa-solid fa-pen"></i>
                                </Link>
                                <button className='display__entry__button display__button__delete'>
                                        <i className="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>

                        <div className='display__entry__content'>
                            <h4 className='display__entry__title'>{entryData?.title}</h4>
                            <div className='display__entry__text ql-editor'>
                            <p dangerouslySetInnerHTML={{ __html: entryData?.entry}}></p>
                            </div>

                        </div>
                    </div>

                    <div className='display__entry__footer'>

                        {tags && ( <div className='display__tags__input__container'>
                            {tags?.map((tag, index) => (
                                <div key={index} className="tag__single">
                                <span className='tag__title'>{tag}</span>
                                </div>
                            ))}
                        </div>)}
                        <p className='display__entry__edit-date'>Last edited: {entryData?.created_at.slice(0,10)}
                        </p>

                    </div>
                    </>)}
                </div>
            </div>
        </div>
    </section>
  )
}
