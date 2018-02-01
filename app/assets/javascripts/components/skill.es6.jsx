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

    render() {
        return (
            <div>
            <div className="row card mt-5">
                <div className="card-header">
                    Skills
                    <button type="button" className="btn btn-primary btn-sm float-right" data-toggle="modal" data-target="#skillModal" >+ Add Skill</button>
                </div>
                <div className="card-body">
                <div className="form-row">
                    {this.state.skills.map((item, i) => (
                        <div className="mt-2" key={i}>

                            
                            <div className="col form-group">
                                    <input
                                        className="form-control"
                                        type="text"
                                        disabled="true"
                                        value={item.skill_name}
                                        />
                            </div>
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
                                            onChange={(evt)=>this.handleCreateFormInput("skill_name", evt)}/>
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