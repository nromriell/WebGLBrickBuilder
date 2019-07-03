import React from 'react';

class FrontPageCell extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        window.location.href = this.props.link;
    }

    render () {
        return (
            <button style={{margin: "auto", textAlign:"center", width:"50%", paddingTop: "50%"}} onClick={this.handleClick}>
                <div style={{margin: "auto", textAlign:"center", marginTop:"-50%", width:"100%"}}>Test</div>
            </button>
        );
    }
}

export default FrontPageCell;