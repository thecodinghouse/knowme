class Achievement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            achievements: [],
            user_id: props.user_id
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
            url: '/api/v1/achievements/?id=' + this.state.user_id,
            success: function (result) {
                console.log(result);
                that.setState({
                    achievements: result,
                });
            }
        });
    };

    handleChangeInput(i, key, e) {
        let achievements = this.state.achievements;
        achievements[i][key] = e.target.value;
        this.setState({achievements: achievements});
        this.handleSave(achievements);
    }

    handleSave(data) {
        if (this.typingTimer) {
            clearTimeout(this.typingTimer);
        }
        this.typingTimer = setTimeout(() => {
            this.doneTyping(data)
        }, 5000);
    }

    doneTyping(data) {
        console.log(data)
        $.ajax({
            method: 'PATCH',
            headers: {
                "Authorization": localStorage.getItem('auth_token'),
            },
            data: {achievements: data},
            url: '/api/v1/achievement_update',
            success: function (result) {
                console.log(result);
            }
        });
    }

    render() {
        return (
            <div className="row card mt-5">
                <div className="card-header">
                    Achievements
                </div>
                <div className="card-body">
                    {this.state.achievements.map((item, i) => (
                        <div className="mt-2" key={i}>

                            <div className="form-row">
                                <div className="col form-group">
                                    <label>Title</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={item.title}
                                        onChange={(evt) => this.handleChangeInput(i, "title", evt)}/>
                                </div>
                                <div className="col form-group">
                                    <label>Year Of Issue:</label>
                                    <input
                                        className="form-control"
                                        type="date"
                                        value={item.year_issued}
                                        onChange={(evt) => this.handleChangeInput(i, "year_issued", evt)}/>
                                </div>

                            </div>
                            <div className="form-row">

                                <label>Description</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={item.description}
                                    onChange={(evt) => this.handleChangeInput(i, "description", evt)}/>

                            </div>
                            <hr/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}