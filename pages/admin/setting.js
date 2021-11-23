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

export default function Setting() {
    useCaculatePageContentHeight()
    const router = useRouter()
    const { user, loading, error } = useUser()
    const [trackingScript, setTrackingScript] = useState('')

    useEffect(() => {
        if (user?.isAdmin) loadSetting()
    }, [])

    const loadSetting = function () {
        return fetch(`/api/admin/setting`, {

        }).then(res => res.json())
            .then(data => {
                if (data.isSuccessed) {
                    var json = JSON.parse(data.data)
                    setTrackingScript(json?.trackingScript||'')
                }
            })
    }

    const submitHandler = function (e) {
        e.preventDefault()
        fetch(`/api/admin/setting`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: {trackingScript: trackingScript} })
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.isSuccessed) {
                loadSetting()
                NotificationManager.success('Thành công')
            }
            else NotificationManager.error('Thất bại')
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
                        <SideBar data={user.isAdmin ? adminSideBarMenuItems : []} activeId={'4'} />
                        <div className="content-wrapper">
                            <div className="content">
                                <div className="panel panel-flat">
                                    <div className="panel-heading">
                                        <h5 className="panel-title">Cài đặt chung</h5>
                                    </div>
                                    <div className="panel-body">
                                        <form className="form-horizontal" onSubmit={(e) => submitHandler(e)}>
                                            <fieldset className="content-group">
                                                <legend className="text-bold">Google analytics</legend>
                                            </fieldset>
                                            <div className="form-group">
                                                <label className="control-label col-lg-2">
                                                    Tracking script
                                                </label>
                                                <div className="col-lg-10">
                                                    <textarea rows="5" col="5" 
                                                    className="form-control"
                                                    value={trackingScript}
                                                    onChange={e=>setTrackingScript(e.target.value)}></textarea>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <button className="btn btn-primary" type="submit">
                                                    <i className="icon-floppy-disk"></i> Lưu
                                                </button>
                                            </div>
                                        </form>
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
            <NotificationContainer/>
        </div>
    )
}
