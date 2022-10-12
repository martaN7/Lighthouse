import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../database/supabase';
import { TextField } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export default function EditEntryPage() {

  const navigateTo = useNavigate();

  const {id} = useParams();

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [userEntry, setUserEntry] = useState('');
  const [tags, setTags] = useState([]);
  const [mood, setMood] = useState('');
  const [colorStyle, setColorStyle] = useState('');
  const [entryError, setEntryError] = useState('');


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
              throw error;
              navigateTo('/home/entries', {replace: true});
            }

            if(data){
                setMood(data.mood);
                setTitle(data.title);
                setUserEntry(data.entry);
                setTags(data.tags);
            }

        } catch (error) {
            throw error;

        } finally {
            setLoading(false);
        }

    }
    fetchEntry();

}, [id, navigateTo]);

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
  
  //handle editor
  const  modules  = {
    toolbar: [
        [{ font: [] }],
        [{ size: []}],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script:  "sub" }, { script:  "super" }],
        ["blockquote", "code-block"],
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
      if(tags === null){
        setTags([e.target.value]);
      }else {
        setTags(prev => [...prev, e.target.value]);	
      }
		}
	};

  const clearInput = (e) => {
    e.target.value = "";
  }

  //updating entry

  const updateEntry = async (e) => {
    e.preventDefault();

    if (!mood){
      setEntryError('Choose your mood!');
      return
    }
    if (!title || !userEntry){
      setEntryError('Title and entry fields cannot be empty!');
      return
    }

    try {
      const { data, error } = await supabase
      .from('UserEntries')
      .update({ mood, title, entry: userEntry, tags, color: colorStyle})
      .eq('id', id);

      if (data) {
        console.log(data);
        setEntryError('');
        navigateTo('/home/entries');
      }

      if (error) {
        console.log(error);
        setEntryError('Problem updating entry');
      }

    } catch (error) {
      console.log(error);
      setEntryError('Problem updating entry');
    }    
}

  return (
    <section className='edit__entry'>
      <div className='container edit__entry__container'>
        <div className='edit__entry__box'>
          <div className='edit__entry__box__content'>
          {loading ? (<p className='display__entry__prompt'>Fetching your entry...</p>) : (
            <h1 className='edit__entry__title'>
              Edit your entry
            </h1>)}

            <div className='edit__entry__mood__choice'>
              <p>What is your mood?</p>
              <ul className='edit__entry__moods'>

                <li className='edit__entry__mood'>
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

                <li className='edit__entry__mood'>
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

                <li className='edit__entry__mood'>
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

                <li className='edit__entry__mood'> 
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

                <li className='edit__entry__mood'>
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

            <form className='edit__entry__form'>
              <span>What's on your mind?</span>

              <TextField 
                id="outlined-basic" helperText ='Edit title' 
                variant="outlined" margin='normal'
                size='small' sx={{width: '500px', backgroundColor: '#FFF'}}
                value={title} onChange={e => handleTitleChange(e)}
              />

              <ReactQuill theme="snow" modules={modules} value={userEntry} 
              onChange={setUserEntry} className='new__entry__editor' 
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

              <button onClick={e => updateEntry(e)} type='submit' className='edit__entry__form__button'>Save</button>
            </form>
            
          </div>
        </div>
      </div>
    </section>
  )
}
