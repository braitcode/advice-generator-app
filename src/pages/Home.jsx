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
    <div className="bg-[--DarkBlue] h-[100vh] flex justify-center px-2 items-center xl:px-0">
      <div className="bg-[--DarkGrayishBlue] max-w-[500px] h-[400px] relative rounded-lg p-2 px-8">
        <div className="flex justify-center flex-col gap-3 items-center">
          <h3 className="text-[--NeonGreen] mt-6 font-[Monrope] md:text-[28px]">{currentData.number}</h3>

          <div className="p-4 flex justify-center">
            <p className="xl:text-[26px] text-[24px] md:text-[20px] w-[95%] text-center font-extrabold text-[--LightCyan]">{currentData.text}</p>
          </div>

          <div className=" flex items-center w-[90%] justify-center mb-2 absolute bottom-14">
            <img src={dividerDesktop} alt="" />
          </div>

          <div className="dice_icon flex items-center justify-center absolute -bottom-5" 
          onClick={changeText}
          >
            <button className="hover:shadow-glow  bg-glow p-3 rounded-full cursor-pointer">
            <img src={dice} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
