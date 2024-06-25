import React, { useState, useEffect } from 'react'
import '../css/NewHome.css'
import dividerDesktop from '../assets/images/pattern-divider-desktop.svg';
import dice from '../assets/images/icon-dice.svg';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

const NewHome = () => {
    const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.adviceslip.com/advice');
        const fetchedData = {
          text: response.data.slip.advice,
          number: `ADVICE #${counter}`
        };
        setData([fetchedData]); // Since the API returns one advice at a time, we wrap it in an array.
        setCurrentData(fetchedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [counter]);

  const changeText = async () => {
    try {
      const response = await axios.get('https://api.adviceslip.com/advice');
      const newData = {
        text: response.data.slip.advice,
        number: `Advice ${counter + 1}`
      };
      setCurrentData(newData);
      setCounter(counter + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
        <Spinner animation="border" variant="primary" />
    </div>;
  }
  return (
    <div className='container'>
        <div className="card">
            <div className="card__content">
                <div className="advice_id">
                    <h3>{currentData.number}</h3>
                </div>
                <div className="advice_content">
                    <p>{currentData.text}</p>
                </div>
                <div className="divider">
                    <img src={dividerDesktop} alt="" />
                </div>
                <div className="dice_container" onClick={changeText}>
                    <div className="dice_icon">

                    <img src={dice} alt="" />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NewHome