class Achievement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditMode: props.isEditMode,
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
        if(this.state.isEditMode){
            let achievements = this.state.achievements;
            achievements[i][key] = e.target.value;
            this.setState({achievements: achievements});
            this.handleSave(achievements);
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

    doneTyping(data) {
        if(this.state.isEditMode){
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
    }

    handleCreateFormInput(key, e) {
        if(this.state.isEditMode){
            let achievement = this.state.achievement;
            achievement[key] = e.target.value;
            this.setState({educational_detail: achievement});
        }
    }

    handleAddAchievement(){ 
        if(this.state.isEditMode){
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
    }
    handleDeleteAchievement(i, evt) {
        if(this.state.isEditMode){
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
    }


    render() {
        return (
            <div className="row">
                <div className="col-lg-12 border-top-1 work-exp position-relative margin-tb20">
                    <a href="#"  data-toggle="modal" data-target="#achievementModal"  className="position-absolute add-btn">
                        <span className="fa fa-plus"></span>
                    </a>

                    <h4 className="heading-h4">Achievements</h4>
                    {this.state.achievements.map((item,i) => (
                        <div className="single-exp position-relative" key={i}>
                            <a href="javascript:void(0)" onClick={(evt)=>this.handleDeleteAchievement(i,evt)} className="position-absolute delete-btn">
                                <span className="fa fa-trash"></span>
                            </a>
                            <input type="text" className="company-name hide-input col-lg-12" placeholder="Title of your achievement" value={item.title || ''} onChange={(evt) => this.handleChangeInput(i, "title", evt)}/>
                            
                            <div className="col-lg-12">
                            <input type="date" className="year-input hide-input " value={item.year_issued || ''} onChange={(evt) => this.handleChangeInput(i, "year_issued", evt)}/>
                            </div>
                            
                            
                            <textarea type="text" className="person-about hide-input col-lg-12" placeholder="What's your achievement about." spellCheck="false" value={item.description || ''} onChange={(evt)=>this.handleChangeInput(i, "description", evt)}>
                            </textarea>
                        </div>
                    ))}
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