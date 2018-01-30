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
        // this.handleSave();
    }

    handleSave() {

        console.log(this.state.educational_details);
    }

    render() {
        return (
            <div>
                <br/>
                <h3>Educational Profile </h3>

                {this.state.educational_details.map((item,i) => (
                    <div className="mt-2" key={i}>
                        <label>Degree:</label>
                        <input
                        type="text"
                        value={item.degree}
                        onChange={(evt)=>this.handleChangeInput(i, "degree", evt)}/>
                        <br/>
                        <label>Field Of Study:</label>
                        <input
                        type="text"
                        value={item.field_of_study}
                        onChange={(evt)=>this.handleChangeInput(i, "field_of_study", evt)}/>
                        <br/>
                        <label>Year Of start:</label>
                        <input
                        type="date"
                        value={item.year_of_start}
                        onChange={(evt)=>this.handleChangeInput(i, "year_of_start", evt)}/>
                        <br/>
                        <label>Year Of end:</label>
                        <input
                        type="date"
                        value={item.year_of_end}
                        onChange={(evt)=>this.handleChangeInput(i, "year_of_end", evt)}/>
                    </div>
                ))}
            </div>
        )
    }
}