export function SuccessMessageText(props) {
    return (
        <div  className="error-message">
            <div className="text text-success text-center">
                <small className={props.className ?? ''} style={props.style}>
                    {props.children}
                </small>
            </div>
        </div>
    )
    
}