import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {supabase} from '../database/supabase';
import {useAuth} from '../components/Auth/Auth';


export default function NewEntryPage() {

  const navigateTo = useNavigate();

  const [mood, setMood] = useState(null);
  const [colorStyle, setColorStyle] = useState('');
  const [title, setTitle] = useState('');
  const [userEntry, setUserEntry] = useState('');
  const [tags, setTags] = useState([]);
  const [entryError, setEntryError] = useState('');

  const {user} = useAuth();


  //handle mood

  const saveMood = (e) => {
    e.preventDefault();
    const buttonClass = e.currentTarget.className;

    if (buttonClass === 'mood__button__amazing'){
        setMood('amazing');
        setColorStyle('#0CB1FF');
    }

    if (buttonClass === 'mood__button__good'){
      setMood('good');
      setColorStyle('#007DB8');
    }

    if (buttonClass === 'mood__button__meh'){
      setMood('meh');
      setColorStyle('#5C7B8A');
    }

    if (buttonClass === 'mood__button__bad'){
      setMood('bad');
      setColorStyle('#36505B');
    }
    
    if (buttonClass === 'mood__button__awful'){
      setMood('awful');
      setColorStyle('#282828');
    }
  }

  //handle title

  const handleTitleChange = (e) => {
    e.preventDefault();
    if (e.key === "Enter"){
      return
    }
    setTitle(e.target.value);
  }

  //handle text editor
  
  const  modules  = {
    toolbar: [
        [{ font: [] }],
        [{ size: []}],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script:  "sub" }, { script:  "super" }],
        [{ list:  "ordered" }, { list:  "bullet" }],
        [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
        ["link"],
        ["clean"],
    ],
  };

  //handle tags

	const removeTags = indexToRemove => {
		setTags([...tags.filter((_, index) => index !== indexToRemove)]);
	};

	const addTags = e => {
    e.preventDefault();
		if (e.target.value !== "") {
			setTags(prev => [...prev, e.target.value]);;		
		}
	};

  const clearInput = (e) => {
    e.target.value = "";
  }

  //handle date info
  const date = new Date ();
  let createdDate = date.toLocaleDateString();
  let dayNumber = date.getDate();

  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  let weekdayName = weekday[date.getDay()];

  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  let monthName = month[date.getMonth()];


  //saving entry
  const saveEntry = async (e) => {
    e.preventDefault();

    if (!mood){
      setEntryError('Choose your mood!');
    }else if (!title || !userEntry){
      setEntryError('Title and entry fields cannot be empty!');
    }else {
      setEntryError('');
      console.log(`mood: ${mood},
      title: ${title},
      entry: ${userEntry},
      tags: ${tags}
      userId: ${user.id},
      date: ${createdDate},
      `);

      try {
        const { data, error } = await supabase
        .from('UserEntries')
        .insert([
          { 
            user_id: user.id,
            mood: mood,
            title: title, 
            entry: userEntry,
            tags: tags,
            date_created: createdDate,
            day_created: dayNumber,
            week_day_created: weekdayName,
            month_created: monthName,
            color: colorStyle,
          },
        ]);

        if(data){
          console.log(data);
          navigateTo('/home/entries');
        }
        if(error){
          console.log(error);
        }

      }catch(error){
        console.log(`Błąd ${error}`);
      }
      

    }
   
  }



  

  return (
    <section className='new__entry'>
      <div className='container new__entry__container'>
        <div className='new__entry__box'>
          <div className='new__entry__box__content'>
            <h1 className='new__entry__title'>
              How are you feeling today?
            </h1>

            <div className='new__entry__mood__choice'>
              <p>What is your mood?</p>
              <ul className='new__entry__moods'>
                <li className='new__entry__mood'>
                  <button onClick={e => saveMood(e)} type='button' className='mood__button__amazing'
                  style={{backgroundColor: mood === 'amazing' && "#0CB1FF"}}>
                    {mood === 'amazing' ? 
                      (<i className="fa-regular fa-face-laugh emoji__clicked"/>) 
                      : 
                      (<i className="fa-regular fa-face-laugh emoji__amazing"/>) 
                    }
                  </button>
                  <span className='mood__descr'>amazing</span>
                </li>

                <li className='new__entry__mood'>
                  <button onClick={e => saveMood(e)} type='button' className='mood__button__good'
                  style={{backgroundColor: mood === 'good' && "#007DB8"}}>
                    {mood === 'good' ? 
                      (<i className="fa-regular fa-face-smile-wink emoji__clicked"/>) 
                      : 
                      (<i className="fa-regular fa-face-smile-wink emoji__good"/>) 
                    }
                  </button>
                  <span className='mood__descr'>good</span>
                </li>

                <li className='new__entry__mood'>
                  <button onClick={e => saveMood(e)} type='button' className='mood__button__meh'
                  style={{backgroundColor: mood === 'meh' && "#5C7B8A"}}>
                    {mood === 'meh' ? 
                      (<i className="fa-regular fa-face-meh emoji__clicked"/>) 
                      : 
                      (<i className="fa-regular fa-face-meh emoji__meh"/>) 
                    }
                  </button>
                  <span className='mood__descr'>meh</span>
                </li>

                <li className='new__entry__mood'> 
                <button onClick={e => saveMood(e)} type='button' className='mood__button__bad'
                style={{backgroundColor: mood === 'bad' && "#36505B"}}>
                   {mood === 'bad' ? 
                      (<i className="fa-regular fa-face-frown-open emoji__clicked"/>) 
                      : 
                      (<i className="fa-regular fa-face-frown-open emoji__bad"/>) 
                    }
                </button>
                  <span className='mood__descr'>bad</span>
                </li>

                <li className='new__entry__mood'>
                  <button onClick={e => saveMood(e)} type='button' className='mood__button__awful'
                  style={{backgroundColor: mood === 'awful' && "#282828"}}>
                    {mood === 'awful' ? 
                      (<i className="fa-regular fa-face-tired emoji__clicked"/>) 
                      : 
                      (<i className="fa-regular fa-face-tired emoji__awful"/>) 
                    }
                  </button>
                  <span className='mood__descr'>awful</span>
                </li>
              </ul>
            </div>

            <form className='new__entry__form' onSubmit={e => saveEntry(e)}>
              <span className='new__entry__form_title'>What's on your mind?</span>

              <TextField 
                id="outlined-basic" label="Title" 
                variant="outlined" margin='normal'
                size='small' sx={{width: '500px', backgroundColor: '#FFF'}}
                value={title} onChange={e => handleTitleChange(e)} type='text'
                onKeyPress={e => {
                  if (e.key === 'Enter') e.preventDefault();
                }}
              />

              <ReactQuill theme="snow" modules={modules} value={userEntry} 
              onChange={setUserEntry} placeholder='Write something...' 
              className='new__entry__editor' 
              />

              <div className='tags__input__container'>
                  {tags?.map((tag, index) => (
                    <div key={index} className="tag__single">
                      <span className='tag__title'>{tag}</span>
                      <span className='tag__icon-close' onClick={() => removeTags(index)}>
                        x
                      </span>
                    </div>
                  ))}
                <input type='text' className='tags__input' placeholder='Enter tags'
                onKeyDown={e => e.key === "Enter" ? addTags(e) : null} 
                onKeyUp={e => e.key === "Enter" ? clearInput(e): null}/>
              </div>

              {entryError && <div className='new__entry__error'><p>{entryError}</p></div>}

              <button type='submit' className='new__entry__form__button'>Save</button>
            </form>
            
          </div>
        </div>
      </div>

    </section>
  )
}
