import React from 'react';

class FrontPageCell extends React.Component {
    constructor(props){
        super(props);
        this.fgColor="#999999";
        this.handleClick = this.handleClick.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    handleMouseEnter(){
        this.fgColor="#ffffff";
        this.forceUpdate();
    }

    handleMouseLeave(){
        this.fgColor="#999999";
        this.forceUpdate();
    }

    handleClick(){
        window.location.assign(this.props.link);
    }

    render () {
        return (
            <button style={{margin: "auto", textAlign:"center", width:"50%", paddingTop: "50%", backgroundColor:this.fgColor, backgroundImage:this.props.image, backgroundPosition:"center", backgroundRepeat:"no-repeat", backgroundSize:"cover"}} onClick={this.handleClick} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                <div style={{margin: "auto", textAlign:"center", marginTop:"-50%", width:"100%"}}>Test</div>
            </button>
        );
    }
}

export default FrontPageCell;