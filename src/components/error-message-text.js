export function ErrorMessageText(props) {
    return (
        <div  className="error-message">
            <div className="text text-danger text-center">
                <small className={props.className ?? ''} style={props.style}>
                    {props.children}
                </small>
            </div>
        </div>
    )
    
}