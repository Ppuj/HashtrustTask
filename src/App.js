import './App.css';
import Form from './components/Form'
import ShowData from './components/ShowData';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import startBirthdayService from './utils/birthdayService';


function App() {
  useEffect(() => {
    startBirthdayService();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/show-data" element={<ShowData />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
