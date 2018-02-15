class Footer extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = { user_id: props.user_id,
            providers:props.providers
        };
    };

    render() {
        return (
            <div className="row">
                <h4 className="heading-h4">Connected with:</h4>
                {this.state.providers.map((item, i) => (
                    <li key={i}>{item}</li>
                ))}
            </div>
        )
    }
}