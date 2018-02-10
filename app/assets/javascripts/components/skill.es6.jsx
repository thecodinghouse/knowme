class Skill extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditMode: props.isEditMode,
            skills: [],
            all_skills: [],
            user_id: props.user_id,
            // skill:{}
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
                    skills: result.user_skills,
                    all_skills: result.all_skills
                });

                $('#skill-tags').selectize({
                    plugins: ['restore_on_backspace'],
                    delimiter: ',',
                    persist: false,
                    options: result.all_skills,
                    create: function(input) {
                        return {
                            value: input,
                            text: input
                        }
                    }
                });
            }
        });
    };

    handleAddSkill(){ 
        if(this.state.isEditMode){
            let that = this  
            let skill_value = $('#skill-tags').val();

            console.log(skill_value);
            $.ajax({
                method: 'POST',
                headers: {
                    "Authorization": localStorage.getItem('auth_token'),
                },
                data: {skill: {name: skill_value}},
                url: '/api/v1/skills',
                success: function (result) {
                    that.setState({
                        skills: result,
                    })
                    $('#skillModal').modal('hide');
                }
            });
        }
    }

    handleRemoveSkill(i){ 
        if(this.state.isEditMode){
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
    }

    render() {
        return (
            <div className="row">

                <div className="col-lg-12 border-top-1 work-exp position-relative margin-tb20">
                    <a href="#"  data-toggle="modal" data-target="#skillModal" className="position-absolute add-btn">
                        <span className="fa fa-plus"></span>
                    </a>


                    <h4 className="heading-h4">Skills</h4>

                    <div className="row">
                        <div className="col">
                        {this.state.skills.map((item, i) => (
                
                            <div className="single-skill" key={i}>{item.name}
                                <span className="fa fa-times  remove-skill" onClick={(evt)=>this.handleRemoveSkill(i)}></span>
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
                                                id="skill-tags"
                                                className="form-control selectized hide-input"
                                                type="text"
                                                />
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