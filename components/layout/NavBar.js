import React from 'react';
import Link from 'next/link'
import { withRouter } from 'next/router'

class GuestNavbar extends React.Component {
    render() {
        return (
            <div className="navbar navbar-inverse navbar-fixed-top">
                <div className="navbar-header">
                    <a className="navbar-brand" href="index.html"></a>
                    <ul className="nav navbar-nav visible-xs-block">
                        <li><a data-toggle="collapse" data-target="#navbar-mobile"><i className="icon-tree5"></i></a></li>
                        <li><a className="sidebar-mobile-main-toggle"><i className="icon-paragraph-justify3"></i></a></li>
                    </ul>
                </div>
                <div className="navbar-collapse collapse" id="navbar-mobile">
                    <ul className="nav navbar-nav">
                        <li>
                            <a className=""><i className="icon-paragraph-justify3"></i></a>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <Link href="/auth">
                                <a>Đăng nhập/đăng ký</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

class UserNavbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isUserMenuOpen: false,
        }
        this.openUserMenu = this.openUserMenu.bind(this)
        this.signOut = this.signOut.bind(this)
    }
    openUserMenu() {
        this.setState({
            isUserMenuOpen: !this.state.isUserMenuOpen,
            isShopListMenuOpen: false
        })
    }
    signOut() {
        this.props.router.push('/api/auth/signout')
    }
    render() {

        return (
            <div className="navbar navbar-inverse navbar-fixed-top">
                <div className="navbar-header">
                    <a className="navbar-brand" href="index.html"></a>
                    <ul className="nav navbar-nav visible-xs-block">
                        <li><a data-toggle="collapse" data-target="#navbar-mobile"><i className="icon-tree5"></i></a></li>
                        <li><a className="sidebar-mobile-main-toggle"><i className="icon-paragraph-justify3"></i></a></li>
                    </ul>
                </div>
                <div className="navbar-collapse collapse">
                    <ul className="nav navbar-nav">
                        <li>
                            <a className=""><i className="icon-paragraph-justify3"></i></a>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li className={
                            !this.state.isUserMenuOpen ? "dropdown dropdown-user" : "dropdown dropdown-user open"
                        }>
                            <a className="dropdown-toggle" onClick={this.openUserMenu}>
                                <img src="/images/placeholder.jpg" />
                                <span>{this.props.user.name}</span>
                                <i className="caret"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-right">
                                {/* <li>
                                    <Link href="/admin/setting">
                                        <a>
                                            <i className="icon-cog3"></i>
                                            Cài đặt tài khoản
                                        </a>
                                    </Link>
                                </li>
                                <li className="divider"></li> */}
                                <li>
                                    <Link href="">
                                        <a onClick={this.signOut}>
                                            <i className="icon-switch2">
                                            </i>
                                            Đăng xuất
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

const UserNavbarWithRouter = withRouter(UserNavbar)

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { user } = this.props
        if (!user) return <GuestNavbar />
        return <UserNavbarWithRouter user={user} />
    }
}
