import { BrowserRouter } from "react-router-dom";
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";

import { Components } from "../../components";

describe("Header Component", () => {
    let div = null;
    beforeEach(() => {
    // setup a DOM element as a render target
    div = document.createElement("div");
    document.body.appendChild(div);
    });
    afterEach(() => {
        // cleanup on exiting
        unmountComponentAtNode(div);
        div.remove();
        div = null;
      });

    it('renders without crashes', () => {
        const props = {
            state: {},
            methods: {
                handleLogoutClick: () => null
            }
        };

        act(()=> {
            render(<BrowserRouter>
                <Components.Header {...props}/>
            </BrowserRouter>, div);
        });
    });

})