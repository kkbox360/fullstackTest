import { useState, useEffect } from 'react';

const THIRTY_SECONDS = 30000;

const converSeconds = (seconds) => {
  const date = new Date(null);
  date.setSeconds(seconds);
  return date.toISOString().slice(11, 19);
};

const DisplayTime = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverTime, setServerTime] = useState(null);
  const [clientTime, setClientTime] = useState(null);
  const [diffTime, setDiffTime] = useState(null);
  let countingInterval = null;

  const handleRefresh = () => {
    clearInterval(countingInterval);
    setIsLoading(true);
    let now = Math.floor(Date.now() / 1000);
    setClientTime(now);
    fetch('http://localhost:3001/time', {
      headers: {
        Authorization: 'mysecrettoken',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setServerTime(data.epoch);
        setDiffTime(data.epoch - now);
        countingInterval = setInterval(() => {
          setDiffTime((diffTime) => diffTime + 1);
        }, 1000);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    handleRefresh();
    const interval = setInterval(handleRefresh, THIRTY_SECONDS);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex flex-1 flex-col items-center justify-center bg-neutral-300'>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <>
          <p>Server Time: {serverTime}</p>
          <p>Client Time: {clientTime}</p>
          <p>Difference Time: {converSeconds(diffTime)}</p>
        </>
      )}
    </div>
  );
};

export default DisplayTime;
