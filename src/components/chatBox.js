import React, { Component } from 'react';

class ChatBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            text : '',
            messages : []
        }
    }
    getMessage = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    sendMessage(){
        this.state.messages.push(this.state.text)
        this.setState({
            messages : this.state.messages,
            text : ''
        })
    }
    pressEnter = (event) => {
        if(event.key === "Enter"){
            this.sendMessage();
        }
    }
    render(){
        let displayMessages = this.state.messages.map((value,index)=>{
            return(
                <div key={index}>
                    <div className="row card">
                        <div className="col-12">
                            <span> {value} </span>
                        </div>
                    </div>
                </div>
            );
        })
        return(
            <div>
                <div className="chat-header">
                    <div className="row">
                        <div className="col-2">
                            <img className="chat-img" src="https://play-lh.googleusercontent.com/-MRKE1au0vLY/AAAAAAAAAAI/AAAAAAAABMg/AMZuuckzvQcVXN_S-ohf2_1hDAnHfAkswQ/photo.jpg"></img>
                        </div>
                        <div className="col-4 chat-header-font">
                            <b>Aswin Kumar</b>
                        </div>
                        <div className="col-4 offset-2">
                            <i class="fa fa-video-camera chat-icon" aria-hidden="true"></i>
                            <i class="fa fa-phone chat-icon" aria-hidden="true"></i>
                            <i class="fa fa-ellipsis-v chat-icon" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
                <div className="scroll-down">
                    {displayMessages}
                </div>
                <input autoFocus={true} className="text-box" type="text" value={this.state.text} onKeyPress={this.pressEnter} name="text" placeholder="Type a message" onChange={this.getMessage}></input>
                <i className="fa fa-paper-plane send-icon" aria-hidden="true" onClick={()=>this.sendMessage()}></i>
            </div>
        );
    }
}

export default ChatBox;