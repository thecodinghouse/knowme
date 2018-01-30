class ExperienceDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            experience_details: [],
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
            url: '/api/v1/experience_details/?id=' + this.state.user_id,
            success: function (result) {
                console.log(result);
                that.setState({
                    experience_details: result,
                });
            }
        });
    };

    handleChangeInput(i, key, e) {
        let experience_details = this.state.experience_details;
        experience_details[i][key] = e.target.value;
        this.setState({experience_details: experience_details});
        this.handleSave();
    }

    handleSave() {

        console.log(this.state.experience_details);
    }

    render() {
        return (
            <div className="row card mt-5">
                <div className="card-header">
                    Experience Profile
                </div>
                <div className="card-body">
                    {this.state.experience_details.map((item, i) => (
                        <div className="mt-2" key={i}>

                            <div className="form-row">
                                <div className="col form-group">
                                    <label>Name Of Company:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={item.company_name}
                                        onChange={(evt) => this.handleChangeInput(i, "company_name", evt)}/>
                                </div>
                                <div className="col form-group">
                                    <label>Designation:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={item.designation}
                                        onChange={(evt) => this.handleChangeInput(i, "designation", evt)}/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col form-group">
                                    <label>Year Of start:</label>
                                    <input
                                        className="form-control"
                                        type="date"
                                        value={item.year_of_start}
                                        onChange={(evt) => this.handleChangeInput(i, "year_of_start", evt)}/>
                                </div>
                                <div className="col form-group">
                                    <label>Year Of end:</label>
                                    <input
                                        className="form-control"
                                        type="date"
                                        value={item.year_of_end}
                                        onChange={(evt) => this.handleChangeInput(i, "year_of_end", evt)}/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col form-group">
                                <label>Location:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={item.location}
                                    onChange={(evt) => this.handleChangeInput(i, "location", evt)}/>
                                </div>
                                <div className="col form-group">
                                <div className="form-check mt-4">
                                    <input className="form-check-input"
                                           type="checkbox"
                                           value={item.currently_working}
                                           defaultChecked="defaultChecked"
                                           onChange={(evt) => this.handleChangeInput(i, "currently_working", evt)}
                                           id="gridCheck"/>
                                    <label className="form-check-label" htmlFor="gridCheck">
                                        Currently Working
                                    </label>
                                </div>
                            </div>
                            </div>
                        <hr/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}