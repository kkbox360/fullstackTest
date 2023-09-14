import logo from './logo.svg';
import './App.css';

import DisplayTime from './component/DisplayTime';
import DisplayPrometheusMetrics from './component/DisplayPrometheusMetrics';

function App() {
  return (
    <div className='flex flex-row h-full w-full'>
      <DisplayTime />
      <DisplayPrometheusMetrics />
    </div>
  );
}

export default App;
