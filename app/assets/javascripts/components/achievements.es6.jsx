class Achievement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            achievements: [],
            user_id: props.user_id,
            achievement:{}
        };
        this.typingTimer;
    };

    componentDidMount() {
        var that = this;
        $.ajax({
            method: 'GET',
            headers: {
                "Authorization": localStorage.getItem('auth_token'),
            },
            url: '/api/v1/achievements/?id=' + this.state.user_id,
            success: function (result) {
                that.setState({
                    achievements: result,
                });
            }
        });
    };

    handleChangeInput(i, key, e) {
        let achievements = this.state.achievements;
        achievements[i][key] = e.target.value;
        this.setState({achievements: achievements});
        this.handleSave(achievements);
    }

    handleSave(data) {
        if (this.typingTimer) {
            clearTimeout(this.typingTimer);
        }
        this.typingTimer = setTimeout(() => {
            this.doneTyping(data)
        }, 3000);
    }

    doneTyping(data) {
        console.log(data)
        $.ajax({
            method: 'PATCH',
            headers: {
                "Authorization": localStorage.getItem('auth_token'),
            },
            data: {achievements: data},
            url: '/api/v1/achievements_update',
            success: function (result) {
                console.log(result);
            }
        });
    }

    handleCreateFormInput(key, e) {
        let achievement = this.state.achievement;
        achievement[key] = e.target.value;
        this.setState({educational_detail: achievement});
    }

    handleAddAchievement(){ 
        var that = this  
        $.ajax({
            method: 'POST',
            headers: {
                "Authorization": localStorage.getItem('auth_token'),
            },
            data: {achievement: that.state.achievement},
            url: '/api/v1/achievements',
            success: function (result) {
                console.log(result);
                let achievements =  that.state.achievements
                achievements.push(result)
                that.setState({
                    achievements: achievements,
                })
                $('#achievementModal').modal('hide');
            }
        });
    }
    handleDeleteAchievement(i, evt) {
        var that = this;
        console.log('delete');
        $.ajax({
            method: 'DELETE',
            headers: {
                "Authorization": localStorage.getItem('auth_token'),
            },
            url: '/api/v1/achievements/' + this.state.achievements[i].id,
            success: function (result) {
                console.log(result);
                let achievements =  that.state.achievements;
                achievements.splice(i, 1);
                that.setState({
                    achievements: achievements,
                });
            }
        });

    }


    render() {
        return (
            <div>
            <div className="row card mt-5">
                <div className="card-header">
                    Achievements
                    <button type="button" className="btn btn-primary btn-sm float-right" data-toggle="modal" data-target="#achievementModal" >+ Add Achievement</button>
                </div>
                <div className="card-body">
                    {this.state.achievements.map((item, i) => (
                        <div className="mt-2" key={i}>

                            <div className="form-row">
                                <div className="col form-group">
                                    <label>Title</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={item.title}
                                        onChange={(evt) => this.handleChangeInput(i, "title", evt)}/>
                                </div>
                                <div className="col form-group">
                                    <label>Year Of Issue:</label>
                                    <input
                                        className="form-control"
                                        type="date"
                                        value={item.year_issued}
                                        onChange={(evt) => this.handleChangeInput(i, "year_issued", evt)}/>
                                </div>

                            </div>
                            <div className="form-row">

                                <label>Description</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={item.description}
                                    onChange={(evt) => this.handleChangeInput(i, "description", evt)}/>
                            </div>
                            <br/>
                            <button type="button" className="btn btn-primary" onClick={(evt)=>this.handleDeleteAchievement(i,evt)}>-Delete</button>
                            <hr/>
                            </div>
                    ))}
                </div>
            </div>
            <div className="modal fade" id="achievementModal" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">New Achievement</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="mt-2">
                            <div className="form-row">
                                <div className="col form-group">
                                    <label>Title</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        onChange={(evt) => this.handleCreateFormInput("title", evt)}/>
                                </div>
                                <div className="col form-group">
                                    <label>Year Of Issue:</label>
                                    <input
                                        className="form-control"
                                        type="date"
                                        onChange={(evt) => this.handleCreateFormInput("year_issued", evt)}/>
                                </div>

                            </div>
                            <div className="form-row">

                                <label>Description</label>
                                <textarea
                                    className="form-control"
                                    onChange={(evt) => this.handleCreateFormInput("description", evt)}></textarea>

                            </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={(evt)=>this.handleAddAchievement()}>Add Achievement</button>
                        </div>
                    </div>
                </div>
            </div>

            </div>
        )
    }
}