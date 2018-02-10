class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditMode: props.isEditMode,
            user_id: props.user_id,
            user:[],
            errors:{},
            defaultPic: props.defaultPic
        };
        this.typingTimer;
    };

    componentDidMount(){
        var that = this;
        $.ajax({
            method: 'GET',
            headers: {
                "Authorization": localStorage.getItem('auth_token'),
            },
            url: '/api/v1/users?id=' + this.state.user_id,
            success: function (result) {
                if(!(Object.keys(result).length === 0)){
                    that.setState({
                        user: [result],
                    });
                }
            }
        });
        if(this.state.isEditMode){
            $(document).on('click','.profile-pic',function(e){
                $('#image-upload').click();
                return false;
            });
        }
    }


    handleChangeInput(key, e) {
        if(this.state.isEditMode){
            let user = this.state.user;
            user[0].profile[key] = e.target.value;
            this.setState({user: user});
            this.handleSave(user[0].profile);
        }
    }

    handleSave(data) {
        if (this.typingTimer) {
            clearTimeout(this.typingTimer);
        }
        this.typingTimer = setTimeout(() => {
            this.doneTyping(data)
        }, 3000);
    }

    startUploading (){
        if(this.state.isEditMode){
            let formData = new FormData($('#upload_form')[0]);
            $.ajax({
                method: 'POST',
                headers: {
                    "Authorization": localStorage.getItem('auth_token'),
                },
                data:formData,
                url: '/api/v1/users',
                dataType: 'json',
                processData: false,
                contentType: false,
                success: function (result) {
                    console.log(result);
                    $("#profile_picture").attr('src',result.image_path);
                },
                error: function(res) {
                    this.setState({errors: res.responseJSON.errors})
                }
            })
        }
    }

    doneTyping(data){
        if(this.state.isEditMode){
            var that = this;
            $.ajax({
                method: 'PATCH',
                headers: {
                    "Authorization": localStorage.getItem('auth_token'),
                },
                data: {profile: data},
                url: '/api/v1/users/' + that.state.user[0].profile.id,
                success: function (result) {
                    //console.log(result);
                },
                error: function(res) {
                    that.setState({errors: res.responseJSON.errors})
                }
            });
        }
    }

    render() {
        let disabled = "disabled"
        if(this.state.isEditMode){
            disabled = ""
        }      
        return (
            <div className="row">
                {this.state.user.map((item,i) => (
                <div key={i}>
                <div className="col-lg-12">
                    <div className="row position-relative">
                        <div className="col-lg-8">
                            <div className="row " >
                                <div className="profile-pic col-lg-4 col-md-4 col-4">
                                    
                                    <img id="profile_picture" src={item.profile.image_url || this.state.defaultPic}/>
                
                                    
                                </div>
                                
                                <form id="upload_form" hidden encType="multipart/form-data" method="post">
                                            <input type="file"  disabled={disabled} name="image" id="image-upload" onChange={()=> this.startUploading()} accept="image/*"/>
                                        </form>

                                <div className="basic-details col-lg-8 col-md-8 col-6">
                                    <input type="text" className="person-name hide-input" placeholder="Full Name" value={item.profile.name || ''} onChange={(evt)=>this.handleChangeInput("name", evt)}/>
                                    <input type="text" className="person-designation hide-input" placeholder="Set title that describes you" value={item.profile.title || ''} onChange={(evt)=>this.handleChangeInput("title", evt)}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 contactdetails_cont">
                            <ul className="contact-details">
                                <li className="d-flex">
                                    <span className="fa fa-envelope"></span>
                                    <input type="text" disabled className="person-email hide-input" placeholder="Email address" defaultValue={item.email}/>
                                </li>
                                <li className="d-flex">
                                    <span className="fa fa-phone"></span>
                                    <input type="text" className="person-mobile hide-input" placeholder="+91 XXXXXXXXXX" value={item.profile.contact_no || ''} onChange={(evt)=>this.handleChangeInput("contact_no", evt)}/>
                                </li>
                                <li className="d-flex">
                                    <span className="fa fa-map-marker"></span>
                                    <textarea type="text" className="person-address hide-input" placeholder="Your current location" spellCheck="false" value={item.profile.current_location || ''} onChange={(evt)=>this.handleChangeInput("current_location", evt)}></textarea>

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

                        If you see scary things, look for the helpers-you'll always see people helping. -Fred Rogers" spellCheck="false" value={item.profile.about_me || ''} onChange={(evt)=>this.handleChangeInput("about_me", evt)} > </textarea>
                    <div className="row">
                        <p className="col-lg-4 d-flex general-type">
                            <span>Birthday :</span>
                            <input type="date" className="general-input hide-input flex-grow" placeholder="DD/MM/YYYY" value={item.profile.birthday || ''} onChange={(evt)=>this.handleChangeInput("birthday", evt)}/>
                        </p>

                        <p className="col-lg-8 d-flex general-type">
                            <span>Languages : </span>
                            <input type="text" className="general-input hide-input flex-grow" placeholder="English, Hindi, Marathi, ..."
                                value={item.profile.languages || ''} onChange={(evt)=>this.handleChangeInput("languages", evt)}/>
                        </p>

                        

                        <div className="col-lg-12"></div>
                        <p className="col-lg-4 d-flex general-type">
                            <span>Hometown : </span>
                            <input type="text" className="general-input hide-input flex-grow" placeholder="Pune, Maharastra, 411028"
                                value={item.profile.hometown || ''} onChange={(evt)=>this.handleChangeInput("hometown", evt)}/>
                        </p>

                        <p className="col-lg-8 d-flex general-type">
                            <span>Hobbies : </span>
                            <input type="text" className="general-input hide-input flex-grow" placeholder="Reading, Cricket, ..."
                                value={item.profile.hobbies || ''} onChange={(evt)=>this.handleChangeInput("hobbies", evt)}/>
                        </p>

                        <div className="col-lg-12 "></div>
                        <p className="col-lg-5 d-flex general-type">
                            <span>Martial Status :</span>
                            <input type="text" className="general-input hide-input flex-grow" placeholder="Married/Single"
                                value={item.profile.marital_status || ''} onChange={(evt)=>this.handleChangeInput("marital_status", evt)}/>
                        </p>

                        
                    </div>
                </div>
                </div>
                ))}
            </div>       
        )
    }
}