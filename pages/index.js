import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Navbar from '../components/layout/NavBar'
import SideBar from '../components/layout/SideBar'
import { useCaculatePageContentHeight, useUser } from '../utils/hooks'
import { adminSideBarMenuItems } from '../constants/adminSideBarMenuItems.js';
import Footer from '../components/layout/Footer'
import { userSideBarMenuItems } from '../constants/userSideBarMenuItems'

import moment from 'moment'
import { Bar, Doughnut } from 'react-chartjs-2'

import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const CHART_COLORS = ['#c51162',
    '#6200ea',
    '#00b8d4',
    '#00c853',
    '#aeea00',
    '#ff6d00',
]
export default function Home() {
    useCaculatePageContentHeight()

    const convertReportData = function (reportData = []) {
        var storageNames = Array.from(new Set(reportData.map(elm => elm.storageName)))
        var reportDates = Array.from(new Set(reportData.filter(elm => elm.reportDate != 'Invalid date').map(elm => elm.reportDate)))
        //

        var accNumsByDate = []
        var accNumsByStorageName = []
        storageNames.map(name => {
            accNumsByDate[name] = reportDates.map(date => {
                return {
                    date: date,
                    accNum: reportData.find(elm => (elm.reportDate == date) && (elm.storageName == name))?.accsNum || 0
                }
            })

        })

        Object.entries(accNumsByDate).map(([name, data]) => {
            accNumsByStorageName[name] = data.reduce((total, i) => total + i.accNum, 0)
        })

        return {
            storageNames: storageNames,
            reportDates: reportDates,
            accNumsByDate: accNumsByDate,
            accNumsByStorageName: accNumsByStorageName
        }
    }

    const router = useRouter()
    const { user, loading, error } = useUser({ redirectTo: '/auth' })
    const [reportData, setReportData] = useState(convertReportData())

    const [reportDate, setReportDate] = useState({
        from: moment().format('YYYY-MM-DD'),
        to: moment().format('YYYY-MM-DD'),
    })

    useEffect(() => {
        if (user)
            getReportData(reportDate.from)
    }, [user, reportDate])

    const getReportData = function (from = moment().format('YYYY-MM-DD'), to = moment().format('YYYY-MM-DD')) {
        //NotificationManager.info('Đang tải, xin chờ giây lát')
        setReportData(convertReportData())
        return fetch(`/api/report/${from}.${to}`).then(res => res.json()).then(data => {
            if (data.isSuccessed) {
                setReportData(convertReportData(data.reportData))
            }
            else NotificationManager.error('Lỗi khi tải dữ liệu')
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
                {user ? (
                    <div className="page-content">
                        <SideBar data={user.isAdmin ? adminSideBarMenuItems : userSideBarMenuItems} activeId={'0'} />
                        <div className="content-wrapper">
                            <div className="content">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="panel panel-flat">
                                            <div className="panel-heading">
                                                <h6 className="panel-title">Thống kê<a className="heading-elements-toggle"><i className="icon-more"></i></a></h6>
                                                <div className="heading-elements">
                                                    <form className="heading-form">
                                                        <div className="form-group">
                                                            <select
                                                                className="change-date select-sm"
                                                                value={reportDate.from}
                                                                onChange={e => setReportDate({
                                                                    ...reportDate,
                                                                    from: e.target.value
                                                                })}
                                                            >
                                                                <option value={moment().subtract(1, 'days').format('YYYY-MM-DD')}>Qua đến hôm nay</option>
                                                                <option value={moment().format('YYYY-MM-DD')}>Hôm nay</option>
                                                                <option value={moment().subtract(7, 'days').format('YYYY-MM-DD')}>Phạm vi 7 ngày</option>
                                                                <option value={moment().subtract(30, 'days').format('YYYY-MM-DD')}>Phạm vi 30 ngày</option>
                                                            </select>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>

                                            <div className="container-fluid">
                                                <div className="row text-center">
                                                    <div class="col-lg-6 col-sm-12">
                                                        <table className="table table-hover table-bordered">
                                                            <thead>
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>Tên kho</th>
                                                                    <th>SL</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {/* {
                                                                    storage.map((elm, index) =>
                                                                        <tr key={index} className={
                                                                            (user.uid != elm.ownerId) ? 'danger' : null}>
                                                                            <td>{elm.id}</td>
                                                                            <td>{elm.name}</td>
                                                                            <td>{elm.accsNum}</td>
                                                                        </tr>)
                                                                } */}
                                                                {
                                                                    Object.entries(reportData.accNumsByStorageName).map(([k,v],i)=>
                                                                    <tr>
                                                                        <td>{i}</td>
                                                                        <td>{k}</td>
                                                                        <td>{v}</td>
                                                                    </tr>)
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    {/* <div className="col-lg-4 col-sm-4">
                                                        <Doughnut
                                                            options={
                                                                {
                                                                    plugins: {
                                                                        title: {
                                                                            display: true,
                                                                            text: 'Tổng kho'
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            data={{
                                                                labels: reportData.storageNames,
                                                                datasets: [
                                                                    {
                                                                        data: Object.values(reportData.accNumsByStorageName),
                                                                        backgroundColor: Object.values(reportData.accNumsByStorageName).map((elm, i) =>
                                                                            CHART_COLORS[i % CHART_COLORS.length]),
                                                                        borderWidth: 1,
                                                                    },
                                                                ],
                                                            }} />
                                                    </div> */}
                                                    <div className="col-lg-6 col-sm-12">
                                                        <Bar
                                                            data={{
                                                                labels: reportData.reportDates,
                                                                datasets: Object.entries(reportData.accNumsByDate).map(([name, data], index) => {
                                                                    return {
                                                                        label: name,
                                                                        data: data.map(elm => elm.accNum),
                                                                        backgroundColor: CHART_COLORS[index % CHART_COLORS.length]
                                                                    }
                                                                }),
                                                            }}
                                                            options={
                                                                {
                                                                    scales: {
                                                                        yAxes: [
                                                                            {
                                                                                stacked: true,
                                                                            },
                                                                        ],
                                                                        xAxes: [
                                                                            {
                                                                                stacked: true,
                                                                            },
                                                                        ],
                                                                    },
                                                                    plugins: {
                                                                        title: {
                                                                            display: true,
                                                                            text: 'Thống kê theo từng ngày'
                                                                        },
                                                                    }
                                                                }
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="content-group-sm" id="app_sales"></div>
                                            <div id="monthly-sales-stats"></div>
                                        </div>
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
