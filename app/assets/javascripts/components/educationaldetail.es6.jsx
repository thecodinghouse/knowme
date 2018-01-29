class EducationalDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            educational_detail: props.educational_detail
        };
    };
    componentDidMount() {
        $.ajax({
            method: 'GET',
            data: {
                educational_detail: this.state.educational_detail,
            },
            url: '/api/v1/educational_details/' + this.state.educational_detail.id,
            success: function (result) {
                this.setState({
                    educational_detail: result,
                });
            }
        });
    }

    render() {
        return (
            <div className="row">
                <h1>Educational Profile </h1>
                <tr>
                    <td>
                        <label>Year Of start:</label>
                        <input
                            type="text"
                            value={this.state.educational_detail.year_of_start}
                            onChange={this.handleChange.bind(this)}/>
                    </td>
                </tr>
            </div>
        )
    }

    handleChange(e) {
        var educational_detail = this.state.educational_detail;
        educational_detail.year_of_start = e.target.value;
        this.setState({educational_detail: educational_detail});
    }
}