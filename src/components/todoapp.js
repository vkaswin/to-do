import React, { Component } from 'react';

import 'font-awesome/css/font-awesome.min.css';

class ToDoApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactDetail : [],
            userDetail : {
                fullName : '',
                email : '',
                phone : '',
                company : '',
                address : '',
                img : ''
            },
            error : {
                fullName : false,
                email : false,
                phone : false,
                company : false,
                address : false
            },
            imgName: '',
            imgError: undefined

        }
    }
    handleChange = (event) => {
        let data = {...this.state.userDetail,[event.target.name] : event.target.value}
        this.setState({
            userDetail : data
        })
    }
    onSave(){
        console.log(this.state.userDetail)
        let emial = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        let number = /^\+?\d[\d -]{8,10}\d$/;
        let validate = {...this.state.error,
            fullName: this.state.userDetail.fullName == '' ? true : false,
            email: !emial.test(this.state.userDetail.email),
            phone: !number.test(this.state.userDetail.phone),
            company: this.state.userDetail.company == '' ? true : false,
            address: this.state.userDetail.address == '' ? true : false,
            img: this.state.userDetail.img == '' ? true : false
        }
        this.setState({
            error : validate,
            imgError : this.state.imgName == '' ? true : false
        })
        if(this.state.error.fullName != true, this.state.error.email != true, this.state.error.phone != false, this.state.userDetail.company != true, this.state.userDetail.address != true, this.state.imgName != ''){
            this.state.contactDetail.push(this.state.userDetail);
            let clear = {...this.state.userDetail,
                fullName : '',
                email : '',
                phone : '',
                company : '',
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
    render(){
        return(
            <div>
                <div className="row head">
                    <div className="col-2 offset-1">
                        <i className="fa fa-search" aria-hidden="true"></i>
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
                                <select className="dropdown">
                                    <option>Mike Huston</option>
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
                <div className="row bottom">
                    <div className="col-5 offset-1">
                        <div className="row">
                            <div className="col-1">
                                <i className="fa fa-address-book address" aria-hidden="true"></i>
                            </div>
                            <div className="col-8">
                                <b>Contacts</b>
                                <br></br>
                                <span className="font-small">Welcome to Contact Page</span>
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
                <div className="row bottom">
                    <div className="col-3 offset-1">
                        <input className="search-box" type="text" placeholder="Search Contacts"></input>
                        <i class="fa fa-search search" aria-hidden="true"></i>
                    </div>
                    <div className="col-4">
                        <button className="add-product" data-toggle="modal" data-target="#myModal"><b>+ Add Product</b></button>
                    </div>
                </div>
                <div className="row">
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
                <div className="row">
                    <div className="col-6 offset-1 user">
                        <div className="row">
                            <div className="col-2">
                                <input className="check" type="checkbox"></input>
                            </div>
                            <div className="col-5 content">
                                <div className="row">
                                    <div className="col-3">
                                        {/* <img className="img" src={require('../images/avatar.jpg')}></img> */}
                                        <img className="img" src="https://avatar.oxro.io/avatar.svg?name=John+Smith&background=6ab04c&color=000"></img>
                                    </div>
                                    <div className="col-8">
                                        <b>Mike Huston</b>
                                        <br></br>
                                        <span>vkaswin1998@gmail.com</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-5 company">
                                <b>Company</b>
                            </div>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="user-detail">
                            <div className="img-align">
                                <img className="img-detail" src="https://avatar.oxro.io/avatar.svg?name=John+Smith&background=6ab04c&color=000"></img>
                                <br></br>
                                <b>Mike Huston</b>
                                <br></br>
                                <span className="font-small">Product Manager @ ABC Company</span>
                            </div>
                            <div className="row">
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
                            <div className="col-7">
                                <b>Full Name</b>
                                <br></br>
                                <br></br>
                                <b>Email</b>
                                <br></br>
                                <br></br>
                                <b>Phone</b>
                                <br></br>
                                <br></br>
                                <b>Company</b>
                                <br></br>
                                <br></br>
                                <b>Address</b>
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
                                    {this.state.error.fullName && <span className="error">Please enter your full name</span>}
                                </div>
                                <div className="modal-bottom">
                                    <b>Email: </b>
                                    <br></br>
                                    {this.state.error.email && <span className="error">Please enter your email</span>}
                                </div>
                                <div className="modal-bottom">
                                    <b>Phone: </b>
                                    <br></br>
                                    {this.state.error.phone && <span className="error">Please enter your phone number</span>}
                                </div>
                                <div className="modal-bottom">
                                    <b>Company: </b>
                                    <br></br>
                                    {this.state.error.company && <span className="error">Please enter your company name</span>}
                                </div>
                                <div className="modal-bottom">
                                    <b>Address: </b>
                                    <br></br>
                                    {this.state.error.address && <span className="error">Please enter your Address</span>}
                                </div>                             
                            </div>
                            <div className="col-7">
                                <input className="modal-input" value={this.state.userDetail.fullName} name="fullName" onChange={this.handleChange} type="text" placeholder="Enter your name"></input>
                                <br></br>
                                <input className="modal-input" value={this.state.userDetail.email} name="email" onChange={this.handleChange} type="text" placeholder="Enter your email"></input>
                                <br></br>
                                <input className="modal-input" value={this.state.userDetail.phone} name="phone" onChange={this.handleChange} type="text" placeholder="Enter your mobile number"></input>
                                <br></br>
                                <input className="modal-input" value={this.state.userDetail.company} name="company" onChange={this.handleChange} type="text" placeholder="Enter your company name"></input>
                                <br></br>
                                <textarea className="modal-input" value={this.state.userDetail.address} name="address" onChange={this.handleChange} placeholder="Enter your address"></textarea>
                                <br></br>
                            </div>
                            <div className="img-upload">
                                <b>Upload Profile Picture</b>
                                <br></br>
                                <label htmlFor="upload-photo"><b>Upload</b></label>
                                <input type="file" id="upload-photo"  onChange={this.getImage}></input>
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