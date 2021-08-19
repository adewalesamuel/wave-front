import React from "react";

export function Root(props) {
    return(
        <div className={props.className ?? ''}>
            This is a test page
        </div>
    )
}