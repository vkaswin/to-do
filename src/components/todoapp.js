import React, { Component } from 'react';

import 'font-awesome/css/font-awesome.min.css';

class ToDoApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactDetail : [
                {
                    fullName : 'Aswin Kumar',
                    email : 'vkaswin1998@gmail.com',
                    phone : '9094825474',
                    company : 'DoodleBlue',
                    position : 'Front-End Developer',
                    address : 'No.7/2, Sri Rangammal Street, Oldwashermenptet',
                    img : 'https://avatar.oxro.io/avatar.svg?name=John+Smith&background=6ab04c&color=000'
                }
            ],
            userDetail : {
                fullName : '',
                email : '',
                phone : '',
                company : '',
                position : '',
                address : '',
                img : ''
            },
            error : {
                fullName : false,
                email : false,
                phone : false,
                company : false,
                position : false,
                address : false
            },
            updateError : {
                fullName : false,
                email : false,
                phone : false,
                company : false,
                position : false,
                address : false
            },
            imgName: '',
            imgError: undefined,
            updateImgName : '',
            updateImgError : undefined,
            individualDetail : {
                fullName : 'Aswin Kumar',
                email : 'vkaswin1998@gmail.com',
                phone : '9094825474',
                company : 'DoodleBlue',
                position : 'Front-End Developer',
                address : 'No.7/2, Sri Rangammal Street, Oldwashermenptet',
                img : 'https://avatar.oxro.io/avatar.svg?name=John+Smith&background=6ab04c&color=000'
            },
            tempUserDetail: {
                fullName : '',
                email : '',
                phone : '',
                company : '',
                position : '',
                address : '',
                img : ''
            },
            currentUser : ''
        }
    }
    handleChange = (event) => {
        let data = {...this.state.userDetail,[event.target.name] : event.target.value}
        this.setState({
            userDetail : data
        })
    }
    onSave(){
        let emial = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        let number = /^\+?\d[\d -]{8,10}\d$/;
        let validate = {...this.state.error,
            fullName: this.state.userDetail.fullName == '' ? true : false,
            email: !emial.test(this.state.userDetail.email),
            phone: !number.test(this.state.userDetail.phone),
            company: this.state.userDetail.company == '' ? true : false,
            position: this.state.userDetail.position == '' ? true : false,
            address: this.state.userDetail.address == '' ? true : false
        }
        this.setState({
            error : validate,
            imgError : this.state.imgName == '' ? true : false
        })
        if(this.state.userDetail.fullName != '' && emial.test(this.state.userDetail.email) && number.test(this.state.userDetail.phone) && this.state.userDetail.company != '' && this.state.userDetail.position != '' && this.state.userDetail.address != '' && this.state.imgName != ''){
            this.state.contactDetail.push(this.state.userDetail);
            let clear = {...this.state.userDetail,
                fullName : '',
                email : '',
                phone : '',
                company : '',
                position : '',
                address : '',
                img : ''
            }
            this.setState({
                userDetail : clear,
                imgName: ''
            })
            alert('Contact details added successfully')
        }
    }
    getImage = (event) => {
        this.setState({
            imgName : event.target.files[0].name,
            imgError : false
        })  
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                let base64 = {...this.state.userDetail, img : e.target.result}
                this.setState({
                    userDetail : base64
                })
            };
            reader.readAsDataURL(event.target.files[0]);
          }
    }
    onDelete(index){
        this.state.contactDetail.splice(index,1);
        this.setState({
            contactDetail : this.state.contactDetail
        })
    }
    onEdit(value){
        this.state.tempUserDetail = value;
        this.setState({
            tempUserDetail : this.state.tempUserDetail
        })
    }
    onUpdate(index){
        let emial = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        let number = /^\+?\d[\d -]{8,10}\d$/;
        let validate = {...this.state.updateError,
            fullName: this.state.tempUserDetail.fullName == '' ? true : false,
            email: !emial.test(this.state.tempUserDetail.email),
            phone: !number.test(this.state.tempUserDetail.phone),
            company: this.state.tempUserDetail.company == '' ? true : false,
            position: this.state.tempUserDetail.position == '' ? true : false,
            address: this.state.tempUserDetail.address == '' ? true : false
        }
        this.setState({
            updateError : validate,
            updateImgError : this.state.updateImgName == '' ? true : false
        })
        if(this.state.tempUserDetail.fullName != '' && emial.test(this.state.tempUserDetail.email) && number.test(this.state.tempUserDetail.phone) && this.state.tempUserDetail.company != '' && this.state.tempUserDetail.position != '' && this.state.tempUserDetail.address != '' && this.state.updateImgName != ''){
            let update = this.state.contactDetail;
            update[index] = this.state.tempUserDetail;
            this.setState({
            contactDetail : update,
            error : validate,
            updateImgName : ''
            })
            alert('Contact details updated successfully')
            console.log(this.state.tempUserDetail)
            console.log(this.state.individualDetail)
        }
    }
    handleUpdate = (event) => {
        let update = {...this.state.tempUserDetail,[event.target.name] : event.target.value}
        this.setState({
            tempUserDetail : update
        })
    }
    updateImage = (event) => {
        this.setState({
            updateImgName : event.target.files[0].name,
            updateImgError : false
        })  
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                let base64 = {...this.state.tempUserDetail, img : e.target.result}
                this.setState({
                    tempUserDetail : base64
                })
            };
            reader.readAsDataURL(event.target.files[0]);
          }
    }
    clickUser(value){
        this.state.individualDetail = value;
        this.setState({
            individualDetail : this.state.individualDetail
        })
    }
    handleDropDown = (event) => {
        this.setState({
            currentUser : event.target.value
        }) 
    }
    render(){
        let contacts = this.state.contactDetail.map((value,index)=>{
            return(
                <div key={index}>
                    {this.state.currentUser != value.fullName &&               
                        <div className="row user">
                            <div className="col-2">
                                <input className="check" type="checkbox"></input>
                            </div>
                            <div className="col-5 content" onClick={()=>this.clickUser(value)}>
                                <div className="row">
                                    <div className="col-3">
                                        {/* <img className="img" src={require('../images/avatar.jpg')}></img> */}
                                        <img className="img" src={value.img}></img>
                                    </div>
                                    <div className="col-8">
                                        <b> {value.fullName} </b>
                                        <br></br>
                                        <span> {value.email} </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3 company">
                                <b> {value.company} </b>
                            </div>
                            <div className="col-1 edit-delete">
                                <i className="fa fa-pencil-square-o" onClick={()=>this.onEdit(this.state.contactDetail[index])} data-toggle="modal" data-target={"#myModal"+index.toString()} aria-hidden="true"></i>
                                <i className="fa fa-trash-o" onClick={()=>this.onDelete(index)} aria-hidden="true"></i>
                            </div>
                            <div className="col-1 chat">
                                <i className="fa fa-commenting-o" aria-hidden="true"></i>
                            </div>
                            <div id={"myModal"+index.toString()} className="modal fade" role="dialog">
                    <div className="modal-dialog">

                    <div className="modal-content">
                        <div className="center">
                            <b className="modal-head">Edit Contact</b>
                    </div>
                    <button type="button" className="close modal-head" data-dismiss="modal">&times;</button>
                    <div className="modal-body">
                    <div className="row">
                            <div className="col-4 offset-1">
                                <div className="modal-bottom">
                                    <b>Full Name:</b>
                                    <br></br>
                                    {this.state.updateError.fullName && <span className="error">Please enter full name</span>}
                                </div>
                                <div className="modal-bottom">
                                    <b>Email: </b>
                                    <br></br>
                                    {this.state.updateError.email && <span className="error">Please enter valid email</span>}
                                </div>
                                <div className="modal-bottom">
                                    <b>Phone: </b>
                                    <br></br>
                                    {this.state.updateError.phone && <span className="error">Please enter valid phone number</span>}
                                </div>
                                <div className="modal-bottom">
                                    <b>Company: </b>
                                    <br></br>
                                    {this.state.updateError.company && <span className="error">Please enter company name</span>}
                                </div>
                                <div className="modal-bottom">
                                    <b>Position: </b>
                                    <br></br>
                                    {this.state.updateError.position && <span className="error">Please enter position</span>}
                                </div>
                                <div className="modal-bottom">
                                    <b>Address: </b>
                                    <br></br>
                                    {this.state.updateError.address && <span className="error">Please enter your Address</span>}
                                </div>                             
                            </div>
                            <div className="col-7">
                                <input className="modal-input" value={this.state.tempUserDetail.fullName} name="fullName" onChange={this.handleUpdate} type="text" placeholder="Enter Full name"></input>
                                <br></br>
                                <input className="modal-input" value={this.state.tempUserDetail.email} name="email" onChange={this.handleUpdate} type="text" placeholder="Enter email"></input>
                                <br></br>
                                <input className="modal-input" value={this.state.tempUserDetail.phone} name="phone" onChange={this.handleUpdate} type="text" placeholder="Enter mobile number"></input>
                                <br></br>
                                <input className="modal-input" value={this.state.tempUserDetail.company} name="company" onChange={this.handleUpdate} type="text" placeholder="Enter company name"></input>
                                <br></br>
                                <input className="modal-input" value={this.state.tempUserDetail.position} name="position" onChange={this.handleUpdate} type="text" placeholder="Enter position"></input>
                                <br></br>
                                <textarea className="modal-input" value={this.state.tempUserDetail.address} name="address" onChange={this.handleUpdate} placeholder="Enter address"></textarea>
                                <br></br>
                            </div>
                            <div className="img-upload">
                                <b>Upload Profile Picture</b>
                                <br></br>
                                <label htmlFor="update-photo"><b>Upload</b></label>
                                <input type="file" id="update-photo" onChange={this.updateImage}></input>
                                {this.state.updateImgName != '' && <span style={{color:"green"}}> {this.state.updateImgName} </span>}
                                {this.state.updateImgError && <div style={{color:"red"}}><span>Please upload an image</span></div>}
                                <br></br>
                                <div className="btn">
                                    <button className="btn-cancel" data-dismiss="modal">Cancel</button>
                                    <button className="btn-save" onClick={()=>this.onUpdate(index)}>Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

            </div>}
            </div>
            );
        })
        return(
            <div className="scroll">
                <div className="row side-menu">
                    <div className="col-1">
                        <i className="fa fa-bars bar" aria-hidden="true"></i>
                        <i className="fa fa-home side-icon" aria-hidden="true"></i>
                        <i className="fa fa-user side-icon" aria-hidden="true"></i>
                        <i className="fa fa-file-text side-icon" aria-hidden="true"></i>
                        <i className="fa fa-clock-o side-icon" aria-hidden="true"></i>
                        <i className="fa fa-calendar side-icon" aria-hidden="true"></i> 
                    </div>
                </div>
                <div className="side-align">
                <div className="row head">
                    <div className="col-2 offset-1">
                        <i className="fa fa-search search-icon" aria-hidden="true"></i>
                    </div>
                    <div className="col-4 offset-5">
                        <div className="row">
                            <div className="col-2 offset-2">
                                <b>+ Add</b>
                            </div>
                            <div className="col-2">
                                <i className="fa fa-envelope-o" aria-hidden="true"></i>
                            </div>
                            <div className="col-4">
                                <select defaultValue="" className="dropdown" onChange={this.handleDropDown}>
                                    <option value="" disabled>Select User</option>
                                    {this.state.contactDetail.map((value,index)=>{
                                        return(
                                            <option key={index} value={value.fullName}> {value.fullName} </option>
                                        );
                                    })}  
                                </select>
                            </div>
                            <div className="col-2">
                                <i className="fa fa-bell-o" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="offset-1 col-11">
                        <hr></hr>
                    </div>
                </div>
                </div>
                <div className="row bottom address-align">
                    <div className="col-5 offset-1">
                        <div className="row">
                            <div className="col-1">
                                <i className="fa fa-address-book address" aria-hidden="true"></i>
                            </div>
                            <div className="col-8">
                                <b className="contact">Contacts</b>
                                <br></br>
                                <div className="welcome-position">
                                    <span className="font-small">Welcome to Contact Page</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-2">
                        <span>Sort by: </span>
                        <select className="dropdown">
                            <option>Date Created</option>
                        </select>
                    </div>
                </div>
                <div className="row bottom search-align">
                    <div className="col-3 offset-1">
                        <input className="search-box" type="text" placeholder="Search Contacts"></input>
                        <i className="fa fa-search search" aria-hidden="true"></i>
                    </div>
                    <div className="col-4">
                        <button className="add-product" data-toggle="modal" data-target="#myModal"><b>+ Add Contact</b></button>
                    </div>
                </div>
                <div className="row contact-list">
                    <div className="col-6 offset-1">
                        <div className="row category">
                            <div className="col-2">
                                    <b>+</b>
                                </div>
                                <div className="col-5">
                                    <b>Basic info</b>
                                </div>
                                <div className="col-5">
                                    <b>Company</b>
                                </div>
                        </div>
                    </div>
                </div>
                <div className="row contact-list">
                    <div className="col-6 offset-1">
                        {contacts}
                    </div>    
                    <div className="col-5">
                        <div className="user-detail">
                            <div className="img-align">
                                <img className="img-detail" src={this.state.individualDetail.img}></img>
                                <br></br>
                                <b> {this.state.individualDetail.fullName} </b>
                                <br></br>
                                <span className="font-small"> {this.state.individualDetail.position} @ {this.state.individualDetail.company} </span>
                            </div>
                            <div className="row individual-user">
                            <div className="col-4 offset-1">
                                <span>Full Name:</span>
                                <br></br>
                                <br></br>
                                <span>Email: </span>
                                <br></br>
                                <br></br>
                                <span>Phone: </span>
                                <br></br>
                                <br></br>
                                <span>Company: </span>
                                <br></br>
                                <br></br>
                                <span>Address: </span>
                            </div>
                            <div className="col-7 ">
                                <b> {this.state.individualDetail.fullName} </b>
                                <br></br>
                                <br></br>
                                <b> {this.state.individualDetail.email} </b>
                                <br></br>
                                <br></br>
                                <b> {this.state.individualDetail.phone} </b>
                                <br></br>
                                <br></br>
                                <b> {this.state.individualDetail.company} </b>
                                <br></br>
                                <br></br>
                                <b> {this.state.individualDetail.address} </b>
                            </div>
                        </div>
                        </div>
                        <div className="row user-detail-footer">
                            <div>
                                
                            </div>
                            <div className="col-2">
                                <i className="fa fa-balance-scale balance" aria-hidden="true"></i>
                            </div>
                            <div className="col-10">
                                <b>Tax Evasion &amp; Payout Notice</b>
                                <br></br>
                                <span className="font-small">Date: 2 Dec,2020 - 2.00pm</span>
                            </div>
                        </div>  
                    </div>
                </div>
                <div id="myModal" className="modal fade" role="dialog">
                    <div className="modal-dialog">

                    <div className="modal-content">
                        <div className="center">
                            <b className="modal-head">Add Contact</b>
                    </div>
                    <button type="button" className="close modal-head" data-dismiss="modal">&times;</button>
                    <div className="modal-body">
                    <div className="row">
                            <div className="col-4 offset-1">
                                <div className="modal-bottom">
                                    <b>Full Name:</b>
                                    <br></br>
                                    {this.state.error.fullName && <span className="error">Please enter full name</span>}
                                </div>
                                <div className="modal-bottom">
                                    <b>Email: </b>
                                    <br></br>
                                    {this.state.error.email && <span className="error">Please enter valid email</span>}
                                </div>
                                <div className="modal-bottom">
                                    <b>Phone: </b>
                                    <br></br>
                                    {this.state.error.phone && <span className="error">Please enter valid phone number</span>}
                                </div>
                                <div className="modal-bottom">
                                    <b>Company: </b>
                                    <br></br>
                                    {this.state.error.company && <span className="error">Please enter company name</span>}
                                </div>
                                <div className="modal-bottom">
                                    <b>Position: </b>
                                    <br></br>
                                    {this.state.error.position && <span className="error">Please enter position</span>}
                                </div>
                                <div className="modal-bottom">
                                    <b>Address: </b>
                                    <br></br>
                                    {this.state.error.address && <span className="error">Please enter your Address</span>}
                                </div>                             
                            </div>
                            <div className="col-7">
                                <input className="modal-input" value={this.state.userDetail.fullName} name="fullName" onChange={this.handleChange} type="text" placeholder="Enter Full name"></input>
                                <br></br>
                                <input className="modal-input" value={this.state.userDetail.email} name="email" onChange={this.handleChange} type="text" placeholder="Enter email"></input>
                                <br></br>
                                <input className="modal-input" value={this.state.userDetail.phone} name="phone" onChange={this.handleChange} type="text" placeholder="Enter mobile number"></input>
                                <br></br>
                                <input className="modal-input" value={this.state.userDetail.company} name="company" onChange={this.handleChange} type="text" placeholder="Enter company name"></input>
                                <br></br>
                                <input className="modal-input" value={this.state.userDetail.position} name="position" onChange={this.handleChange} type="text" placeholder="Enter position"></input>
                                <br></br>
                                <textarea className="modal-input" value={this.state.userDetail.address} name="address" onChange={this.handleChange} placeholder="Enter address"></textarea>
                                <br></br>
                            </div>
                            <div className="img-upload">
                                <b>Upload Profile Picture</b>
                                <br></br>
                                <label htmlFor="upload-photo"><b>Upload</b></label>
                                <input type="file" id="upload-photo" onChange={this.getImage}></input>
                                {this.state.imgName != '' && <span style={{color:"green"}}> {this.state.imgName} </span>}
                                {this.state.imgError && <div style={{color:"red"}}><span>Please upload an image</span></div>}
                                <br></br>
                                <div className="btn">
                                    <button className="btn-cancel" data-dismiss="modal">Cancel</button>
                                    <button className="btn-save" onClick={()=>this.onSave()}>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            
        );
    }
}

export default ToDoApp;