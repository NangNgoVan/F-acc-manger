import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Footer from "../../components/layout/Footer"
import Navbar from "../../components/layout/NavBar"
import SideBar from "../../components/layout/SideBar"
import { adminSideBarMenuItems } from "../../constants/adminSideBarMenuItems"
import { useCaculatePageContentHeight, useUser } from "../../utils/hooks"
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default function Account() {
    useCaculatePageContentHeight()
    const router = useRouter()
    const { user, loading, loadError } = useUser({ redirectTo: '/auth' })

    const [modalState, setModalState] = useState({
        open: false,
        user: null
    })

    const [accounts, setAccounts] = useState([])

    useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = function () {
        return fetch('/api/account', {

        }).then(res => res.json()).then(data => {
            if (data.isSuccessed)
                setAccounts(data.accounts)
        })
    }

    const createNewUser = function () {
        return fetch('/api/account/new', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(modalState.user)
        }).then(res => res.json())
            .then(data => {
                let user = data.user
                if (!user) {
                    NotificationManager.error('Đã xảy ra lỗi')
                    return
                }

                NotificationManager.success('Tạo tài khoản thành công')

                loadUsers()
                setModalState({ user: null, open: false })
            })
    }

    const updateUser = function (id) {
        return fetch(`/api/account/update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(modalState.user)
        }).then(res => res.json())
            .then(data => {
                let user = data.user
                if (!user) {
                    NotificationManager.error('Đã xảy ra lỗi');
                    return
                }

                NotificationManager.success('Cập nhật tài khoản thành công!')

                loadUsers()
                setModalState({ user: null, open: false })
            })
    }

    const deleteUser = function (id) {
        const ok = confirm('Bạn chắc chắn muốn xóa tài khoản này?')
        if (ok) {
            return fetch(`/api/account/delete`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: id })
            }).then(res => res.json())
                .then(data => {
                    NotificationManager.success('Xóa tài khoản thành công')
                    loadUsers()
                })
        }
    }

    const onConfirmButtonClick = function (accept) {
        //
        if (accept) {
            if (!modalState.user
                || !modalState.user.username
                || modalState.user.username == ''
                || !modalState.user.password
                || modalState.user.password == '') {

                NotificationManager.error('Các trường không được bỏ trống');

                return
            }
            if (!modalState.user.id) {
                createNewUser()
            }
            else {
                updateUser(modalState.user.id)
            }
        }
        else {
            setModalState({ user: null, open: false })
        }

    }

    if (loading) return <div>Đang tải...</div>
    if (loadError) return <div>Lỗi khi tải trang...</div>
    if (!user) return <div>Đang chuyển hướng...</div>
    return (
        <>
            <div className="navbar-top">
                <Head>
                    <title>FTool</title>
                </Head>
                <Navbar user={user} />
                <div className="page-container">
                    <div className="page-content">
                        <SideBar data={user.isAdmin?adminSideBarMenuItems:[]} activeId={'2'} />
                        <div className="content-wrapper">
                            <div className="content">
                                <div className="panel panel-flat">
                                    <div className="panel-heading">
                                        <h5 className="panel-title">Danh sách tài khoản</h5>
                                        <div className="heading-elements">

                                            <a onClick={e => setModalState({ open: true, user: null })} type="button" className="btn btn-primary heading-btn">
                                                <i className="icon-add"></i> Tạo tài khoản
                                            </a>
                                            <button type="button"
                                                className="btn btn-link heading-btn"
                                                onClick={loadUsers}>
                                                <i className="icon-reload-alt"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="panel-body">
                                        Danh sách toàn bộ tài khoản mà bạn quản lý.
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-hover table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Tên đăng nhập</th>
                                                    <th>Mật khẩu</th>
                                                    <th>Thuộc kho</th>
                                                    <th>Hành động</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    accounts.map((account, index) => (
                                                        <tr key={index}>
                                                            <td>{index}</td>
                                                            <td>{account.username}</td>
                                                            <td>{account.password}</td>
                                                            <td>
                                                                {account.username}
                                                            </td>
                                                            <td>
                                                                <ul className="icons-list">
                                                                    <li className="text-primary-600">
                                                                        <a onClick={e => setModalState({ open: true, user: account })}>
                                                                            <i className="icon-pencil7"></i>
                                                                        </a>
                                                                    </li>
                                                                    <li className="text-danger">
                                                                        <a onClick={e => deleteUser(account.id)}>
                                                                            <i className="icon-trash"></i>
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className={modalState.open ? "modal fade in" : "modal fade"} style={{ display: modalState.open ? "block" : "none" }}>
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="close" onClick={(e) => onConfirmButtonClick(false)}>
                                                    ×
                                            </button>
                                                <h5>Tạo/sửa tài khoản</h5>
                                            </div>
                                            <div className="modal-body">
                                                <form className="form-horizontal">
                                                    <fieldset className="content-group">
                                                        <div className="form-group">
                                                            <label className="control-label col-lg-3">Tên tài khoản</label>
                                                            <input type="hidden" value={modalState.user?.id || ''}></input>
                                                            <div className="col-lg-9">
                                                                <input type="text"
                                                                    className="form-control"
                                                                    value={modalState.user?.username || ''}
                                                                    onChange={e => setModalState({ ...modalState, user: { ...modalState.user, username: e.target.value } })}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="control-label col-lg-3">Mật khẩu</label>
                                                            <div className="col-lg-9">
                                                                <input type="text"
                                                                    className="form-control"
                                                                    value={modalState.user?.password || ''}
                                                                    onChange={e => setModalState({ ...modalState, user: { ...modalState.user, password: e.target.value } })}
                                                                />
                                                            </div>
                                                        </div>
                                                    </fieldset>
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-link"
                                                    onClick={(e) => onConfirmButtonClick(false)}>Hủy</button>
                                                <button type="button" className="btn btn-primary"
                                                    onClick={(e) => onConfirmButtonClick(true)}>Đồng ý</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Footer />
                            </div>
                        </div>
                    </div>
                </div>
                <NotificationContainer />
            </div>
        </>
    )
}
