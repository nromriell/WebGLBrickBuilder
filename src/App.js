import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import FrontPage from './Components/FrontPage';
import AboutMe from './Components/AboutMe';
import ProfessionalProjects from './Components/ProfessionalProjects';
import BasicAlgorithms from './Components/BasicAlgorithms';
import WebGLMain from "./Controllers/WebGLController/WebGLMain";


function App() {
  /*const frontPage = <FrontPage/>;
  ReactDOM.render(
      frontPage,
      document.getElementById('root')
  );*/
  //console.log("Rendering App");
  return (
    <Router>
        <div style={{width:"100%", height:"100%"}}>
            <Route exact path="/" component={Home}/>
            <Route exact path="/BrickBuilder" component={BrickBuilder}/>
            <Route exact path="/About" component={About}/>
            <Route exact path="/ProfessionalProjects" component={MyProfessionalProjects}/>
            <Route exact path="/Algorithms" component={Algorithms}/>
        </div>
    </Router>
  );

  function Home(){
      return <FrontPage/>;
  }

  function BrickBuilder(){
      return <WebGLMain  red={0.3} blue={0.3} green={0.3} alpha={1.0} style={{width:"100%", height:"100%"}}/>
  }
  
  function About(){
      return <AboutMe/>
  }
  
  function MyProfessionalProjects(){
      return <ProfessionalProjects/>
  }
  
  function Algorithms() {
      return <BasicAlgorithms/>
  }

}

export default App;
