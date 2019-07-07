import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
import FrontPage from './Components/FrontPage';
import WebGLMain from "./Controllers/WebGLController/WebGLMain";


function App() {
  /*const frontPage = <FrontPage/>;
  ReactDOM.render(
      frontPage,
      document.getElementById('root')
  );*/
  console.log("Rendering App");
  return (
    <Router>
        <div style={{width:"100%", height:"100%"}}>
            <Route exact path="/" component={Home}/>
            <Route exact path="/BrickBuilder" component={BrickBuilder}/>
        </div>
    </Router>
  );

  function Home(){
      return <FrontPage/>;
  }

  function BrickBuilder(){
      return <WebGLMain style={{width:"100%", height:"100%"}}/>
  }

}

export default App;
