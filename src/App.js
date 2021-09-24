import React from "react";
import {
  BrowserRouter,
  Route, 
  Switch
} from 'react-router-dom';
import { Components } from "./components";
import './app-assets/vendors/css/vendors.min.css';
import './app-assets/css/bootstrap.css';
import './app-assets/css/bootstrap-extended.css';
import './app-assets/css/colors.css';
import './app-assets/css/components.css';
import './app-assets/css/themes/dark-layout.css';
import './app-assets/css/themes/semi-dark-layout.css';
import './app-assets/css/core/menu/menu-types/horizontal-menu.css';

class App extends React.Component {
  render() {
    return(
     <BrowserRouter>
      <Switch>
        <Route path="/auth" render={Components.Routes.Auth} />
        <Route path="*" component={Components.Routes.Main} />
      </Switch>
     </BrowserRouter>
    );
  }
}

export default App;
