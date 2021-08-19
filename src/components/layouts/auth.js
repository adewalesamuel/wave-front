export function Auth(props) {
    return (
        <div className="app-content content">
            <div className="content-overlay"></div>
            <div className="content-wrapper">
                <div className="content-header row">
                </div>
                <div className="content-body">
                    {props.children}
                </div>
            </div>
        </div>
    )
}