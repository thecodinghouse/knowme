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
            url: '/api/v1/users/' + this.state.profile.id,
            success: function (result) {
                //console.log(result);
            },
            error: function(res) {
                that.setState({errors: res.responseJSON.errors})
            }
        });
    }

    render() {
        let image = ""
        if(this.state.profile.image_url){
            image = <img src={this.state.profile.image_url + '?type=large'}/>
        }else{
            image = <div class='default-pic text-uppercase'>upload <br/>profile picture</div>
        }

        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="row">
                                <div className="profile-pic col-lg-4 col-md-4">
                                    {image}
                                </div>
                                <div className="basic-details col-lg-8 col-md-8">
                                    <input type="text" className="person-name hide-input" placeholder="Full Name" value={this.state.profile.name || ''} onChange={(evt)=>this.handleChangeInput("name", evt)}/>
                                    <input type="text" className="person-designation hide-input" placeholder="Set title that describes you" value={this.state.profile.title || ''} onChange={(evt)=>this.handleChangeInput("title", evt)}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <ul className="contact-details">
                                <li className="d-flex">
                                    <span className="fa fa-envelope"></span>
                                    <input type="text" disabled className="person-email hide-input" placeholder="Email address" defaultValue={this.state.user.email}/>
                                </li>
                                <li className="d-flex">
                                    <span className="fa fa-phone"></span>
                                    <input type="text" className="person-mobile hide-input" placeholder="+91 XXXXXXXXXX" value={this.state.profile.contact_no || ''} onChange={(evt)=>this.handleChangeInput("contact_no", evt)}/>
                                </li>
                                <li className="d-flex">
                                    <span className="fa fa-map-marker"></span>
                                    <textarea type="text" className="person-address hide-input" placeholder="Your Name" spellCheck="false" value={this.state.profile.current_location || ''} onChange={(evt)=>this.handleChangeInput("current_location", evt)}></textarea>

                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-lg-12 margin-t20">
                    <h4 className="heading-h4">About Me</h4>
                    <textarea type="text" className="person-about hide-input" placeholder="BY DAY: Alt-Rock Ninja Cowgirl at Veridian Dynamics.

                        BY NIGHT: I write code and code rights for penalcoders.example.org, an awesome non-profit that will totally take your money at that link. My kids are cuter than yours.

                        FOR FUN: C+ Jokes, Segway Roller Derby, NYT Sat. Crosswords (in Sharpie!), Ostrich Grooming.

                        If you see scary things, look for the helpers-you'll always see people helping. -Fred Rogers" spellCheck="false" value={this.state.profile.about_me || ''} onChange={(evt)=>this.handleChangeInput("about_me", evt)} > </textarea>
                    <div className="row">
                        <p className="col-lg-4 d-flex general-type">
                            <span>Birthday :</span>
                            <input type="date" className="general-input hide-input flex-grow" placeholder="DD/MM/YYYY" value={this.state.profile.birthday || ''} onChange={(evt)=>this.handleChangeInput("birthday", evt)}/>
                        </p>

                        <p className="col-lg-5 d-flex general-type">
                            <span>Merital Status :</span>
                            <input type="text" className="general-input hide-input flex-grow" placeholder="Married/Single"
                                value={this.state.profile.marital_status || ''} onChange={(evt)=>this.handleChangeInput("marital_status", evt)}/>
                        </p>

                        <div className="col-lg-12"></div>
                        <p className="col-lg-4 d-flex general-type">
                            <span>Hometown : </span>
                            <input type="text" className="general-input hide-input flex-grow" placeholder="Pune, Maharastra, 411028"
                                value={this.state.profile.hometown || ''} onChange={(evt)=>this.handleChangeInput("hometown", evt)}/>
                        </p>

                        <div className="col-lg-12 "></div>
                        <p className="col-lg-12 d-flex general-type">
                            <span>Languages : </span>
                            <input type="text" className="general-input hide-input flex-grow" placeholder="English, Hindi, Marathi, ..."
                                value={this.state.profile.languages || ''} onChange={(evt)=>this.handleChangeInput("languages", evt)}/>
                        </p>

                        <p className="col-lg-12 d-flex general-type">
                            <span>Hobbies : </span>
                            <input type="text" className="general-input hide-input flex-grow" placeholder="Reading, Cricket, ..."
                                value={this.state.profile.hobbies || ''} onChange={(evt)=>this.handleChangeInput("hobbies", evt)}/>
                        </p>
                    </div>
                </div>
            </div>       
        )
    }
}