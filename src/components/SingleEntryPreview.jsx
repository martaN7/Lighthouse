import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { useScrollTrigger } from '@mui/material';


export default function SingleEntryPreview({entryData}) {


    const {mood, title, entry, tags, date_created, id, day_created, week_day_created, month_created, color} = entryData;
    const myText = entry.replace(/<[^>]+>/g, '').slice(0,300);

    const navigateTo = useNavigate();


    const displayEntry = () => {
        navigateTo('/home/entry/' + id);
    }

  return (
    <div className='hover__container' onClick={displayEntry}>
        <div className='entry__single'>
            <div className='entry__date'>
                <span className='entry__date__weekday'>{week_day_created.slice(0,3)}</span>
                <span className='entry__date__day' style={{color: color}}>{day_created}</span>
                <span className='entry__date__month'>{month_created}</span>

            </div>
            <div className='entry__content'>
                <h4 className='entry__content__title' style={{color: color}}>{title}</h4>
                <span className='entry__content__date'>{date_created}</span>
                <div className='display__entry ql-editor entry__content__text' 
                    dangerouslySetInnerHTML={{ __html: myText}}
                    >
                </div>
            </div>
            <div className='entry__button__box'>
                <Link to="/home/edit-entry" className='entry__button button__edit'>
                    <i className="fa-solid fa-pen"></i>
                </Link>
                <button className='entry__button button__delete'>
                    <i className="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
    </div>                         
  )
}
