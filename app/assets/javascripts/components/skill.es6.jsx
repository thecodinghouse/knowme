class Skill extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            skills: [],
            user_id: props.user_id,
            skill:{}
        };
    };

    componentDidMount() {
        var that = this;
        $.ajax({
            method: 'GET',
            headers: {
                "Authorization": localStorage.getItem('auth_token'),
            },
            url: '/api/v1/skills/?id=' + this.state.user_id,
            success: function (result) {
                that.setState({
                    skills: result,
                });
            }
        });
    };

    handleCreateFormInput(key, e) {
        let skill = this.state.skill;
        skill[key] = e.target.value;
        this.setState({skill: skill});
    }

    handleAddSkill(){ 
        var that = this  
        $.ajax({
            method: 'POST',
            headers: {
                "Authorization": localStorage.getItem('auth_token'),
            },
            data: {skill: that.state.skill},
            url: '/api/v1/skills',
            success: function (result) {
                console.log(result);
                let skills =  that.state.skills
                skills.push(result)
                that.setState({
                    skills: skills,
                })
                $('#skillModal').modal('hide');
            }
        });
    }

    handleRemoveSkill(i){ 
        var that = this  
        $.ajax({
            method: 'DELETE',
            headers: {
                "Authorization": localStorage.getItem('auth_token'),
            },
            url: '/api/v1/skills/'+ that.state.skills[i].id,
            success: function (result) {
                let skills =  that.state.skills
                skills.splice(i, 1);
                that.setState({
                    skills: skills,
                })
                // $('#skillModal').modal('hide');
            }
        });
    }

    render() {
        return (
            <div>

                <div class="col-lg-12 border-top-1 work-exp position-relative margin-tb20">
                    <a href="#"  data-toggle="modal" data-target="#skillModal" class="position-absolute add-btn">
                        <span class="fa fa-plus"></span>
                    </a>


                    <h4 class="heading-h4">Skills</h4>

                    <div class="row">
                        <div class="col">
                        {this.state.skills.map((item, i) => (
                
                            <div class="single-skill" key={i}>{item.name}
                                <span class="fa fa-times  remove-skill" onClick={(evt)=>this.handleRemoveSkill(i)}></span>
                            </div>
                
                        ))}
                        </div>
                    </div>

                </div>
    
                <div className="modal fade" id="skillModal" role="dialog" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">New Skill</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="mt-2">
                                    <div className="form-row">
                                        
                                        <div className="col form-group">
                                            <label>Skill name</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                onChange={(evt)=>this.handleCreateFormInput("name", evt)}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={(evt)=>this.handleAddSkill()}>Add Skill</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}