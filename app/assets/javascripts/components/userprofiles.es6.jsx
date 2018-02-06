class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: props.profile,
            user: props.user,
            errors:{}
        };
        this.typingTimer;
    };


    handleChangeInput(key, e) {
        let profile = this.state.profile;
        profile[key] = e.target.value;
        this.setState({profile: profile});
        this.handleSave(profile);
    }

    handleSave(data) {
        if (this.typingTimer) {
            clearTimeout(this.typingTimer);
        }
        this.typingTimer = setTimeout(() => {
            this.doneTyping(data)
        }, 3000);
    }

    doneTyping(data){
        var that = this;
        $.ajax({
            method: 'PATCH',
            headers: {
                "Authorization": localStorage.getItem('auth_token'),
            },
            data: {profile: data},
            url: '/users/' + this.state.profile.id,
            success: function (result) {
                //console.log(result);
            },
            error: function(res) {
                that.setState({errors: res.responseJSON.errors})
            }
        });
    }

    render() {
        return (
            <div>
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="row">
                                <div className="profile-pic col-lg-4 col-md-4">
                                    <img src={this.state.profile.image_url}/>
                                </div>
                                <div className="basic-details col-lg-8 col-md-8">
                                    <input type="text" className="person-name hide-input" placeholder="Full Name" value={this.state.profile.name} onChange={(evt)=>this.handleChangeInput("name", evt)}/>
                                    <input type="text" className="person-designation hide-input" placeholder="Designation" value="Android Developer"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <ul className="contact-details">
                                <li className="d-flex">
                                    <span className="fa fa-envelope"></span>
                                    <input type="text" disabled className="person-email hide-input" placeholder="Email address" value={this.state.user.email}/>
                                </li>
                                <li className="d-flex">
                                    <span className="fa fa-phone"></span>
                                    <input type="text" className="person-mobile hide-input" placeholder="+91 XXXXXXXXXX" value={this.state.profile.contact_no} onChange={(evt)=>this.handleChangeInput("contact_no", evt)}/>
                                </li>
                                <li className="d-flex">
                                    <span className="fa fa-map-marker"></span>
                                    <textarea type="text" className="person-address hide-input" placeholder="Your Name" spellcheck="false" value={this.state.profile.current_location} onChange={(evt)=>this.handleChangeInput("current_location", evt)}></textarea>

                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12 margin-t20">
                    <h4 class="heading-h4">About Me</h4>
                    <textarea type="text" class="person-about hide-input" placeholder="BY DAY: Alt-Rock Ninja Cowgirl at Veridian Dynamics.

BY NIGHT: I write code and code rights for penalcoders.example.org, an awesome non-profit that will totally take your money at that link. My kids are cuter than yours.

FOR FUN: C+ Jokes, Segway Roller Derby, NYT Sat. Crosswords (in Sharpie!), Ostrich Grooming.

If you see scary things, look for the helpers-you'll always see people helping. -Fred Rogers" spellcheck="false" value={this.state.profile.about_me} onChange={(evt)=>this.handleChangeInput("about_me", evt)} > </textarea>
                    <div class="row">
                        <p class="col-lg-4 d-flex general-type">
                            <span>Birthday :</span>
                            <input type="date" class="general-input hide-input flex-grow" placeholder="DD/MM/YYYY" value={this.state.profile.birthday} onChange={(evt)=>this.handleChangeInput("birthday", evt)}/>
                        </p>

                        <p class="col-lg-5 d-flex general-type">
                            <span>Merital Status :</span>
                            <input type="text" class="general-input hide-input flex-grow" placeholder="Married/Single"
                                value={this.state.profile.marital_status} onChange={(evt)=>this.handleChangeInput("marital_status", evt)}/>
                        </p>

                        <div class="col-lg-12"></div>
                        <p class="col-lg-4 d-flex general-type">
                            <span>Hometown : </span>
                            <input type="text" class="general-input hide-input flex-grow" placeholder="Pune, Maharastra, 411028"
                                value={this.state.profile.hometown} onChange={(evt)=>this.handleChangeInput("hometown", evt)}/>
                        </p>

                        <div class="col-lg-12 "></div>
                        <p class="col-lg-12 d-flex general-type">
                            <span>Languages : </span>
                            <input type="text" class="general-input hide-input flex-grow" placeholder="Java, Python, Ruby, ..."
                                value={this.state.profile.languages} onChange={(evt)=>this.handleChangeInput("languages", evt)}/>
                        </p>

                        <p class="col-lg-12 d-flex general-type">
                            <span>Hobbies : </span>
                            <input type="text" class="general-input hide-input flex-grow" placeholder="Reading, Cricket, ..."
                                value={this.state.profile.hobbies} onChange={(evt)=>this.handleChangeInput("hobbies", evt)}/>
                        </p>
                    </div>


                </div>

            </div>       











            // <div>
            //     <div className="row card mt-5">
            //         <div className="card-header">
            //             User Profile
            //         </div>
            //         <div className="card-body">
            //             <div className="form-row">
            //             <div className="col form-group">
            //                 <label>Name</label>
            //                 <input
            //                     className="form-control"
            //                     type="text"
            //                     value={this.state.profile.name}
            //                     onChange={(evt)=>this.handleChangeInput("name", evt)}/>
            //             </div>
            //             <div className="col form-group">
            //                 <label>DOB</label>
            //                 <input
            //                     className="form-control"
            //                     type="date"
            //                     value={this.state.profile.birthday}
            //                     onChange={(evt)=>this.handleChangeInput("birthday", evt)}/>
            //             </div>
            //             </div>
            //             <div className="form-row">
            //             <div className="col form-group">
            //                 <label>Hobbies</label>
            //                 <input
            //                     className="form-control"
            //                     type="text"
            //                     value={this.state.profile.hobbies}
            //                     placeholder="seperate ur hobbies with comma(,)"
            //                     onChange={(evt)=>this.handleChangeInput("hobbies", evt)}/>
            //             </div>
            //             <div className="col form-group">
            //                 <label>Languages</label>
            //                 <input
            //                     className="form-control"
            //                     type="text"
            //                     placeholder="seperate languages with comma(,)"
            //                     value={this.state.profile.languages}
            //                     onChange={(evt)=>this.handleChangeInput("languages", evt)}/>
            //             </div>
            //             </div>
            //             <div className="form-row">
            //             <div className="col form-group">
            //                 <label>Hometown</label>
            //                 <input
            //                     className="form-control"
            //                     type="text"
            //                     value={this.state.profile.hometown}
            //                     onChange={(evt)=>this.handleChangeInput("hometown", evt)}/>
            //             </div>
            //             <div className="col form-group">
            //                 <label>Current-Location</label>
            //                 <input
            //                     className="form-control"
            //                     type="text"
            //                     value={this.state.profile.current_location}
            //                     onChange={(evt)=>this.handleChangeInput("current_location", evt)}/>
            //             </div>
            //             </div>
            //             <div className="form-row">
            //             <div className="col form-group">
            //                 <label>Maritial-Status</label>
            //                 <select className="form-control"
            //                         value={this.state.profile.marital_status}
            //                         onChange={(evt)=>this.handleChangeInput("marital_status", evt)}>
            //                     <option>Married</option>
            //                     <option>Single</option>
            //                     <option>Divorced</option>
            //                 </select>
            //             </div>
            //                 <div className="col form-group">
            //                     <label>Contact-Number</label>
            //                     <input
            //                         className="form-control"
            //                         type="text"
            //                         placeholder="+91 XXXXXXXXXX"
            //                         value={this.state.profile.contact_no}
            //                         onChange={(evt)=>this.handleChangeInput("contact_no", evt)}/>
            //                     <span style={{color:'red'}}>{this.state.errors.contact_no}</span>
            //                 </div>
            //             </div>
            //             <div className="form-row">
            //             <div className="col form-group">
            //                 <label>About Me</label>
            //                 <textarea
            //                     className="form-control"
            //                     value={this.state.profile.about_me}
            //                     onChange={(evt)=>this.handleChangeInput("about_me", evt)}/>
            //             </div>
            //             </div>
            //         </div>
            //     </div>
            // </div>
        )
    }
}