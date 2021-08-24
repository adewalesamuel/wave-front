import logoLightImg from '../app-assets/images/logo/logo-light.png';
import portraitSmallAvatarS11Img from '../app-assets/images/portrait/small/avatar-s-11.jpg';
import portraitSmallAvatarS16Img from '../app-assets/images/portrait/small/avatar-s-16.jpg';
import portraitSmallAvatarS4Img from '../app-assets/images/portrait/small/avatar-s-4.jpg'
import sketchMacIcon from '../app-assets/images/icon/sketch-mac-icon.png'

export function Header({methods, state}) {
    return(
        <nav className="header-navbar navbar-expand-lg navbar navbar-with-menu navbar-fixed bg-primary navbar-brand-center">
            <div className="navbar-header d-xl-block d-none">
                <ul className="nav navbar-nav flex-row">
                    <li className="nav-item">
                        <a className="navbar-brand" to="../../../html/ltr/horizontal-menu-template/index.html">
                            <div className="brand-logo"><img className="logo" src={logoLightImg} /></div>
                            <h2 className="brand-text mb-0">Frest</h2>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="navbar-wrapper">
                <div className="navbar-container content">
                    <div className="navbar-collapse" id="navbar-mobile">
                        <div className="mr-auto float-left bookmark-wrapper d-flex align-items-center">
                            <ul className="nav navbar-nav">
                                <li className="nav-item mobile-menu mr-auto">
                                    <a className="nav-link nav-menu-main menu-toggle" to="#">
                                        <i className="bx bx-menu"></i>
                                    </a>
                                </li>
                            </ul>
                            <ul className="nav navbar-nav bookmark-icons">
                                <li className="nav-item d-none d-lg-block">
                                    <a className="nav-link" to="app-email.html" data-toggle="tooltip" data-placement="top" 
                                    title="Email">
                                        <i className="ficon bx bx-envelope"></i>
                                    </a>
                                </li>
                                <li className="nav-item d-none d-lg-block">
                                    <a className="nav-link" to="app-chat.html" data-toggle="tooltip" data-placement="top" 
                                    title="Chat">
                                        <i className="ficon bx bx-chat"></i>
                                    </a>
                                </li>
                                <li className="nav-item d-none d-lg-block">
                                    <a className="nav-link" to="app-todo.html" data-toggle="tooltip" data-placement="top" 
                                    title="Todo">
                                        <i className="ficon bx bx-check-circle"></i>
                                    </a>
                                </li>
                                <li className="nav-item d-none d-lg-block">
                                    <a className="nav-link" to="app-calendar.html" data-toggle="tooltip" data-placement="top" 
                                    title="Calendar">
                                        <i className="ficon bx bx-calendar-alt"></i>
                                    </a>
                                </li>
                            </ul>
                            <ul className="nav navbar-nav">
                                <li className="nav-item d-none d-lg-block"><a className="nav-link bookmark-star">
                                    <i className="ficon bx bx-star warning"></i></a>
                                    <div className="bookmark-input search-input">
                                        <div className="bookmark-input-icon"><i className="bx bx-search primary"></i></div>
                                        <input className="form-control input" type="text" placeholder="Explore Frest..." 
                                        tabIndex="0" data-search="template-search" />
                                        <ul className="search-list"></ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <ul className="nav navbar-nav float-right d-flex align-items-center">
                            <li className="dropdown dropdown-language nav-item">
                                <a className="dropdown-toggle nav-link" 
                            id="dropdown-flag" to="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="flag-icon flag-icon-us"></i>
                                    <span className="selected-language d-lg-inline d-none">English</span>
                                </a>
                                <div className="dropdown-menu" aria-labelledby="dropdown-flag">
                                    <a className="dropdown-item" to="#" data-language="en">
                                        <i className="flag-icon flag-icon-us mr-50"></i>English
                                    </a>
                                    <a className="dropdown-item" to="#" data-language="fr">
                                        <i className="flag-icon flag-icon-fr mr-50"></i>French
                                    </a>
                                    <a className="dropdown-item" to="#" data-language="de">
                                        <i className="flag-icon flag-icon-de mr-50"></i>German
                                    </a>
                                    <a className="dropdown-item" to="#" data-language="pt">
                                        <i className="flag-icon flag-icon-pt mr-50"></i>Portuguese
                                        </a>
                                </div>
                            </li>
                            <li className="nav-item d-none d-lg-block">
                                <a className="nav-link nav-link-expand">
                                    <i className="ficon bx bx-fullscreen"></i>
                                </a>
                            </li>
                            <li className="nav-item nav-search">
                                <a className="nav-link nav-link-search pt-2">
                                    <i className="ficon bx bx-search"></i>
                                </a>
                                <div className="search-input">
                                    <div className="search-input-icon"><i className="bx bx-search primary"></i></div>
                                    <input className="input" type="text" placeholder="Explore Frest..." tabIndex="-1" 
                                    data-search="template-search" />
                                    <div className="search-input-close"><i className="bx bx-x"></i></div>
                                    <ul className="search-list"></ul>
                                </div>
                            </li>
                            <li className="dropdown dropdown-notification nav-item">
                                <a className="nav-link nav-link-label" to="#" data-toggle="dropdown">
                                    <i className="ficon bx bx-bell bx-tada bx-flip-horizontal"></i>
                                    <span className="badge badge-pill badge-danger badge-up">5</span>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-media dropdown-menu-right">
                                    <li className="dropdown-menu-header">
                                        <div className="dropdown-header px-1 py-75 d-flex justify-content-between">
                                            <span className="notification-title">7 new Notification</span>
                                            <span className="text-bold-400 cursor-pointer">Mark all as read</span>
                                        </div>
                                    </li>
                                    <li className="scrollable-container media-list">
                                        <a className="d-flex justify-content-between" to="javascript:void(0)">
                                            <div className="media d-flex align-items-center">
                                                <div className="media-left pr-0">
                                                    <div className="avatar mr-1 m-0">
                                                        <img src={portraitSmallAvatarS11Img} alt="avatar" height="39" width="39" />
                                                    </div>
                                                </div>
                                                <div className="media-body">
                                                    <h6 className="media-heading">
                                                        <span className="text-bold-500">Congratulate Socrates Itumay</span> for work anniversaries
                                                    </h6>
                                                    <small className="notification-text">Mar 15 12:32pm</small>
                                                </div>
                                            </div>
                                        </a>
                                        <div className="d-flex justify-content-between read-notification cursor-pointer">
                                            <div className="media d-flex align-items-center">
                                                <div className="media-left pr-0">
                                                    <div className="avatar mr-1 m-0">
                                                        <img src={portraitSmallAvatarS16Img} alt="avatar" height="39" width="39" />
                                                    </div>
                                                </div>
                                                <div className="media-body">
                                                    <h6 className="media-heading">
                                                        <span className="text-bold-500">New Message</span> received
                                                    </h6>
                                                    <small className="notification-text">You have 18 unread messages</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between cursor-pointer">
                                            <div className="media d-flex align-items-center py-0">
                                                <div className="media-left pr-0">
                                                    <img className="mr-1" src={sketchMacIcon} alt="avatar" height="39" width="39" />
                                                </div>
                                                <div className="media-body">
                                                    <h6 className="media-heading">
                                                        <span className="text-bold-500">Updates Available</span>
                                                    </h6>
                                                    <small className="notification-text">Sketch 50.2 is currently newly added</small>
                                                </div>
                                                <div className="media-right pl-0">
                                                    <div className="row border-left text-center">
                                                        <div className="col-12 px-50 py-75 border-bottom">
                                                            <h6 className="media-heading text-bold-500 mb-0">Update</h6>
                                                        </div>
                                                        <div className="col-12 px-50 py-75">
                                                            <h6 className="media-heading mb-0">Close</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between cursor-pointer">
                                            <div className="media d-flex align-items-center">
                                                <div className="media-left pr-0">
                                                    <div className="avatar bg-primary bg-lighten-5 mr-1 m-0 p-25">
                                                        <span className="avatar-content text-primary font-medium-2">LD</span>
                                                    </div>
                                                </div>
                                                <div className="media-body">
                                                    <h6 className="media-heading">
                                                        <span className="text-bold-500">New customer</span> is registered
                                                    </h6><small className="notification-text">1 hrs ago</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="cursor-pointer">
                                            <div className="media d-flex align-items-center justify-content-between">
                                                <div className="media-left pr-0">
                                                    <div className="media-body">
                                                        <h6 className="media-heading">New Offers</h6>
                                                    </div>
                                                </div>
                                                <div className="media-right">
                                                    <div className="custom-control custom-switch">
                                                        <input className="custom-control-input" type="checkbox" 
                                                        id="notificationSwtich" />
                                                        <label className="custom-control-label" htmlFor="notificationSwtich"></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between cursor-pointer">
                                            <div className="media d-flex align-items-center">
                                                <div className="media-left pr-0">
                                                    <div className="avatar bg-danger bg-lighten-5 mr-1 m-0 p-25">
                                                        <span className="avatar-content"><i className="bx bxs-heart text-danger"></i></span>
                                                    </div>
                                                </div>
                                                <div className="media-body">
                                                    <h6 className="media-heading">
                                                        <span className="text-bold-500">Application</span> has been approved
                                                    </h6>
                                                    <small className="notification-text">6 hrs ago</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between read-notification cursor-pointer">
                                            <div className="media d-flex align-items-center">
                                                <div className="media-left pr-0">
                                                    <div className="avatar mr-1 m-0">
                                                        <img src={portraitSmallAvatarS4Img} alt="avatar" height="39" width="39" />
                                                    </div>
                                                </div>
                                                <div className="media-body">
                                                    <h6 className="media-heading">
                                                        <span className="text-bold-500">New file</span> has been uploaded
                                                    </h6><small className="notification-text">4 hrs ago</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between cursor-pointer">
                                            <div className="media d-flex align-items-center">
                                                <div className="media-left pr-0">
                                                    <div className="avatar bg-rgba-danger m-0 mr-1 p-25">
                                                        <div className="avatar-content">
                                                            <i className="bx bx-detail text-danger"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="media-body">
                                                    <h6 className="media-heading">
                                                        <span className="text-bold-500">Finance report</span> has been generated
                                                    </h6>
                                                    <small className="notification-text">25 hrs ago</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between cursor-pointer">
                                            <div className="media d-flex align-items-center border-0">
                                                <div className="media-left pr-0">
                                                    <div className="avatar mr-1 m-0">
                                                        <img src={portraitSmallAvatarS16Img} alt="avatar" height="39" width="39" />
                                                    </div>
                                                </div>
                                                <div className="media-body">
                                                    <h6 className="media-heading">
                                                        <span className="text-bold-500">New customer</span> comment recieved
                                                    </h6>
                                                    <small className="notification-text">2 days ago</small>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="dropdown-menu-footer">
                                        <a className="dropdown-item p-50 text-primary justify-content-center" to="javascript:void(0)">
                                            Read all notifications
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="dropdown dropdown-user nav-item">
                                <a className="dropdown-toggle nav-link dropdown-user-link" role="button" to="#" data-toggle="dropdown">
                                    <div className="user-nav d-lg-flex d-none">
                                        <span className="user-name">John Doe</span>
                                        <span className="user-status">Online</span>
                                    </div>
                                    <span>
                                        <img className="round" src={portraitSmallAvatarS11Img} alt="avatar" height="40" width="40" />
                                    </span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right pb-0">
                                    <a className="dropdown-item" to="page-user-profile.html">
                                        <i className="bx bx-user mr-50"></i> Edit Profile
                                    </a>
                                    <a className="dropdown-item" to="app-email.html">
                                        <i className="bx bx-envelope mr-50"></i> My Inbox
                                    </a>
                                    {/* <a className="dropdown-item" to="app-todo.html">
                                        <i className="bx bx-check-square mr-50"></i> Task
                                    </a>
                                    <a className="dropdown-item" to="app-chat.html">
                                        <i className="bx bx-message mr-50"></i> Chats
                                    </a> */}
                                    <div className="dropdown-divider mb-0"></div>
                                    <a className="dropdown-item" role="button"
                                     id="logoutBtn" onClick={methods.onHandleLogoutClick}>
                                        <i className="bx bx-power-off mr-50"></i> Logout
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}