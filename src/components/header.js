import logoLightImg from '../app-assets/images/logo/logo-light.png';
import portraitSmallAvatarS11Img from '../app-assets/images/portrait/small/avatar-s-11.jpg';
import portraitSmallAvatarS16Img from '../app-assets/images/portrait/small/avatar-s-16.jpg';
import { Link } from 'react-router-dom';

export function Header({methods, state}) {
    return(
        <nav className="header-navbar navbar-expand-lg navbar navbar-with-menu navbar-fixed bg-primary navbar-brand-center">
            <div className="navbar-header d-xl-block d-none">
                <ul className="nav navbar-nav flex-row">
                    <li className="nav-item">
                        <Link className="navbar-brand" to="/">
                            <div className="brand-logo"><img className="logo" src={logoLightImg} alt="wave logo" style={{height:"60px", transform: "translateY(-10px)"}}/></div>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-wrapper">
                <div className="navbar-container content">
                    <div className="navbar-collapse" id="navbar-mobile">
                        <div className="mr-auto float-left bookmark-wrapper d-flex align-items-center">
                            <ul className="nav navbar-nav">
                                <li className="nav-item mobile-menu mr-auto">
                                    <button className="nav-link nav-menu-main menu-toggle link">
                                        <i className="bx bx-menu"></i>
                                    </button>
                                </li>
                            </ul>
                            <ul className="nav navbar-nav bookmark-icons">
                                <li className="nav-item d-none d-lg-block">
                                    <Link className="nav-link" to="/" data-toggle="tooltip" data-placement="top" 
                                    title="Email">
                                        <i className="ficon bx bx-envelope"></i>
                                    </Link>
                                </li>
                                {/* <li className="nav-item d-none d-lg-block">
                                    <a className="nav-link" to="app-chat.html" data-toggle="tooltip" data-placement="top" 
                                    title="Chat">
                                        <i className="ficon bx bx-chat"></i>
                                    </a>
                                </li> */}
                                <li className="nav-item d-none d-lg-block">
                                    <Link className="nav-link" to="/" data-toggle="tooltip" data-placement="top" 
                                    title="Calendar">
                                        <i className="ficon bx bx-calendar-alt"></i>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <ul className="nav navbar-nav float-right d-flex align-items-center">
                            <li className="dropdown dropdown-language nav-item">
                                <button className="dropdown-toggle nav-link link" id="dropdown-flag" 
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="flag-icon flag-icon-us"></i>
                                    <span className="selected-language d-lg-inline d-none">English</span>
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdown-flag">
                                    <span className="dropdown-item" role="button" data-language="en">
                                        <i className="flag-icon flag-icon-us mr-50"></i>English
                                    </span>
                                    <span className="dropdown-item" role="button" data-language="fr">
                                        <i className="flag-icon flag-icon-fr mr-50"></i>French
                                    </span>
                                </div>
                            </li>
                            <li className="nav-item d-none d-lg-block">
                                <button className="nav-link nav-link-expand link">
                                    <i className="ficon bx bx-fullscreen"></i>
                                </button>
                            </li>
                            <li className="nav-item nav-search">
                                <button className="nav-link nav-link-search pt-2 link">
                                    <i className="ficon bx bx-search"></i>
                                </button>
                                <div className="search-input">
                                    <div className="search-input-icon"><i className="bx bx-search primary"></i></div>
                                    <input className="input" type="text" placeholder="Explore Frest..." tabIndex="-1" 
                                    data-search="template-search" />
                                    <div className="search-input-close"><i className="bx bx-x"></i></div>
                                    <ul className="search-list"></ul>
                                </div>
                            </li>
                            <li className="dropdown dropdown-notification nav-item">
                                <button className="nav-link nav-link-label link" data-toggle="dropdown">
                                    <i className="ficon bx bx-bell bx-tada bx-flip-horizontal"></i>
                                    <span className="badge badge-pill badge-danger badge-up">0</span>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-media dropdown-menu-right">
                                    <li className="dropdown-menu-header">
                                        <div className="dropdown-header px-1 py-75 d-flex justify-content-between">
                                            <span className="notification-title">0 new Notification(s)</span>
                                            <span className="text-bold-400 cursor-pointer">Mark all as read</span>
                                        </div>
                                    </li>
                                    <li className="scrollable-container media-list">
                                        
                                        <div className="d-flex justify-content-between cursor-pointer">
                                            <div className="media d-flex align-items-center border-0">
                                                <div className="media-left pr-0">
                                                    <div className="avatar mr-1 m-0">
                                                        <img src={portraitSmallAvatarS16Img} alt="avatar" height="39" width="39" />
                                                    </div>
                                                </div>
                                                <div className="media-body">
                                                    <h6 className="media-heading">
                                                        <span className="text-bold-500">Example user</span> comment recieved
                                                    </h6>
                                                    <small className="notification-text">2 days ago</small>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="dropdown-menu-footer">
                                        <button className="dropdown-item p-50 text-primary justify-content-center">
                                            Read all notifications
                                        </button>
                                    </li>
                                </ul>
                            </li>
                            <li className="dropdown dropdown-user nav-item">
                                <button className="dropdown-toggle nav-link link user-link" data-toggle="dropdown">
                                    <div className="user-nav d-lg-flex d-none">
                                        <span className="user-name">John Doe</span>
                                        <span className="user-status">Online</span>
                                    </div>
                                    <span>
                                        <img className="round" src={portraitSmallAvatarS11Img} alt="avatar" height="40" width="40" />
                                    </span>
                                </button>
                                <div className="dropdown-menu dropdown-menu-right pb-0">
                                    <Link className="dropdown-item" to="/">
                                        <i className="bx bx-envelope mr-50"></i> My Inbox
                                    </Link>
                                    <Link className="dropdown-item" to="/">
                                        <i className="bx bx-user mr-50"></i> Edit Profile
                                    </Link>
                                    {/* <a className="dropdown-item" to="app-todo.html">
                                        <i className="bx bx-check-square mr-50"></i> Task
                                    </a>
                                    <a className="dropdown-item" to="app-chat.html">
                                        <i className="bx bx-message mr-50"></i> Chats
                                    </a> */}
                                    <div className="dropdown-divider mb-0"></div>
                                    <span className="dropdown-item"id="logoutBtn" role="button"onClick={methods.onHandleLogoutClick}>
                                        <i className="bx bx-power-off mr-50"></i> Logout
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}