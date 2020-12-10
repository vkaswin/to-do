import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import * as messages from '../redux/action/action'

class ChatBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            sendDetails : {
                text : '',
                author : '',
                sendTo : '',
                time : ''
            }
        }
    }
    getMessage = (event) => {
        let creadtedAt = new Date();
        let hours = creadtedAt.getHours();
        let minutes = creadtedAt.getMinutes();
        let data = {...this.state.sendDetails, text : event.target.value, author : this.props.currentUser, sendTo : this.props.chatBoxHeader.fullName, time : hours+ ':' +minutes }
        this.setState({
            sendDetails : data
        })
    }
    sendMessage(){
        let clear = {...this.state.sendDetails, text : '', author : '', sendTo : ''}
        this.props.actions.messages(this.state.sendDetails)
        this.setState({
            sendDetails : clear
        })
    }
    pressEnter = (event) => {
        if(event.key === "Enter"){
            this.sendMessage();
        }
    }
    render(){
        let displayMessages = this.props.chatLog.filter((value)=>{
            return value.author === this.props.currentUser  && value.sendTo === this.props.chatBoxHeader.fullName || value.author === this.props.chatBoxHeader.fullName  && value.sendTo === this.props.currentUser;
        }).map((value,index)=>{
            return(
                <div key={index}>
                    <div className={this.props.currentUser === value.author ? "row active-card" : "row card"}>
                        <div className="view">
                            <span> {value.text} </span>
                            <span className="time"> {value.time} </span>
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
                            <img className="chat-img" src={this.props.chatBoxHeader.img}></img>
                        </div>
                        <div className="col-4 chat-header-font">
                            <b> {this.props.chatBoxHeader.fullName} </b>
                        </div>
                        <div className="col-4 offset-2">
                            <i className="fa fa-video-camera chat-icon" aria-hidden="true"></i>
                            <i className="fa fa-phone chat-icon" aria-hidden="true"></i>
                            <i className="fa fa-ellipsis-v chat-icon" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
                <div className="scroll-down">
                    {displayMessages}
                </div>
                <input autoFocus={true} className="text-box" type="text" value={this.state.sendDetails.text} onKeyPress={this.pressEnter} name="text" placeholder="Type a message" onChange={this.getMessage}></input>
                <i className="fa fa-paper-plane send-icon" aria-hidden="true" onClick={()=>this.sendMessage()}></i>
            </div>
        );
    }
}

function mapStateToProps(state){
    console.log(state)
    return{
        chatLog : state.reducer.chatLog
    }
}

function mapDispatchToProps(dispatch){
    return{
        actions: bindActionCreators(messages,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ChatBox);