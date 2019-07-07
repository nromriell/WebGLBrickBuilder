import FrontPageCell from "./FrontPageCell"
import React from "react";
import MenuBar from "./MenuBar";
import WebGLMain from "../Controllers/WebGLController/WebGLMain";
import BlockEditor from '../Images/BlockEditor.png'

var testData = [["Title 1", `url(${BlockEditor})`, "/BrickBuilder", 0],
    ["Title 2", "https://storage.googleapis.com/gd-wagtail-prod-assets/original_images/evolving_google_identity_inline_002.gif", "https://www.google.com", 1],
    ["Title 3", "https://storage.googleapis.com/gd-wagtail-prod-assets/original_images/evolving_google_identity_inline_002.gif", "https://www.google.com", 2],
    ["Title 4", "https://storage.googleapis.com/gd-wagtail-prod-assets/original_images/evolving_google_identity_inline_002.gif", "https://www.google.com"], 3];


class FrontPage extends React.Component {

   /* return (
        <div id="FrontPage">
            <MenuBar/>
            {(testData).map(data =>
            <FrontPageCell title={data[0]} image={data[1]} link={data[2]}/>)}
        </div>
    )*/
   render () {
       /*this.webGLMain = <WebGLMain red={0.3} blue={0.3} green={0.3} alpha={1.0}/>;
       return this.webGLMain;*/
       return (
           <div id="FrontPage">
               <MenuBar/>
               {(testData).map(data =>
                   <FrontPageCell title={data[0]} image={data[1]} link={data[2]}/>)}
           </div>
       )
   }
}

export default FrontPage;