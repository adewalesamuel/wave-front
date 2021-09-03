export function ErrorMessageText(props) {
    return (
        <div  className="error-message" style={props.style}>
            <div className="text text-danger text-center">
                <small className={props.className ?? ''}>
                    {props.children}
                </small>
            </div>
        </div>
    )
    
}