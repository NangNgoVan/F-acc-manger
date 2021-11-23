import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Footer from "../../components/layout/Footer"
import Navbar from "../../components/layout/NavBar"
import SideBar from "../../components/layout/SideBar"
import { adminSideBarMenuItems } from "../../constants/adminSideBarMenuItems"
import { useCaculatePageContentHeight, useUser } from "../../utils/hooks"
import 'react-notifications/lib/notifications.css';

export default function FBStorage() {
    useCaculatePageContentHeight()
    const router = useRouter()
    const { user, loading, error } = useUser()
    const [storage, setFbStorage] = useState([])

    useEffect(() => {
        loadFbStorages()
    }, [])

    const loadFbStorages = function () {
        //NotificationManager.info('Đang tải, xin chờ giây lát')
        return fetch(`/api/fb-storages`).then(res => res.json())
            .then(data => {
                setFbStorage(data.storages)
            })
    }

    const createNewFbStorage = function () {
        var fbStorageStrList = prompt('Tạo kho - Mỗi kho ngăn cách bởi dấu ";"')
        if (fbStorageStrList != null || fbStorageStrList != undefined) {
            var newFbStorageList = fbStorageStrList.split(';')
            if (newFbStorageList.length > 0) {
                fetch(`/api/fb-storages/new`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ newFbStorageList: newFbStorageList })
                }).then(res => res.json())
                    .then(data => {
                        if (data.isSuccessed) {
                            loadFbStorages()
                            NotificationManager.success('Tạo kho thành công')
                        }
                        else {
                            NotificationManager.error('Kho đã tồn tại')
                        }
                    })
            }
            else {
                NotificationManager.error('Danh sách trống!')
            }

        }
        else {
            
        }
    }

    const deleteFbStorage = function (sid) {
        var ok = confirm('Xóa? - Các tài khoản trong kho sẽ auto chuyển về mặc định')
        if (!ok) return
        fetch('/api/fb-storages/delete',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sid: sid })
        }).then(res=>res.json())
        .then(data=>{
            if (data.isSuccessed) {
                loadFbStorages()
                NotificationManager.success('Xóa kho thành công')
            }
            else {
                NotificationManager.error('Xóa thất bại')
            }
        })
    }

    if (loading) return <div>Đang tải...</div>
    if (error) return <div>Lỗi khi tải trang...</div>
    return (
        <div className="navbar-top">
            <Head>
                <title>FTool</title>
            </Head>
            <Navbar user={user} />
            <div className="page-container">
                {user ? (
                    <div className="page-content">
                        <SideBar data={user.isAdmin ? adminSideBarMenuItems : []} activeId={'5'} />
                        <div className="content-wrapper">
                            <div className="content">
                                <div className="panel panel-flat">
                                    <div className="panel-heading">
                                        <h5 className="panel-title">Danh sách kho</h5>
                                        <div className="heading-elements">
                                            {user.isAdmin ?
                                                <a type="button"
                                                    onClick={createNewFbStorage}
                                                    className="btn btn-primary heading-btn">
                                                    <i className="icon-add"></i> Tạo kho
                                                </a>
                                                : null
                                            }

                                            <button type="button"
                                                className="btn btn-link heading-btn"
                                                onClick={loadFbStorages}>
                                                <i className="icon-reload-alt"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="panel-body">
                                        Danh sách toàn bộ kho lưu trữ tài khoản FB bạn thu thập được.
                                        Mặc định mỗi kho được tạo khi tạo 1 người dùng tương ứng
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-hover table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Tên kho</th>
                                                    <th>Số lượng tài khoản trong kho</th>
                                                    <th>Hành động</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    storage.map((elm, index) =>
                                                        <tr key={index} className={
                                                            (user.uid!=elm.ownerId) ? 'danger' : null}>
                                                            <td>{elm.id}</td>
                                                            <td>{elm.name}</td>
                                                            <td>{elm.accsNum}</td>
                                                            <td>
                                                                <ul className="icons-list">
                                                                    <li className="text-primary-600">
                                                                        <Link href={`/fb-storage/${elm.id}`}>
                                                                            <a>
                                                                                <i className="icon-eye"></i>
                                                                            </a>
                                                                        </Link>
                                                                    </li>
                                                                    {
                                                                        (user.isAdmin && (elm.ownerId == user.uid)) ?
                                                                            <li className="text-danger">
                                                                                <a onClick={()=>deleteFbStorage(elm.id)}>
                                                                                    <i className="icon-trash"></i>
                                                                                </a>
                                                                            </li>
                                                                            : null
                                                                    }
                                                                </ul>
                                                            </td>
                                                        </tr>)
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <Footer />
                            </div>
                        </div>
                    </div>
                ) : (
                    null
                )
                }
            </div>
            <NotificationContainer />
        </div>
    )
}
