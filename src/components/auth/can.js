import { Modules } from "../../modules";

export function Can(props) {
    if (!props.permission) return null;

    return (
        <>
            {Modules.Auth.getUser().hasPermission(props.permission) ? 
                props.children : null
            }
        </>
    )
}