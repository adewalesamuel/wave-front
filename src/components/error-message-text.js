export function ErrorMessageText(props) {
    return (
        <div  className="error-message" style={props.style}>
            <div className="text text-danger text-center">
                <div className={props.className ?? ''}>
                    {props.children instanceof Array ? 
                      props.children.map((item, index) => {
                          return (
                              <small key={index} style={{display: "block"}}>
                                  {item}
                              </small>
                          )
                      }) : <small>{props.children}</small>
                    }
                </div>
            </div>
        </div>
    )
    
}