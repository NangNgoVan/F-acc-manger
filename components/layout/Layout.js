import React from "react";

export default class Layout extends React.Component {
    render() {
        return(
        <div className="navbar-top">
            <Head>
                <title>FTool</title>
            </Head>
            <Navbar user={user} />
            <div className="page-container">
                {user ? (
                    <div className="page-content">
                        <SideBar data={sideBarMenuItems} activeId={'0'}/>
                        <div className="content-wrapper">
                            Trang chủ
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
    
}

