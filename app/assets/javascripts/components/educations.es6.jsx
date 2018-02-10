class Education extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditMode: props.isEditMode,
            educations: [],
            user_id: props.user_id,
            education: {}
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
            url: '/api/v1/educations/?id=' + this.state.user_id,
            success: function (result) {
                that.setState({
                    educations: result,
                });
            }
        });
    };

    handleChangeInput(i, key, e) {
        if(this.state.isEditMode){
            let educational_details = this.state.educations;
            educational_details[i][key] = e.target.value;
            this.setState({educations: educational_details});
            this.handleSave(educational_details);
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

    doneTyping(data){ 
        if(this.state.isEditMode){ 
            $.ajax({
                method: 'PATCH',
                headers: {
                    "Authorization": localStorage.getItem('auth_token'),
                },
                data: {educations: data},
                url: '/api/v1/educations_update',
                success: function (result) {
                    console.log(result);
                }
            });
        }
    }

    handleCreateFormInput(key, e) {
        if(this.state.isEditMode){
            let educational_detail = this.state.education;
            educational_detail[key] = e.target.value;
            this.setState({education: educational_detail});
        }
    }

    handleAddEducation(){ 
        if(this.state.isEditMode){
            var that = this  
            $.ajax({
                method: 'POST',
                headers: {
                    "Authorization": localStorage.getItem('auth_token'),
                },
                data: {education: that.state.education},
                url: '/api/v1/educations',
                success: function (result) {
                    console.log(result);
                    let educational_details =  that.state.educations
                    educational_details.push(result)
                    that.setState({
                        educations: educational_details,
                    })
                    $('#educationModal').modal('hide');
                }
            });
        }
    }
    handleDeleteEducation(i, evt) {
        if(this.state.isEditMode){
            var that = this;
            console.log('delete');
            $.ajax({
                method: 'DELETE',
                headers: {
                    "Authorization": localStorage.getItem('auth_token'),
                },
                url: '/api/v1/educations/' + this.state.educations[i].id,
                success: function (result) {
                    console.log(result);
                    let educational_details =  that.state.educations;
                    educational_details.splice(i, 1);
                    that.setState({
                        educations: educational_details,
                    });
                }
            });
        }
    }


    render() {
        return (
            <div className="row">
            <div className="col-lg-12 border-top-1 work-exp position-relative margin-tb20">
                        <a href="#" data-toggle="modal" data-target="#educationModal" className="position-absolute add-btn">
                            <span className="fa fa-plus"></span>
                        </a>
    
    
                        <h4 className="heading-h4">Educational Details</h4>
                        {this.state.educations.map((item,i) => (
                        <div className="single-exp position-relative" key={i}>
                            <a href="javascript:void(0)" onClick={(evt)=>this.handleDeleteEducation(i,evt)} className="position-absolute delete-btn">
                                <span className="fa fa-trash"></span>
                            </a>
                            <input type="text" className="company-name hide-input col-lg-12" placeholder="Institution Name" value={item.institution || ''} onChange={(evt)=>this.handleChangeInput(i, "institution", evt)}/>
                            <input type="text" className="company-designation hide-input col-lg-12" placeholder="Field of study ex.(Computer Science Engineering)" value={item.field_of_study || ''} onChange={(evt)=>this.handleChangeInput(i, "field_of_study", evt)}/>
                            
                            <input type="text" className="general-input hide-input col-lg-12" placeholder="Degree ex.(Bachalor of Engineering)" value={item.degree || ''} onChange={(evt)=>this.handleChangeInput(i, "degree", evt)}/>
                            
                            <div className="col-lg-12">
                                    <input type="date" className="year-input hide-input " value={item.year_of_start || ''} onChange={(evt)=>this.handleChangeInput(i, "year_of_start", evt)}/> <span className="to_space">To</span> 
                                    <input type="date" className="year-input hide-input " value={item.year_of_end || ''} onChange={(evt)=>this.handleChangeInput(i, "year_of_end", evt)}/>
                            </div>
                            
                        </div>
                        ))}
                </div>

                <div className="modal fade" id="educationModal" role="dialog" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">New Education</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="mt-2">
                                <div className="form-row">
                                            <div className="col form-group">
                                                <label>Institution</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    onChange={(evt)=>this.handleCreateFormInput( "institution", evt)}/>

                                            </div>
                                        </div>
                                    <div className="form-row">
                                        <div className="col form-group">
                                            <label>Degree</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                onChange={(evt)=>this.handleCreateFormInput("degree", evt)}/>

                                        </div>
                                        <div className="col form-group">
                                            <label>Field Of Study</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                            onChange={(evt)=>this.handleCreateFormInput( "field_of_study", evt)}/>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col form-group">
                                            <label>Year Of start</label>
                                            <input
                                                className="form-control"
                                                type="date"
                                            onChange={(evt)=>this.handleCreateFormInput("year_of_start", evt)}/>
                                        </div>
                                        <div className="col form-group">
                                            <label>Year Of end</label>
                                            <input
                                            className="form-control"
                                            type="date"
                                            onChange={(evt)=>this.handleCreateFormInput("year_of_end", evt)}/>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={(evt)=>this.handleAddEducation()}>Add Education</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}