import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import WebGLMain from "./Controllers/WebGLController/WebGLMain";


function App() {
  return (
    <Router>
        <div style={{width:"100%", height:"100%"}}>
            <Route exact path="/" component={BrickBuilder}/>
        </div>
    </Router>
  );


  function BrickBuilder(){
      return <WebGLMain  red={0.3} blue={0.3} green={0.3} alpha={1.0} style={{width:"100%", height:"100%"}}/>
  }

}

export default App;
