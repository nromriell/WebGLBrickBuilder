import React from 'react';

class MenuItem extends React.Component {

    constructor(props){
        super(props);

        this.backgroundColor = "#22222208";
        this.textColor = "#000000";
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    onMouseOver(){
        this.backgroundColor = "#222222ff";
        this.textColor = "#ffffff";
        this.forceUpdate();
    }

    onMouseLeave(){
        this.backgroundColor = "#22222208";
        this.textColor = "#000000";
        this.forceUpdate();
    }

    render() {
        return (
            <div className="MenuItem" style={{width: "100px", height: this.props.height, margin: "0px",
                position: "relative", backgroundColor: this.backgroundColor, color: this.textColor}} onMouseEnter={this.onMouseOver} onMouseLeave={this.onMouseLeave}>{this.props.title}</div>
        )
    }
}

export default MenuItem;