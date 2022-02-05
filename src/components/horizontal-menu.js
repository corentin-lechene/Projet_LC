export const menuItems = [
    {
        id: 1,
        label: 'menuitems.dashboards.text',
        icon: 'bx-home-circle',
        subItems: [
            {
                id: 2,
                label: 'menuitems.dashboards.list.default',
                link: '/',
                parentId: 1
            },
            {
                id: 3,
                label: 'menuitems.dashboards.list.saas',
                link: '/',
                parentId: 1
            },
            {
                id: 4,
                label: 'menuitems.dashboards.list.crypto',
                link: '/',
                parentId: 1
            },
        ]
    },
    {
        id: 5,
        label: 'menuitems.uielements.text',
        icon: 'bx-tone',
        isUiElement: true,
        subItems: [
            {
                id: 6,
                label: 'menuitems.uielements.list.alerts',
                link: '/',
                parentId: 5
            },
            {
                id: 7,
                label: 'menuitems.uielements.list.buttons',
                link: '/',
                parentId: 5
            },
            {
                id: 8,
                label: 'menuitems.uielements.list.cards',
                link: '/',
                parentId: 5
            },
            {
                id: 9,
                label: 'menuitems.uielements.list.carousel',
                link: '/',
                parentId: 5
            },
            {
                id: 10,
                label: 'menuitems.uielements.list.dropdowns',
                link: '/',
                parentId: 5
            },
            {
                id: 11,
                label: 'menuitems.uielements.list.grid',
                link: '/',
                parentId: 5
            },
            {
                id: 12,
                label: 'menuitems.uielements.list.images',
                link: '/',
                parentId: 5
            },
            {
                id: 13,
                label: 'menuitems.uielements.list.modals',
                link: '/',
                parentId: 5
            },
            {
                id: 14,
                label: 'menuitems.uielements.list.rangeslider',
                link: '/',
                parentId: 5
            },
            {
                id: 15,
                label: 'menuitems.uielements.list.progressbar',
                link: '/',
                parentId: 5
            },
            {
                id: 16,
                label: 'menuitems.uielements.list.sweetalert',
                link: '/',
                parentId: 5
            },
            {
                id: 17,
                label: 'menuitems.uielements.list.tabs',
                link: '/',
                parentId: 5
            },
            {
                id: 18,
                label: 'menuitems.uielements.list.typography',
                link: '/',
                parentId: 5
            },
            {
                id: 19,
                label: 'menuitems.uielements.list.video',
                link: '/',
                parentId: 5
            },
            {
                id: 20,
                label: 'menuitems.uielements.list.general',
                link: '/',
                parentId: 5
            },
            {
                id: 21,
                label: 'menuitems.uielements.list.colors',
                link: '/',
                parentId: 5
            },
            {
                id: 22,
                label: "menuitems.uielements.list.lightbox",
                link: "/",
                parentId: 5
            },
            {
                id: 23,
                label: "menuitems.uielements.list.cropper",
                link: "/",
                parentId: 5
            },
        ]
    },
    {
        id: 23,
        label: 'menuitems.apps.text',
        icon: 'bx-customize',
        subItems: [
            {
                id: 24,
                label: 'menuitems.calendar.text',
                link: '/',
            },
            {
                id: 25,
                label: 'menuitems.chat.text',
                link: '/',
            },
            {
                id: 26,
                label: 'menuitems.email.text',
                subItems: [
                    {
                        id: 27,
                        label: 'menuitems.email.list.inbox',
                        link: '/',
                        parentId: 26
                    },
                    {
                        id: 28,
                        label: 'menuitems.email.list.reademail',
                        link: '/',
                        parentId: 26
                    }
                ]
            },
            {
                id: 29,
                label: 'menuitems.ecommerce.text',
                subItems: [
                    {
                        id: 30,
                        label: 'menuitems.ecommerce.list.products',
                        link: '/',
                        parentId: 29
                    },
                    {
                        id: 31,
                        label: 'menuitems.ecommerce.list.productdetail',
                        link: '/',
                        parentId: 29
                    },
                    {
                        id: 32,
                        label: 'menuitems.ecommerce.list.orders',
                        link: '/',
                        parentId: 29
                    },
                    {
                        id: 33,
                        label: 'menuitems.ecommerce.list.customers',
                        link: '/',
                        parentId: 29
                    },
                    {
                        id: 34,
                        label: 'menuitems.ecommerce.list.cart',
                        link: '/',
                        parentId: 29
                    },
                    {
                        id: 35,
                        label: 'menuitems.ecommerce.list.checkout',
                        link: '/',
                        parentId: 29
                    },
                    {
                        id: 36,
                        label: 'menuitems.ecommerce.list.shops',
                        link: '/',
                        parentId: 29
                    },
                    {
                        id: 37,
                        label: 'menuitems.ecommerce.list.addproduct',
                        link: '/',
                        parentId: 29
                    },
                ]
            },
            {
                id: 38,
                label: 'menuitems.crypto.text',
                icon: 'bx-bitcoin',
                subItems: [
                    {
                        id: 39,
                        label: 'menuitems.crypto.list.wallet',
                        link: '/',
                        parentId: 38
                    },
                    {
                        id: 40,
                        label: 'menuitems.crypto.list.buy/sell',
                        link: '/',
                        parentId: 38
                    },
                    {
                        id: 41,
                        label: 'menuitems.crypto.list.exchange',
                        link: '/',
                        parentId: 38
                    },
                    {
                        id: 42,
                        label: 'menuitems.crypto.list.lending',
                        link: '/',
                        parentId: 38
                    },
                    {
                        id: 43,
                        label: 'menuitems.crypto.list.orders',
                        link: '/',
                        parentId: 38
                    },
                    {
                        id: 44,
                        label: 'menuitems.crypto.list.kycapplication',
                        link: '/',
                        parentId: 38
                    },
                    {
                        id: 45,
                        label: 'menuitems.crypto.list.icolanding',
                        link: '/',
                        parentId: 38
                    }
                ]
            },
            {
                id: 46,
                label: 'menuitems.projects.text',
                subItems: [
                    {
                        id: 47,
                        label: 'menuitems.projects.list.grid',
                        link: '/',
                        parentId: 46
                    },
                    {
                        id: 48,
                        label: 'menuitems.projects.list.projectlist',
                        link: '/',
                        parentId: 46
                    },
                    {
                        id: 49,
                        label: 'menuitems.projects.list.overview',
                        link: '/',
                        parentId: 46
                    },
                    {
                        id: 50,
                        label: 'menuitems.projects.list.create',
                        link: '/',
                        parentId: 46
                    }
                ]
            },
            {
                id: 51,
                label: 'menuitems.tasks.text',
                subItems: [
                    {
                        id: 52,
                        label: 'menuitems.tasks.list.tasklist',
                        link: '/',
                        parentId: 51
                    },
                    {
                        id: 53,
                        label: 'menuitems.tasks.list.kanban',
                        link: '/',
                        parentId: 51
                    },
                    {
                        id: 54,
                        label: 'menuitems.tasks.list.createtask',
                        link: '/',
                        parentId: 51
                    }
                ]
            },
            {
                id: 55,
                label: 'menuitems.contacts.text',
                icon: 'bxs-user-detail',
                subItems: [
                    {
                        id: 56,
                        label: 'menuitems.contacts.list.usergrid',
                        link: '/',
                        parentId: 55
                    },
                    {
                        id: 57,
                        label: 'menuitems.contacts.list.userlist',
                        link: '/',
                        parentId: 55
                    },
                    {
                        id: 58,
                        label: 'menuitems.contacts.list.profile',
                        link: '/',
                        parentId: 55
                    }
                ]
            },
        ]
    },
    {
        id: 59,
        icon: 'bx-collection',
        label: 'menuitems.components.text',
        subItems: [
            {
                id: 60,
                label: 'menuitems.forms.text',
                subItems: [
                    {
                        id: 61,
                        label: 'menuitems.forms.list.elements',
                        link: '/',
                        parentId: 60
                    },
                    {
                        id: 62,
                        label: 'menuitems.forms.list.layouts',
                        link: '/',
                        parentId: 60
                    },
                    {
                        id: 63,
                        label: 'menuitems.forms.list.validation',
                        link: '/',
                        parentId: 60
                    },
                    {
                        id: 64,
                        label: 'menuitems.forms.list.advanced',
                        link: '/',
                        parentId: 60
                    },
                    {
                        id: 65,
                        label: 'menuitems.forms.list.editor',
                        link: '/',
                        parentId: 60
                    },
                    {
                        id: 66,
                        label: 'menuitems.forms.list.fileupload',
                        link: '/',
                        parentId: 60
                    },
                    {
                        id: 67,
                        label: 'menuitems.forms.list.repeater',
                        link: '/',
                        parentId: 60
                    },
                    {
                        id: 68,
                        label: 'menuitems.forms.list.wizard',
                        link: '/',
                        parentId: 60
                    },
                    {
                        id: 69,
                        label: 'menuitems.forms.list.mask',
                        link: '/',
                        parentId: 60
                    }
                ]
            },
            {
                id: 70,
                label: 'menuitems.tables.text',
                subItems: [
                    {
                        id: 71,
                        label: 'menuitems.tables.list.basic',
                        link: '/',
                        parentId: 70
                    },
                    {
                        id: 72,
                        label: 'menuitems.tables.list.advanced',
                        link: '/',
                        parentId: 70
                    }
                ]
            },
            {
                id: 73,
                label: 'menuitems.charts.text',
                subItems: [
                    {
                        id: 74,
                        label: 'menuitems.charts.list.apex',
                        link: '/',
                        parentId: 73
                    },
                    {
                        id: 75,
                        label: 'menuitems.charts.list.chartjs',
                        link: '/',
                        parentId: 73
                    },
                    {
                        id: 76,
                        label: 'menuitems.charts.list.chartist',
                        link: '/',
                        parentId: 73
                    },
                    {
                        id: 77,
                        label: 'menuitems.charts.list.echart',
                        link: '/',
                        parentId: 73
                    }
                ]
            },
            {
                id: 78,
                label: 'menuitems.icons.text',
                subItems: [
                    {
                        id: 79,
                        label: 'menuitems.icons.list.boxicons',
                        link: '/',
                        parentId: 78
                    },
                    {
                        id: 80,
                        label: 'menuitems.icons.list.materialdesign',
                        link: '/',
                        parentId: 78
                    },
                    {
                        id: 81,
                        label: 'menuitems.icons.list.dripicons',
                        link: '/',
                        parentId: 78
                    },
                    {
                        id: 82,
                        label: 'menuitems.icons.list.fontawesome',
                        link: '/',
                        parentId: 78
                    },
                ]
            },
            {
                id: 83,
                label: 'menuitems.maps.text',
                subItems: [
                    {
                        id: 84,
                        label: 'menuitems.maps.list.googlemap',
                        link: '/',
                        parentId: 83
                    },
                    {
                        id: 85,
                        label: "menuitems.maps.list.leafletmap",
                        link: "/",
                        parentId: 83
                    },
                ]
            }
        ]
    },
    {
        id: 86,
        label: 'navbar.dropdown.megamenu.extrapages.title',
        icon: 'bx-file',
        subItems: [
            {
                id: 87,
                label: 'menuitems.invoices.text',
                subItems: [
                    {
                        id: 88,
                        label: 'menuitems.invoices.list.invoicelist',
                        link: '/',
                        parentId: 87
                    },
                    {
                        id: 89,
                        label: 'menuitems.invoices.list.invoicedetail',
                        link: '/',
                        parentId: 87
                    },
                ]
            },
            {
                id: 90,
                label: 'menuitems.authentication.text',
                subItems: [
                    {
                        id: 91,
                        label: 'menuitems.authentication.list.login',
                        link: '/-1',
                        parentId: 90
                    },
                    {
                        id: 92,
                        label: 'menuitems.authentication.list.register',
                        link: '/-1',
                        parentId: 90
                    },
                    {
                        id: 93,
                        label: 'menuitems.authentication.list.recoverpwd',
                        link: '/',
                        parentId: 90
                    },
                    {
                        id: 94,
                        label: 'menuitems.authentication.list.lockscreen',
                        link: '/-screen',
                        parentId: 90
                    }
                ]
            },
            {
                id: 95,
                label: 'menuitems.utility.text',
                icon: 'bx-file',
                subItems: [
                    {
                        id: 96,
                        label: 'menuitems.utility.list.starter',
                        link: '/',
                        parentId: 95
                    },
                    {
                        id: 97,
                        label: 'menuitems.utility.list.maintenance',
                        link: '/',
                        parentId: 95
                    },
                    {
                        id: 98,
                        label: 'menuitems.utility.list.timeline',
                        link: '/',
                        parentId: 95
                    },
                    {
                        id: 99,
                        label: 'menuitems.utility.list.faqs',
                        link: '/',
                        parentId: 95
                    },
                    {
                        id: 100,
                        label: 'menuitems.utility.list.pricing',
                        link: '/',
                        parentId: 95
                    },
                    {
                        id: 101,
                        label: 'menuitems.utility.list.error404',
                        link: '/',
                        parentId: 95
                    },
                    {
                        id: 102,
                        label: 'menuitems.utility.list.error500',
                        link: '/',
                        parentId: 95
                    },
                ]
            },
        ]
    }
];

