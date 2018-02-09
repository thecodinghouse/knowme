class Main extends React.Component{ 
    render() { 
        return ( 
            <div> 
                <section id="main">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <h1 className="main-heading">Public Profile
                                    <br/> For Developers
                                </h1>
                                <p className="txt-type-1">Easily create your public  profile which can be shared right from know.me's platform. just connect
                                    your social profiles like github, stackoverflow and facebook then customize the information and easy
                                    export to pdf.</p>
                                <a href="/users/new" className="btn btn-type-1">Get Started</a>

                            </div>

                        </div>
                    </div>
                </section>

                <section id="features" className="margin-tb100">
                    <div className="container">
                            <div className="row">
                                <div className="col">
                                    <h3 className="heading-type-2">Our Features</h3>
                                </div>
                            </div>
                        <div className="row text-center">
                            <div className="col-md-4 single-feature">
                            <span className="fas fa-share-alt icons_features green_color"></span>
                                <h5>Connect to your social profiles</h5>
                                <p>With know.me account you can connect your other social accounts like stackexchange, github, facebook etc. and the information from other accounts will get extracted and saved in your know.me profile</p>
                            </div>
                            <div className="col-md-4 single-feature">
                            <span className="far fa-file-pdf icons_features orange_color"></span>
                                <h5>Export to pdf</h5>
                                <p>
                                    Once you are done with profile customization and filling all the information, you can export your profile in pdf format like resume and you can take printout of it.
                                </p>
                            </div> 
                            <div className="col-md-4 single-feature">
                            <span className="far fa-edit icons_features blue_color"></span>
                                <h5>Easy Customization</h5>
                                <p>Know.me provides very easy platform to gather all information from your social profiles and later easily customized, you can edit the information inline without any hesitation.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div> 
        ) 
    } 
}