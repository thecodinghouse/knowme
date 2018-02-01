class EducationalDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            educational_details: [],
            user_id: props.user_id,
            educational_detail: {}
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
            url: '/api/v1/educational_details/?id=' + this.state.user_id,
            success: function (result) {
                that.setState({
                    educational_details: result,
                });
            }
        });
    };

    handleChangeInput(i, key, e) {
        let educational_details = this.state.educational_details;
        educational_details[i][key] = e.target.value;
        this.setState({educational_details: educational_details});
        this.handleSave(educational_details);
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
        $.ajax({
            method: 'PATCH',
            headers: {
                "Authorization": localStorage.getItem('auth_token'),
            },
            data: {educational_details: data},
            url: '/api/v1/education_update',
            success: function (result) {
                console.log(result);
            }
        });
    }

    handleCreateFormInput(key, e) {
        let educational_detail = this.state.educational_detail;
        educational_detail[key] = e.target.value;
        this.setState({educational_detail: educational_detail});
    }

    handleAddEducation(){ 
        var that = this  
        $.ajax({
            method: 'POST',
            headers: {
                "Authorization": localStorage.getItem('auth_token'),
            },
            data: {educational_detail: that.state.educational_detail},
            url: '/api/v1/educational_details',
            success: function (result) {
                console.log(result);
                let educational_details =  that.state.educational_details
                educational_details.push(result)
                that.setState({
                    educational_details: educational_details,
                })
                $('#educationModal').modal('hide');
            }
        });
    }


    render() {
        return (
            <div>
            <div className="row card mt-5">
                    <div className="card-header">
                        Educational Profile
                        <button type="button" className="btn btn-primary btn-sm float-right" data-toggle="modal" data-target="#educationModal" >+ Add Education</button>
                    </div>
                    <div className="card-body">
                        {this.state.educational_details.map((item,i) => (
                            <div className="mt-2" key={i}>

                                    <div className="form-row">
                                        <div className="col form-group">
                                            <label>Degree</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                value={item.degree}
                                                onChange={(evt)=>this.handleChangeInput(i, "degree", evt)}/>

                                        </div>
                                        <div className="col form-group">
                                            <label>Field Of Study</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                            value={item.field_of_study}
                                            onChange={(evt)=>this.handleChangeInput(i, "field_of_study", evt)}/>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col form-group">
                                            <label>Year Of start</label>
                                            <input
                                                className="form-control"
                                                type="date"
                                            value={item.year_of_start}
                                            onChange={(evt)=>this.handleChangeInput(i, "year_of_start", evt)}/>
                                        </div>
                                        <div className="col form-group">
                                            <label>Year Of end</label>
                                            <input
                                            className="form-control"
                                            type="date"
                                            value={item.year_of_end}
                                            onChange={(evt)=>this.handleChangeInput(i, "year_of_end", evt)}/>
                                        </div>
                                    </div>
                                <hr/>
                            </div>
                        ))}
                    </div>
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