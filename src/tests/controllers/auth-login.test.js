import { BrowserRouter } from "react-router-dom";
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";

import { Controllers } from "../../controllers";

describe("Auth Login Controller", () => {
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

    it('renders login view without crashes', () => {
        act(()=> {
            render(<BrowserRouter>
                <Controllers.Auth.Login />
            </BrowserRouter>, div);
        });

        expect(div.querySelector('form[name=login]')).toBeInTheDocument();
    });

})