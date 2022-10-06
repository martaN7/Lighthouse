import React, {useState} from 'react';
import { TextField } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export default function NewEntryPage() {

  const [value, setValue] = useState('');
  
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
                  <button type='button' className='mood__button__amazing'>
                    <i className="fa-regular fa-face-laugh emoji__amazing"></i>
                  </button>
                  <span className='mood__descr'>amazing</span>
                </li>
                <li className='new__entry__mood'>
                  <button type='button' className='mood__button__good'>
                    <i className="fa-regular fa-face-smile-wink emoji__good"></i>
                  </button>
                  <span className='mood__descr'>good</span>
                </li>
                <li className='new__entry__mood'>
                  <button type='button' className='mood__button__meh'>
                  <i className="fa-regular fa-face-meh emoji__meh"></i>
                  </button>
                  <span className='mood__descr'>meh</span>
                </li>
                <li className='new__entry__mood'> 
                <button type='button' className='mood__button__bad'>
                  <i className="fa-regular fa-face-frown-open emoji__bad"></i>
                </button>
                  <span className='mood__descr'>bad</span>

                </li>
                <li className='new__entry__mood'>
                  <button type='button' className='mood__button__awful'>
                  <i className="fa-regular fa-face-tired emoji__awful"></i>
                  </button>
                  <span className='mood__descr'>awful</span>
                </li>
              </ul>
            </div>

            <form className='new__entry__form'>
              <span className='new__entry__form_title'>What's on your mind?</span>

              <TextField 
                id="outlined-basic" label="Title" 
                variant="outlined" margin='normal'
                size='small' sx={{width: '500px', backgroundColor: '#FBF8F3'}}
              />

              <ReactQuill theme="snow" modules={modules} value={value} 
              onChange={setValue} placeholder='Write something...' 
              className='editor' 
              />

              <TextField 
                id="outlined-basic" label="Tags" 
                variant="outlined" margin='normal'
                size='small' sx={{width: '500px', backgroundColor: '#FBF8F3'}}
              />

              <button type='button' className='new__entry__form__button'>Save</button>
            </form>
          </div>
        </div>
      </div>

    </section>
  )
}
