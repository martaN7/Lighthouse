import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../database/supabase';


export default function SingleEntryCard({entryData, handleDelete}) {


    const {title, entry, date_created, id, day_created, week_day_created, month_created, color} = entryData;
    const myText = entry.replace(/<[^>]+>/g, '').slice(0,300);

    const navigateTo = useNavigate();


    const displayEntry = () => {
        navigateTo('/home/entry/' + id);
    }

    const editEntry= (e) => {
        e.stopPropagation();
        navigateTo('/home/edit-entry/' + id);
    }

    const deleteEntry = async (e) => {
        e.stopPropagation();

        try {
            const { data, error } = await supabase
            .from('UserEntries')
            .delete()
            .eq('id', id);

            if(error){
                console.log(error);
            }
            if(data){
                handleDelete(id);
            }

        }catch (error){
            console.log(error);
        }
    }

  return (
    <div className='hover__container' onClick={displayEntry}>
        <div className='entry__single' >
            <div className='entry__date'>
                <span className='entry__date__weekday'>{week_day_created.slice(0,3)}</span>
                <span className='entry__date__day' style={{color: color}}>{day_created}</span>
                <span className='entry__date__month'>{month_created}</span>

            </div>
            <div className='entry__content'>
                <h4 className='entry__content__title' style={{color: color}}>{title}</h4>
                <span className='entry__content__date'>{date_created}</span>
                <div className='entry__content__text ql-editor' 
                    dangerouslySetInnerHTML={{ __html: myText}}
                    >
                </div>
            </div>

            <div className='entry__button__box'>
                <button onClick={e => editEntry(e)} className='entry__button button__edit'>
                    <i className="fa-solid fa-pen" />
                </button>
                <button onClick={e => deleteEntry(e)} className='entry__button button__delete'>
                    <i className="fa-solid fa-trash" />
                </button>
            </div>

        </div>
        
    </div>                         
  )
}
