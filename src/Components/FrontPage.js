import FrontPageCell from "./FrontPageCell"
import React from "react";
import MenuBar from "./MenuBar";

var testData = [["Title 1", "https://storage.googleapis.com/gd-wagtail-prod-assets/original_images/evolving_google_identity_inline_002.gif", "https://www.google.com", 0],
    ["Title 2", "https://storage.googleapis.com/gd-wagtail-prod-assets/original_images/evolving_google_identity_inline_002.gif", "https://www.google.com", 1],
    ["Title 3", "https://storage.googleapis.com/gd-wagtail-prod-assets/original_images/evolving_google_identity_inline_002.gif", "https://www.google.com", 2],
    ["Title 4", "https://storage.googleapis.com/gd-wagtail-prod-assets/original_images/evolving_google_identity_inline_002.gif", "https://www.google.com"], 3];


const FrontPage = () => {

    return (
        <div id="FrontPage">
            <MenuBar/>
            {(testData).map(data =>
            <FrontPageCell title={data[0]} image={data[1]} link={data[2]}/>)}
        </div>
    )
};

export default FrontPage;