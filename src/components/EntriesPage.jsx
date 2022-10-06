import React from 'react';
import { Link } from 'react-router-dom';

export default function EntriesPage() {


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

                    <div className='hover__container'>
                        <div className='entry__single'>
                            <div className='entry__date'>
                                <span className='entry__date__weekday'>Sun</span>
                                <span className='entry__date__day'>11</span>
                                <span className='entry__date__month'>March</span>

                            </div>
                            <div className='entry__content'>
                                <h4 className='entry__content__title'>Lorem ipsum</h4>
                                <span className='entry__content__date'>11/03/2022</span>
                                <p className='entry__content__text'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe ipsam itaque vel ad eaque modi nesciunt nemo, libero illum accusantium eligendi animi ex deleniti voluptate consequuntur odit, ratione assumenda numquam commodi aut accusamus similique omnis recusandae! Aliquid tenetur placeat officiis.</p>
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

                    <div className='hover__container'>
                        <div className='entry__single'>
                            <div className='entry__date'>
                                <span className='entry__date__weekday'>Sun</span>
                                <span className='entry__date__day'>11</span>
                                <span className='entry__date__month'>March</span>

                            </div>
                            <div className='entry__content'>
                                <h4 className='entry__content__title'>Lorem ipsum</h4>
                                <span className='entry__content__date'>11/03/2022</span>
                                <p className='entry__content__text'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe ipsam itaque vel ad eaque modi nesciunt nemo, libero illum accusantium eligendi animi ex deleniti voluptate consequuntur odit, ratione assumenda numquam commodi aut accusamus similique omnis recusandae! Aliquid tenetur placeat officiis.</p>
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

                   

                    

                    
                </div>
            </div>
        </div>
    </section>
    </>
  )
}
