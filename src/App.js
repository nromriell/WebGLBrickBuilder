import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import FrontPage from './Components/FrontPage';


function App() {
  const frontPage = <FrontPage/>;
  ReactDOM.render(
      frontPage,
      document.getElementById('root')
  );
  return (
    <div className="App">
      <header className="App-header">

      </header>
    </div>
  );
}

export default App;
