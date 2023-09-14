import { useState, useEffect } from 'react';

const THIRTY_SECONDS = 30000;

const DisplayPrometheusMetrics = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState(null);

  const handleRefresh = () => {
    setIsLoading(true);
    fetch('http://localhost:3001/metrics', {
      headers: {
        Authorization: 'mysecrettoken',
      },
    })
      .then((response) => response.text())
      .then((data) => {
        setMetrics(data);
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
    <div className='flex flex-1 bg-neutral-200 overflow-x-auto overflow-y-auto'>
      {isLoading ? (
        <div className='flex h-full w-full items-center justify-center bg-neutral-200'>
          Loading
        </div>
      ) : (
        <code>{metrics}</code>
      )}
    </div>
  );
};

export default DisplayPrometheusMetrics;
