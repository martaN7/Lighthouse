import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/Auth/Auth';
import { supabase } from '../database/supabase';


export default function StatsPage() {

  const {user} = useAuth();
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');

  const [userEntries, setUserEntries] = useState([]);

  const [entriesNumber, setEntriesNumber] = useState(null);
  const [currentMonth, setCurrentMonth] = useState('');
  const [currentMonthEntries, setCurrentMonthEntries] = useState([]);
  const [amazingEntries, setAmazingEntries] = useState('');
  const [goodEntries, setGoodEntries] = useState('');
  const [mehEntries, setMehEntries] = useState('');
  const [badEntries, setBadEntries] = useState('');
  const [awfulEntries, setAwfulEntries] = useState('');
  

  useEffect(() => {
      const fetchEntries = async () => {

        try {
          setLoading(true);
          let { data: UserEntries, error } = await supabase
          .from('UserEntries')
          .select("*")
          .eq('user_id', user.id);
      
          if (error){
              console.log(error);
              setFetchError('Could not fetch the data');
          }
          if(UserEntries){
              setFetchError('');
              setUserEntries(UserEntries);
              setEntriesNumber(UserEntries.length);

              const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
              let d = new Date();
              let currentYear = d.getFullYear();
              let currentMonthName = month[d.getMonth()];
              setCurrentMonth(currentMonthName);

                let entries = UserEntries.filter(entry => {
                  return  entry.created_at.includes(currentYear)
                }).filter(entry => {
                  return entry.month_created === currentMonthName
                });

                setCurrentMonthEntries(entries);



              setAmazingEntries(entries.filter(entry => {
                return entry.mood === 'amazing'
              }).length);
          
              setGoodEntries(entries.filter(entry => {
                  return entry.mood === 'good'
                }).length);
          
              setMehEntries(entries.filter(entry => {
                  return entry.mood === 'meh'
                }).length);
          
              setBadEntries(entries.filter(entry => {
                  return entry.mood === 'bad'
                }).length);
          
              setAwfulEntries(entries.filter(entry => {
                  return entry.mood === 'awful'
                }).length);

          }

        }catch(error){
          setFetchError('Could not fetch the data');
          console.log(error);

        }finally{
          setLoading(false);


        }
      }

      fetchEntries();

  }, []);


  return (
    <div className='stats__page'>
      <div className='container stats__container'>
          <h1 className='stats__page__title'>Your statistics</h1>
          {loading && <p>Fetching your data</p>}
          {fetchError && <div className='new__entry__error'><p>{fetchError}</p></div>}

          <div className='stats__total__entries'>
            <p className='stats__total__title'>Total entries:</p>
            {entriesNumber && <p className='stats__total__number'>{entriesNumber}</p>}
          </div>

          <div className='stats__mood__stats'>
            <p className='stats__mood__stats__title'>Your entries in {currentMonth}</p>

            <div className='stats__mood__boxes'>

              <div className='stats__mood__box stats__mood__amazing'>
                <div className='stats__mood__container'>
                    <i className="fa-regular fa-face-laugh" />
                    <p className='mood__descr'>amazing</p>
                </div>
                <div className='stats__mood__number'>{amazingEntries}</div>
              </div>

              <div className='stats__mood__box stats__mood__good'>
                <div className='stats__mood__container'>
                    <i className="fa-regular fa-face-smile-wink"/>
                    <p className='mood__descr'>good</p>
                </div>
                <div className='stats__mood__number'>{goodEntries}</div>
              </div>

              <div className='stats__mood__box stats__mood__meh'>
                <div className='stats__mood__container'>
                    <i className="fa-regular fa-face-meh"/>
                    <p className='mood__descr'>meh</p>
                </div>
                <div className='stats__mood__number'>{mehEntries}</div>
              </div>

              <div className='stats__mood__box stats__mood__bad'>
                <div className='stats__mood__container'>
                    <i className="fa-regular fa-face-frown-open"/>
                    <p className='mood__descr'>bad</p>
                </div>
                <div className='stats__mood__number'>{badEntries}</div>
              </div>

              <div className='stats__mood__box stats__mood__awful'>
                <div className='stats__mood__container'>
                    <i className="fa-regular fa-face-tired"/>
                    <p className='mood__descr'>awful</p>
                </div>
                <div className='stats__mood__number'>{awfulEntries}</div>
              </div>
              

            </div>
          </div>

        </div>
    </div>
  )
}
