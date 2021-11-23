import Head from 'next/head'
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Footer from '../../components/layout/Footer'
import Navbar from "../../components/layout/NavBar"
import SideBar from '../../components/layout/SideBar'
import { adminSideBarMenuItems } from '../../constants/adminSideBarMenuItems'
import { userSideBarMenuItems } from '../../constants/userSideBarMenuItems'
import { useCaculatePageContentHeight, useUser } from '../../utils/hooks'

import { NotificationContainer, NotificationManager } from 'react-notifications'
import 'react-notifications/lib/notifications.css'

const modalActionTypes = [
    { id: 'copy_acc', name: 'Sao chép dạng uid|pass' },
    { id: 'tranfer', name: 'Chuyển kho' }
]

function TaskModal({ open, onConfirmButtonClick, model }) {

    const [modelState, setModelState] = useState({ ...model, actionType: modalActionTypes[0].id })

    useEffect(() => {
        setModelState({ ...model, actionType: modalActionTypes[0].id })
    }, [model])

    return (
        <div className={open ? "modal fade in" : "modal fade"} style={{ display: open ? "block" : "none" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close"
                            onClick={(e) => onConfirmButtonClick(false, modelState)}>
                            ×
                        </button>
                        <h5>Tác vụ</h5>
                    </div>
                    <div className="modal-body">
                        <form className="form-horizontal">
                            <fieldset className="content-group">
                                <div className="form-group">
                                    <label className="control-label col-lg-3">Chọn tác vụ:</label>
                                    <div className="col-lg-9">
                                        <select className='form-control'
                                            value={modelState.actionType}
                                            onChange={(e) => setModelState({ ...modelState, actionType: e.target.value })}
                                        >
                                            {
                                                modalActionTypes.map((elm, index) => <option key={index} value={elm.id}>{elm.name}</option>)
                                            }
                                        </select>
                                    </div>
                                </div>
                                {
                                    modelState.actionType == modalActionTypes[1].id ?
                                        <div className="form-group">
                                            <label className="control-label col-lg-3">Chuyển kho:</label>
                                            <div className="col-lg-9">
                                                <select className='form-control'
                                                    value={modelState.sid}
                                                    onChange={(e) => {
                                                        setModelState({ ...modelState, sid: e.target.value })
                                                    }}
                                                >
                                                    {
                                                        modelState.storage.map(elm =>
                                                            <option key={elm.id} value={elm.id}>{elm.name}</option>)
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        : modelState.actionType == modalActionTypes[0].id ?
                                            <div>
                                                <textarea
                                                    cols="5" rows="5" className="form-control text-danger"
                                                    defaultValue={model.fbaccs.map(elm => `${elm.username}|${elm.password}`).join('\n')}>

                                                </textarea>
                                            </div>
                                            : null
                                }
                            </fieldset>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-link"
                            onClick={(e) => onConfirmButtonClick(false, modelState)}>Hủy</button>
                        <button type="button" className="btn btn-primary"
                            onClick={(e) => onConfirmButtonClick(true, modelState)}>Đồng ý</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function FBStorageDetail() {
    useCaculatePageContentHeight()

    const router = useRouter()
    const { user, loading, error } = useUser()
    const [storage, setFbStorage] = useState([])
    const { id } = router.query
    const [currentFbStorage, setCurrentFbStorage] = useState({ id: id, currentPage: 1 })
    const [fbaccs, setFbaccs] = useState({ fbaccs: [], total: 0 })
    const [selectedRows, setSelectedRows] = useState([])
    const [openTaskModal, setOpenTaskModal] = useState(false)

    useEffect(() => {
        if (!user && !loading) router.push('/auth')
    }, [user, loading])

    useEffect(() => {
        loadFbStorages()
    }, [user])

    useEffect(() => {
        if (user) {
            loadFbStorageDetail(currentFbStorage.id, currentFbStorage.currentPage)
        }
    }, [currentFbStorage])

    const selectRow = function (checked, id) {
        if (checked) {
            setSelectedRows([...selectedRows, id])
        }
        else {
            setSelectedRows([...selectedRows].filter(elm => elm != id))
        }
    }

    const loadFbStorages = function () {
        return fetch(`/api/fb-storages`).then(res => res.json())
            .then(data => {
                if (data.isSuccessed) {
                    setFbStorage(data.storages)
                }
            })
    }

    const loadFbStorageDetail = function (id, page) {
        //NotificationManager.info('Đang tải, xin chờ giây lát')
        setFbaccs({fbaccs:[], total: 0})
        return fetch(`/api/fb-storages/${id}?page=${page}`).then(res => res.json())
            .then(data => {
                if (data.isSuccessed) {
                    setFbaccs({ fbaccs: data.fbaccs, total: data.total })
                }
            })
    }

    const deleteFbAcc = function (sid, fbAccId) {
        var ok = confirm('Xóa tài khoản này?')
        if (!ok) return
        return fetch('/api/fb-storages/delete-accs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sid: sid, fbAccId: fbAccId })
        })
            .then(res => res.json())
            .then(data => {
                if (data.isSuccessed) {
                    loadFbStorageDetail(currentFbStorage.id,1)
                    selectRow(false, fbAccId)
                    NotificationManager.success('Xóa thành công')
                }
                else {
                    NotificationManager.error('Thất bại')
                }
            })
    }

    const transferFbAcc = function (sid, fbAccIds) {
        return fetch(`/api/fb-storages/transfer`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sid: sid, fbAccIds: fbAccIds })
        })
            .then(res => res.json())
            .then(data => {
                if (data.isSuccessed) {
                    setSelectedRows([])
                    loadFbStorageDetail(currentFbStorage.id,1)
                    NotificationManager.success('Đã chuyển')
                }
            })
    }

    if (loading) return <div>Đang tải...</div>
    if (error) return <div>Lỗi khi tải trang...</div>
    if (!user) return <div>Đang chuyển hướng...</div>
    return (
        <div className="navbar-top">
            <Head>
                <title>FTool</title>
            </Head>
            <Navbar user={user} />
            <div className="page-container">
                <div className='page-content'>
                    <SideBar data={user.isAdmin ? adminSideBarMenuItems : userSideBarMenuItems} activeId={'6'} />
                    <div className='content-wrapper'>
                        <div className="content">
                            <div className="panel panel-flat">
                                <div className="panel-heading">
                                    <h5 className="panel-title">
                                        <a onClick={() => window.history.back()}>
                                            <i className="icon-arrow-left52 position-left"></i>
                                        </a>
                                        {currentFbStorage?.name || 'Tất cả'}
                                    </h5>
                                    <div className="heading-elements">
                                        {user.isAdmin ?
                                            <form className='heading-form'>
                                                <div className='form-group'>
                                                    <select className='form-control'
                                                        value={currentFbStorage.id}
                                                        onChange={(e) => {
                                                            setCurrentFbStorage({
                                                                id: e.target.value,
                                                                currentPage: 1
                                                            })
                                                            setSelectedRows([])
                                                        }}>
                                                        {
                                                            storage.map(elm =>
                                                                <option key={elm.id} value={elm.id}>{elm.name}</option>)
                                                        }
                                                    </select>
                                                </div>
                                            </form>
                                            : null}

                                        <button type="button"
                                            className="btn btn-link heading-btn"
                                            onClick={() => loadFbStorageDetail(currentFbStorage.id, 1)}
                                        >
                                            <i className="icon-reload-alt"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="panel-body">
                                    Liệt kê chi tiết
                                    {
                                        selectedRows.length > 0 ? (
                                            <>
                                                <div className="text-right">
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => setOpenTaskModal(true)}
                                                    >
                                                        [{selectedRows.length}] Chọn tác vụ...
                                                </button>
                                                    <button
                                                        className="btn btn-link btn-sm"
                                                        onClick={() => setSelectedRows([])}
                                                    >
                                                        Bỏ chọn tất cả
                                                </button>
                                                </div>
                                            </>
                                        ) : null
                                    }

                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover table-bordered">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>ip</th>
                                                <th>Tên tài khoản</th>
                                                <th>Mật khẩu</th>
                                                <th>Quốc gia</th>
                                                <th>Thuộc kho</th>
                                                <th>Ngày</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                fbaccs.fbaccs.map(elm =>
                                                    <tr key={elm.id}>
                                                        <td>{elm.id}</td>
                                                        <td>{elm.ipAddr}</td>
                                                        <td>{elm.username}</td>
                                                        <td>{elm.password}</td>
                                                        <td>{elm.country}</td>
                                                        <td>{elm.storageId}</td>
                                                        <td>{elm.loginDate}</td>
                                                        <td>
                                                            <ul className="icons-list">
                                                                <li className="text-danger">
                                                                    <a onClick={() => deleteFbAcc(elm.storageId, elm.id)}>
                                                                        <i className="icon-trash"></i>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedRows.includes(elm.id)}
                                                                onChange={(e) => selectRow(e.target.checked, elm.id)}
                                                            />
                                                        </td>
                                                    </tr>)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                {
                                    fbaccs.total <= 0 ? null :
                                        <ul className="pagination-flat pagination">
                                            <li><a>‹</a></li>
                                            {[...Array(Math.round(fbaccs.total/50)).keys()].map((num) =>
                                                <li key={num + 1} className={currentFbStorage.currentPage == (num + 1) ? "active" : null}>
                                                    <a onClick={() => setCurrentFbStorage({ ...currentFbStorage, currentPage: num + 1 })}>{num + 1}</a>
                                                </li>)}
                                            <li><a>›</a></li>
                                        </ul>
                                }
                            </div>
                            <TaskModal
                                open={openTaskModal}
                                model={{ storage: storage, sid: 0, fbaccs: fbaccs.fbaccs.filter(elm => selectedRows.includes(elm.id)) }}
                                onConfirmButtonClick={(accepted, modelState) => {
                                    if (accepted && modelState.actionType == modalActionTypes[1].id) {
                                        transferFbAcc(modelState.sid, selectedRows)
                                    }
                                    setSelectedRows([])
                                    setOpenTaskModal(false)
                                }}
                            />
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
            <NotificationContainer />
        </div>
    )
}
