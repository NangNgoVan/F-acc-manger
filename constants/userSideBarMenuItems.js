export const userSideBarMenuItems = [
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
    }
]