import logoImg from '../app-assets/images/logo/logo.png' 

export function MainMenu(props) {
    console.log(props)
    return(
        <div className="header-navbar navbar-expand-sm navbar navbar-horizontal navbar-fixed navbar-light navbar-without-dd-arrow" 
        role="navigation" data-menu="menu-wrapper">
            <div className="navbar-header d-xl-none d-block">
                <ul className="nav navbar-nav flex-row">
                    <li className="nav-item mr-auto">
                        <a className="navbar-brand" to="index.html">
                            <div className="brand-logo">
                                <img className="logo" src={logoImg} />
                            </div>
                            <h2 className="brand-text mb-0">Frest</h2>
                        </a>
                    </li>
                    <li className="nav-item nav-toggle">
                        <a className="nav-link modern-nav-toggle pr-0" data-toggle="collapse">
                            <i className="bx bx-x d-block d-xl-none font-medium-4 primary toggle-icon"></i>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="shadow-bottom"></div>
            <div className="navbar-container main-menu-content" data-menu="menu-container"> {/* className="navbar-container main-menu-content" */}
                <ul className="nav navbar-nav" id="main-menu-navigation" data-menu="menu-navigation" data-icon-style="filled">
                    <li className="dropdown nav-item" data-menu="dropdown">
                        <a className="dropdown-toggle nav-link" to="index.html" data-toggle="dropdown">
                            <i className="menu-livicon" data-icon="desktop"></i><span data-i18n="Dashboard">Dashboard</span>
                        </a>
                        <ul className="dropdown-menu">
                            <li data-menu="">
                                <a className="dropdown-item align-items-center" to="dashboard-ecommerce.html" 
                                data-toggle="dropdown">
                                    <i className="bx bx-right-arrow-alt"></i>eCommerce
                                </a>
                            </li>
                            <li className="active" data-menu="">
                                <a className="dropdown-item align-items-center" to="dashboard-analytics.html" 
                                data-toggle="dropdown">
                                    <i className="bx bx-right-arrow-alt"></i>Analytics
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="dropdown nav-item" data-menu="dropdown">
                        <a className="dropdown-toggle nav-link" to="#" data-toggle="dropdown">
                            <i className="menu-livicon" data-icon="comments"></i><span>Apps</span>
                        </a>
                        <ul className="dropdown-menu">
                            <li data-menu="">
                                <a className="dropdown-item align-items-center" to="app-email.html" data-toggle="dropdown">
                                    <i className="bx bx-right-arrow-alt"></i>Email
                                </a>
                            </li>
                            <li data-menu="">
                                <a className="dropdown-item align-items-center" to="app-chat.html" data-toggle="dropdown">
                                    <i className="bx bx-right-arrow-alt"></i>Chat
                                </a>
                            </li>
                            <li data-menu="">
                                <a className="dropdown-item align-items-center" to="app-todo.html" data-toggle="dropdown">
                                    <i className="bx bx-right-arrow-alt"></i>Todo
                                </a>
                            </li>
                            <li data-menu="">
                                <a className="dropdown-item align-items-center" to="app-calendar.html" data-toggle="dropdown">
                                    <i className="bx bx-right-arrow-alt"></i>Calendar
                                </a>
                            </li>
                            <li data-menu="">
                                <a className="dropdown-item align-items-center" to="app-kanban.html" data-toggle="dropdown">
                                    <i className="bx bx-right-arrow-alt"></i>Kanban
                                </a>
                            </li>
                            <li className="dropdown dropdown-submenu" data-menu="dropdown-submenu">
                                <a className="dropdown-item align-items-center dropdown-toggle" to="#" data-toggle="dropdown">
                                    <i className="bx bx-right-arrow-alt"></i>Invoice</a>
                                <ul className="dropdown-menu">
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="app-invoice-list.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Invoice List
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="app-invoice.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Invoice
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="app-invoice-edit.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Invoice Edit
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="app-invoice-add.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Invoice Add
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li data-menu="">
                                <a className="dropdown-item align-items-center" to="app-file-manager.html" 
                                data-toggle="dropdown">
                                    <i className="bx bx-right-arrow-alt"></i>File Manager
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="dropdown nav-item" data-menu="dropdown">
                        <a className="dropdown-toggle nav-link" to="#" data-toggle="dropdown">
                            <i className="menu-livicon" data-icon="briefcase"></i><span>UI</span>
                        </a>
                        <ul className="dropdown-menu">
                            <li className="dropdown dropdown-submenu" data-menu="dropdown-submenu">
                                <a className="dropdown-item align-items-center dropdown-toggle" to="#" data-toggle="dropdown">
                                    <i className="bx bx-right-arrow-alt"></i>Content
                                </a>
                                <ul className="dropdown-menu">
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="content-grid.html" data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Grid
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="content-typography.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Typography
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="content-text-utilities.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Text Utilities
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="content-syntax-highlighter.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Syntax Highlighter
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="content-helper-classNamees.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Helper ClassNamees
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li data-menu="">
                                <a className="dropdown-item align-items-center" to="colors.html" data-toggle="dropdown">
                                    <i className="bx bx-right-arrow-alt"></i>Colors
                                </a>
                            </li>
                            <li className="dropdown dropdown-submenu" data-menu="dropdown-submenu">
                                <a className="dropdown-item align-items-center dropdown-toggle" to="#" data-toggle="dropdown">
                                    <i className="bx bx-right-arrow-alt"></i>Icons
                                </a>
                                <ul className="dropdown-menu">
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="icons-boxicons.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Boxicons
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="icons-livicons.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>LivIcons
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="dropdown dropdown-submenu" data-menu="dropdown-submenu">
                                <a className="dropdown-item align-items-center dropdown-toggle" to="#" data-toggle="dropdown">
                                    <i className="bx bx-right-arrow-alt"></i>Card
                                </a>
                                <ul className="dropdown-menu">
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="card-basic.html" data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Basic
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="card-actions.html" data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Card Actions
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li data-menu="">
                                <a className="dropdown-item align-items-center" to="widgets.html" data-toggle="dropdown">
                                    <i className="bx bx-right-arrow-alt"></i>Widgets
                                </a>
                            </li>
                            <li className="dropdown dropdown-submenu" data-menu="dropdown-submenu">
                                <a className="dropdown-item align-items-center dropdown-toggle" to="#" data-toggle="dropdown">
                                    <i className="bx bx-right-arrow-alt"></i>Components
                                </a>
                                <ul className="dropdown-menu">
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="component-alerts.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Alerts
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="component-buttons-basic.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Buttons
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="component-breadcrumbs.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Breadcrumbs
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="component-carousel.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Carousel
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="component-collapse.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Collapse
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="component-dropdowns.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Dropdowns
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="component-list-group.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>List Group
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="component-modals.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Modals
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="component-pagination.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Pagination
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="component-navbar.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Navbar
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="component-tabs-component.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Tabs Component
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="component-pills-component.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Pills Component
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="component-tooltips.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Tooltips
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="component-popovers.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Popovers
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="component-badges.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Badges
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="component-pill-badges.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Pill Badges
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="component-progress.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Progress
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="component-media-objects.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Media Objects
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="component-spinner.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Spinner
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="component-bs-toast.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Toasts
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="dropdown dropdown-submenu" data-menu="dropdown-submenu"><a className="dropdown-item align-items-center dropdown-toggle" to="#" data-toggle="dropdown"><i className="bx bx-right-arrow-alt"></i>Extra Components</a>
                                <ul className="dropdown-menu">
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="ex-component-avatar.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Avatar
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="ex-component-chips.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Chips
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="ex-component-divider.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Divider
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="dropdown dropdown-submenu" data-menu="dropdown-submenu">
                                <a className="dropdown-item align-items-center dropdown-toggle" to="#" data-toggle="dropdown">
                                    <i className="bx bx-right-arrow-alt"></i>Extensions
                                </a>
                                <ul className="dropdown-menu">
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="ext-component-sweet-alerts.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Sweet Alert
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="ext-component-toastr.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Toastr
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="ext-component-noui-slider.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>NoUi Slider
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="ext-component-drag-drop.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Drag &amp; Drop
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="ext-component-tour.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Tour
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="ext-component-swiper.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Swiper
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="ext-component-treeview.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Treeview
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="ext-component-block-ui.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Block-UI
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="ext-component-media-player.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Media Player
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="ext-component-miscellaneous.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>Miscellaneous
                                        </a>
                                    </li>
                                    <li data-menu="">
                                        <a className="dropdown-item align-items-center" to="ext-component-i18n.html" 
                                        data-toggle="dropdown">
                                            <i className="bx bx-right-arrow-alt"></i>i18n
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>                   
                </ul>
            </div>
        </div>
    )
}