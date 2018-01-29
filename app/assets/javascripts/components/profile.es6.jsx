class Profile extends React.Component{ 

    constructor(props, context) {
        super(props, context);
    
        this.state = { user: props.user};
    };

    render() { 
        return (
            <div class="row">
                <tr>
                    <td><h2>Welcome {this.state.user.email}</h2></td>       
                </tr>
            </div>
        )
    }
}