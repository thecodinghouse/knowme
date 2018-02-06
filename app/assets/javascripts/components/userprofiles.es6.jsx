class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: props.profile,
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
                <div className="row card mt-5">
                    <div className="card-header">
                        User Profile
                    </div>
                    <div className="card-body">
                        <div className="form-row">
                        <div className="col form-group">
                            <label>Name</label>
                            <input
                                className="form-control"
                                type="text"
                                value={this.state.profile.name}
                                onChange={(evt)=>this.handleChangeInput("name", evt)}/>
                        </div>
                        <div className="col form-group">
                            <label>DOB</label>
                            <input
                                className="form-control"
                                type="date"
                                value={this.state.profile.birthday}
                                onChange={(evt)=>this.handleChangeInput("birthday", evt)}/>
                        </div>
                        </div>
                        <div className="form-row">
                        <div className="col form-group">
                            <label>Hobbies</label>
                            <input
                                className="form-control"
                                type="text"
                                value={this.state.profile.hobbies}
                                placeholder="seperate ur hobbies with comma(,)"
                                onChange={(evt)=>this.handleChangeInput("hobbies", evt)}/>
                        </div>
                        <div className="col form-group">
                            <label>Languages</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="seperate languages with comma(,)"
                                value={this.state.profile.languages}
                                onChange={(evt)=>this.handleChangeInput("languages", evt)}/>
                        </div>
                        </div>
                        <div className="form-row">
                        <div className="col form-group">
                            <label>Hometown</label>
                            <input
                                className="form-control"
                                type="text"
                                value={this.state.profile.hometown}
                                onChange={(evt)=>this.handleChangeInput("hometown", evt)}/>
                        </div>
                        <div className="col form-group">
                            <label>Current-Location</label>
                            <input
                                className="form-control"
                                type="text"
                                value={this.state.profile.current_location}
                                onChange={(evt)=>this.handleChangeInput("current_location", evt)}/>
                        </div>
                        </div>
                        <div className="form-row">
                        <div className="col form-group">
                            <label>Maritial-Status</label>
                            <select className="form-control"
                                    value={this.state.profile.marital_status}
                                    onChange={(evt)=>this.handleChangeInput("marital_status", evt)}>
                                <option>Married</option>
                                <option>Single</option>
                                <option>Divorced</option>
                            </select>
                        </div>
                            <div className="col form-group">
                                <label>Contact-Number</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="+91 XXXXXXXXXX"
                                    value={this.state.profile.contact_no}
                                    onChange={(evt)=>this.handleChangeInput("contact_no", evt)}/>
                                <span style={{color:'red'}}>{this.state.errors.contact_no}</span>
                            </div>
                        </div>
                        <div className="form-row">
                        <div className="col form-group">
                            <label>About Me</label>
                            <textarea
                                className="form-control"
                                value={this.state.profile.about_me}
                                onChange={(evt)=>this.handleChangeInput("about_me", evt)}/>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}