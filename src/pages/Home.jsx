import React, { useState, useEffect } from 'react';
import dividerDesktop from '../assets/images/pattern-divider-desktop.svg';
import dice from '../assets/images/icon-dice.svg';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

const Home = () => {
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
          number: `Advice #${counter}`
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
    <div className="bg-[--DarkBlue] h-[100vh] flex justify-center items-center">
      <div className="bg-[--DarkGrayishBlue] w-[90%] h-[55%] xl:h-[35%] xl:w-[30%] rounded-lg">
        <div className="flex justify-center flex-col gap-3 items-center">
          <h3 className="text-[--NeonGreen] mt-8 font-[Monrope]">{currentData.number}</h3>

          <div className="p-4 flex justify-center">
            <p className="xl:text-[28px] text-[26px] w-[95%] text-center font-extrabold text-[--LightCyan]">{currentData.text}</p>
          </div>

          <div className="xl:mt-4 mt-6 w-[90%] xl:flex xl:justify-center absolute bottom-[200px] md:bottom-[-25px] lg:bottom-[350px]">
            <img src={dividerDesktop} alt="" />
          </div>

          <div className="xl:mt-4 mt-6 cursor-pointer bg-[--NeonGreen] h-[50px] w-[50px] flex justify-center items-center rounded-full absolute bottom-[130px] md:bottom-[-25px] lg:bottom-[280px]" 
          onClick={changeText}
          
        //   style={{ position: 'absolute', bottom: '275px' }}
          
          >
            <img src={dice} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
