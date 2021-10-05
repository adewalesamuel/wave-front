import { NavLink } from 'react-router-dom'

export function MainMenu(props) {
    return(
        <div className="header-navbar navbar-expand-sm navbar navbar-horizontal navbar-fixed navbar-light navbar-without-dd-arrow" 
        role="navigation" data-menu="menu-wrapper">
            {/* <div className="navbar-header d-xl-none d-block">
                <ul className="nav navbar-nav flex-row">
                    <li className="nav-item mr-auto">
                        <a className="navbar-brand" to="index.html">
                            <div className="brand-logo">
                                <img className="logo" src={logoImg} />
                            </div>
                            <h2 className="brand-text mb-0">Wave</h2>
                        </a>
                    </li>
                    <li className="nav-item nav-toggle">
                        <a className="nav-link modern-nav-toggle pr-0" data-toggle="collapse">
                            <i className="bx bx-x d-block d-xl-none font-medium-4 primary toggle-icon"></i>
                        </a>
                    </li>
                </ul>
            </div> */}
            <div className="shadow-bottom"></div>
            <div className="navbar-container main-menu-content" data-menu="menu-container">
                <ul className="nav navbar-nav" id="main-menu-navigation" data-menu="menu-navigation">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/" exact>
                            <i className="livicon-evo" data-options="
                            name:desktop;
                            style:filled;
                            duration:0.85; 
                            strokeWidth:1.3px;
                            strokeColor:#93b69c;
                            solidColor:#93b69c;
                            fillColor:#d4f9e2;
                            strokeColorAlt:#E67E22;
                            "></i><span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/projects">
                        <i className="livicon-evo" data-options="
                            name:morph-folder;
                            style:filled;
                            duration:0.85; 
                            strokeWidth:1.3px;
                            strokeColor:#93b69c;
                            solidColor:#93b69c;
                            fillColor:#d4f9e2;
                            strokeColorAlt:#E67E22;
                            "></i><span>Projects</span>
                        </NavLink>
                    </li>                 
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/users">
                        <i className="livicon-evo" data-options="
                            name:users;
                            style:filled;
                            duration:0.85; 
                            strokeWidth:1.3px;
                            strokeColor:#93b69c;
                            solidColor:#93b69c;
                            fillColor:#d4f9e2;
                            strokeColorAlt:#E67E22;
                            "></i><span>Users</span>
                        </NavLink>
                    </li>                 
                </ul>
            </div>
        </div>
    )
}