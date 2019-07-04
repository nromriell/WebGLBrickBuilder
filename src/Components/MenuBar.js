import React from 'react';
import MenuBarIcon from '../MenuBarIcon.png'
import MenuItem from "./MenuItem";

const testMenu = ["Menu Item 1", "Menu item 2", "Menu Item 3", "Menu Item 4"];

class MenuBar extends React.Component {

    constructor(props){
        super(props);

        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onMouseClick = this.onMouseClick.bind(this);
        this.active = false;
    }

    onMouseOver(){
        this.active = true;
        this.forceUpdate();
    }

    onMouseClick(){
        if(this.active){
            this.onMouseLeave();
        }else{
            this.onMouseOver();
        }
    }

    onMouseLeave(){
       // this.active = false;
        //this.forceUpdate();
    }

    render () {
        return (
            <div className="MenuBar" style={{
                width: "30px",
                height: "20px",
                margin: "20px",
                position: "fixed",
                backgroundImage: `url(${MenuBarIcon})`,
                backgroundColor: "#ffffff00",
                backgroundPosition: 'center',
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat'
            }} onMouseOver={this.onMouseOver} onMouseEnter={this.onMouseOver} onMouseLeave={this.onMouseLeave} onClick={this.onMouseClick}>
                <div style={{marginTop:"40px"}}>
                {(testMenu.map(title =>
                    <MenuItem height={this.active ? "50px" : "0px"} title={this.active ? title : ""}/>
                ))}
                </div>
            </div>
        )
    }
}

export default MenuBar;