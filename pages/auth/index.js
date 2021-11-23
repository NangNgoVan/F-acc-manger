import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'


import { useUser } from "../../utils/hooks";

import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default function Login() {
    useUser({ redirectTo: '/', redirectIfFound: true })
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loggingIn, setLogginIn] = useState(false)
    const [adminRole, setAdminRole] = useState(true)

    async function handleSubmit(e) {
        e.preventDefault()
        setLogginIn(true)
        const body = {
            email: email,
            password: password,
            adminRole: adminRole
        }
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })

        setLogginIn(false)

        if (res.status === 200) {
            NotificationManager.info('Đang chuyển hướng đăng nhập...');
            window.location.href = "/"
        }
        else {
            NotificationManager.error('Sai tài khoản hoặc mật khẩu')
        }
    }

    return (
        <div className="login-container login-cover">
            <div className="page-container">
                <div className="page-content">
                    <div className="content-wrapper">
                        <div className="content pb-20">
                            <form onSubmit={e => handleSubmit(e)}>
                                <div className="panel panel-body login-form">
                                    <div className="text-center">
                                        <div className="icon-object border-slate-300 text-slate-300">
                                            <i className="icon-user"></i>
                                        </div>
                                        <h5 className="content-group">
                                            Đăng nhập
                            <small className="display-block">Nhập thông tin đăng nhập</small>
                                        </h5>
                                    </div>
                                    <div className="form-group has-feedback has-feedback-left">
                                        <input type="text"
                                            className="form-control"
                                            placeholder="Tên đăng nhập"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            required="required"></input>
                                        <div className="form-control-feedback">
                                            <i className="icon-user text-muted"></i>
                                        </div>
                                    </div>
                                    <div className="form-group has-feedback has-feedback-left">
                                        <input type="password"
                                            className="form-control"
                                            placeholder="Mật khẩu"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            required="required" />
                                        <div className="form-control-feedback">
                                            <i className="icon-lock2 text-muted"></i>
                                        </div>
                                    </div>
                                    <div className="form-group login-options">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <label className="checkbox-inline">
                                                    <div className="checker">
                                                        <span className={adminRole?"checked":""}>
                                                            <input type="checkbox" className="styled"
                                                            onChange={e=>setAdminRole(!adminRole)} />
                                                        </span>
                                                    </div>
                                                Đăng nhập với quản trị
                                                </label>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <button type="submit" className="btn bg-blue btn-block">
                                            Đăng Nhập
                                            <i className={!loggingIn ? "icon-arrow-right14 position-right" : " icon-spinner spinner position-right"}></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <NotificationContainer/>
        </div>
    )
}