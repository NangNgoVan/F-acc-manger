export const adminSideBarMenuItems = [
    {
        groupName: "Chính",
        items: [
            {
                id: '0',
                icon: "icon-home",
                href:'/',
                name: "Trang chính"
            },
            {
                id: '1',
                icon: "icon-package",
                href: "",
                name: "Kho",
                items: [
                    {
                        id: '5',
                        icon: "",
                        href: '/fb-storage',
                        name: "Danh sách kho"
                    },
                    {
                        id: '6',
                        icon: "",
                        href: '/fb-storage/0',
                        name: "Chi tiết kho"
                    }
                ]
            },
            
        ]
    },
    {
        groupName: "Bản mẫu",
        items: [
            {
                id: '3',
                icon: "icon-facebook2",
                href: "/template",
                name: "Đăng nhập FB"
            }
        ]
    },
    {
        groupName: "Tài khoản",
        items: [
            {
                id: '2',
                icon: "icon-user-tie",
                href: "/admin/account",
                name: "Quản lý tài khoản"
            },
        ]
    },
    {
        groupName: "Hệ thống",
        items: [
            {
                id: '4',
                icon: "icon-cog3",
                href: "/admin/setting",
                name: "Cài đặt"
            }
        ]
    }
]