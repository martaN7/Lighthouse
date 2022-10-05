import React from 'react';
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';

export default function SingleEntryPage() {
  return (
    <section className='display__entry'>
        <div className='container'>
            <div className='display__entry__box'>
                <div className='display__entry__box__content'>
                    <div className='display__entry__header'>
                        <span className='display__entry__date'>Sunday, 11 March 2022</span>
                        <div className='display__button__amazing'>
                            <i className="fa-regular fa-face-laugh display__emoji__amazing"></i>
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
                        <h4 className='display__entry__title'>Lorem ipsum</h4>
                        <div className='display__entry__text'>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, odio. Voluptatem consectetur eos blanditiis, dolorem voluptatum sequi maxime quidem nisi molestiae voluptates unde aperiam hic animi repudiandae, doloribus adipisci dignissimos expedita temporibus reprehenderit enim odit. Iusto aperiam at consequatur provident possimus tempora eaque adipisci quisquam! Accusantium quae, doloremque perspiciatis possimus sed porro soluta ad voluptates veniam quasi impedit excepturi velit perferendis labore amet nisi vitae quidem ducimus repudiandae modi. Architecto facilis eligendi doloremque amet minima beatae nihil quibusdam esse exercitationem sapiente corrupti, fugiat veritatis eius! Ex eum, repellat a veniam perspiciatis eos maxime asperiores doloribus voluptas recusandae alias optio aspernatur aliquid illum porro vel quisquam est dicta distinctio hic rerum magni. Modi saepe nulla voluptate architecto dolore quidem ullam reprehenderit placeat quisquam optio eligendi sed, quas, dicta maxime itaque, dolorem totam. Doloribus, cum dicta dolorum dolorem maxime, quaerat nostrum et accusantium sapiente inventore doloremque nisi nam vel reprehenderit fuga aspernatur.</p>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit, nulla! Provident dicta quisquam amet molestias. Sed alias placeat aliquid similique!</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. In excepturi dolor qui! Ipsam voluptates eius repudiandae ipsa laborum voluptatem cupiditate eveniet laboriosam perspiciatis temporibus obcaecati, ad assumenda. Illum eius, nemo sed adipisci beatae dolorum provident expedita impedit, assumenda veritatis nostrum.</p>
                        </div>

                    </div>

                    <div className='display__entry__footer'>
                        <TextField 
                        id="outlined-basic" label="Tags" 
                        variant="outlined" margin='normal'
                        size='small' sx={{width: '500px', backgroundColor: '#FBF8F3'}}
                        />
                        <span className='display__entry__edit-date'>Last edited: 11/03/2022</span>

                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
