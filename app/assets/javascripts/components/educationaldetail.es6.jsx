class EducationalDetail extends React.Component {

    constructor(props) {
        console.log("props", props);
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
    }
    handleChange_year_of_start(e, i) {
        var educational_details = this.state.educational_details;
        educational_details[i].year_of_start = e.target.value;
        this.setState({educational_details: educational_details});
    }
    handleChange_year_of_end(e, i) {
        var educational_details = this.state.educational_details;
        educational_details[i].year_of_end = e.target.value;
        this.setState({educational_details: educational_details});
    }
    handleChange_degree(e, i) {
        var educational_details = this.state.educational_details;
        educational_details[i].degree = e.target.value;
        this.setState({educational_details: educational_details});
    }
    handleChange_field_of_study(e, i) {
        var educational_details = this.state.educational_details;
        educational_details[i].field_of_study = e.target.value;
        this.setState({educational_details: educational_details});
    }
    handleSave(e, i) {
        console.log(this.state.educational_details);
    }

    render() {
        return (
            <div>
                <br/>
                <h3>Educational Profile </h3>

                {this.state.educational_details.map(item => (
                    <div>
                        <label>Degree:</label>
                        <input
                        type="text"
                        value={item.degree}
                        onChange={this.handleChange_degree.bind(this)}/>
                        <br/>
                        <label>Field Of Study:</label>
                        <input
                        type="text"
                        value={item.field_of_study}
                        onChange={this.handleChange_field_of_study.bind(this)}/>
                        <br/>
                        <label>Year Of start:</label>
                        <input
                        type="date"
                        value={item.year_of_start}
                        onChange={this.handleChange_year_of_start.bind(this)}/>
                        <br/>
                        <label>Year Of end:</label>
                        <input
                        type="date"
                        value={item.year_of_end}
                        onChange={this.handleChange_year_of_end.bind(this)}/>
                        <button onClick={this.handleSave.bind(this)}>Save!</button>
                    </div>
                ))}
            </div>
        )
    }
}