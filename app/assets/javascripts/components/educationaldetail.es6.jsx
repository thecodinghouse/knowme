class EducationalDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            educational_details: [],
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
            url: '/api/v1/educational_details/?id=' + this.state.user_id,
            success: function (result) {
                console.log(result);
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
        this.handleSave();
    }

    handleSave() {

        console.log(this.state.educational_details);
    }

    render() {
        return (
            <div className="row card mt-5">
                    <div className="card-header">
                        Educational Profile
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

        )
    }
}