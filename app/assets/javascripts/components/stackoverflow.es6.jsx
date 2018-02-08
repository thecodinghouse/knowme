
class StackExchangeRepo extends React.Component{ 

    constructor(props, context) {
        super(props, context);
        this.state = { 
            user_id: props.user_id, 
            stack:[]
        };
        
    };

    componentDidMount(){
        var that = this;
        $.ajax({
            method: 'GET',
            headers: {
                "Authorization": localStorage.getItem('auth_token'),
            },
            url: '/api/v1/users/stackoverflow?id='+ that.state.user_id,
            success: function (result) {
                if(!(Object.keys(result).length === 0)){
                    that.setState({
                        stack: [result],
                    });
                }
            }
        });
    }


    render() { 
        return (
            <div className="row">
            <div className="col-lg-12 border-top-1 work-exp position-relative margin-tb20">
                <h4 className="heading-h4">Stackoverflow</h4>
                {this.state.stack.map((item, i) => (
                <div className="stackoverflowinfo" key={i}>
                        <aside className="g-col g-column -card -badges js-highlight-box-badges">
                            <h1 className="g-col fl-none -title">Badges</h1>
                            <div className="g-row _gutters ai-start fl-none -row-first">
                                <div className="g-col g-row g-center badge1-alternate" title="1 gold badge">
                                    <span className="g-col fl-none -badge badge1"></span>
                                    <span className="g-col g-center -total">{item.raw_info.badge_counts.gold}</span>
                                </div>
                        
                                <div className="g-col g-row g-center badge2-alternate" title="9 silver badges">
                                    <span className="g-col fl-none -badge badge2"></span>
                                    <span className="g-col g-center -total">{item.raw_info.badge_counts.silver}</span>
                                </div>
                        
                                <div className="g-col g-row g-center badge3-alternate" title="25 bronze badges">
                                    <span className="g-col fl-none -badge badge3"></span>
                                    <span className="g-col g-center -total">{item.raw_info.badge_counts.bronze}</span>
                                </div>
                            </div>
                        
                        
                                <div className="g-row -row-last">
                                        <div className="g-col g-column -badge-newest">
                                            <h1 className="g-col fl-none -title">Reputation</h1>
                                            <div className="g-row _gutters fl-none ">
                                                <span className="g-col fl-none -rep">{item.raw_info.reputation}</span>
                                            </div>
                                        </div>
                                        <div className="g-col6 g-column ml-auto">
                                            <div className="g-col g-row _gutters fl-none">
                                                <h2 className="g-col fl-none -subtitle">Accept Rate</h2>
                                                <span className="g-col jc-end -subtitle -count">{item.raw_info.accept_rate}/100</span>
                                            </div>
                                            <div className="g-col fl-none">
                                                <div id="badge-card-next" className="s-progress-bar _badge _badge1 js-badge-select-popup js-gps-track" data-gps-track="profile_next_badge.click({ view_type: 2 })">
                                                    <div className="g-row _gutters ai-center -info">
                                                        {/* <span className="g-col fl-none ai-center badge1"></span>
                                                        <span className="g-col jc-center -label"></span> */}
                                                    </div>
                                                    <span className="-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={item.raw_info.accept_rate} style={{width: 'calc((100% - '+item.raw_info.accept_rate+'%) + 1px)'}}></span>
                                                    <span className="-fill"></span>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            </aside>
                </div>
                ))}
            </div>
            </div>
        ) 
    } 
}
