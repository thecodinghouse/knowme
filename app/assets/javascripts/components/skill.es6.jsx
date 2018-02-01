class Skill extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            skills: [],
            user_id: props.user_id
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
                console.log(result);
                that.setState({
                    skills: result,
                });
            }
        });
    };

    handleChangeInput(i, key, e) {
        let skills = this.state.skills;
        skills[i][key] = e.target.value;
        this.setState({skills: skills});
        this.handleSave();
    }

    handleSave() {

        console.log(this.state.skills);
    }

    render() {
        return (
            <div className="row card mt-5">
                <div className="card-header">
                    Skills
                </div>
                <div className="card-body">
                    {this.state.skills.map((item, i) => (
                        <div className="mt-2" key={i}>

                            <div className="form-row">
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={item.skill_name}
                                        onChange={(evt) => this.handleChangeInput(i, "skill_name", evt)}/>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}