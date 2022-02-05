export const menuItems = [
    {
        id: 1,
        label: "menuitems.menu.text",
        isTitle: true
    },
    {
        id: 2,
        label: "menuitems.dashboards.text",
        icon: "bx-home-circle",
        badge: {
            variant: "info",
            text: "menuitems.dashboards.badge"
        },
        subItems: [
            {
                id: 3,
                label: "menuitems.dashboards.list.default",
                link: "/",
                parentId: 2
            },
            {
                id: 4,
                label: "menuitems.dashboards.list.saas",
                link: "/",
                parentId: 2
            },
            {
                id: 5,
                label: "menuitems.dashboards.list.crypto",
                link: "/",
                parentId: 2
            }
        ]
    },
    {
        id: 6,
        isLayout: true
    },
    {
        id: 7,
        label: "menuitems.apps.text",
        isTitle: true
    },
    {
        id: 8,
        label: "menuitems.calendar.text",
        icon: "bx-calendar",
        link: "/"
    },
    {
        id: 9,
        label: "menuitems.chat.text",
        icon: "bx-chat",
        link: "/",
        badge: {
            variant: "success",
            text: "menuitems.chat.badge"
        }
    },
    {
        id: 10,
        label: "menuitems.ecommerce.text",
        icon: "bx-store",
        subItems: [
            {
                id: 11,
                label: "menuitems.ecommerce.list.products",
                link: "/",
                parentId: 10
            },
            {
                id: 12,
                label: "menuitems.ecommerce.list.productdetail",
                link: "/",
                parentId: 10
            },
            {
                id: 13,
                label: "menuitems.ecommerce.list.orders",
                link: "/",
                parentId: 10
            },
            {
                id: 14,
                label: "menuitems.ecommerce.list.customers",
                link: "/",
                parentId: 10
            },
            {
                id: 15,
                label: "menuitems.ecommerce.list.cart",
                link: "/",
                parentId: 10
            },
            {
                id: 16,
                label: "menuitems.ecommerce.list.checkout",
                link: "/",
                parentId: 10
            },
            {
                id: 17,
                label: "menuitems.ecommerce.list.shops",
                link: "/",
                parentId: 10
            },
            {
                id: 18,
                label: "menuitems.ecommerce.list.addproduct",
                link: "/",
                parentId: 10
            }
        ]
    },
    {
        id: 19,
        label: "menuitems.crypto.text",
        icon: "bx-bitcoin",
        subItems: [
            {
                id: 20,
                label: "menuitems.crypto.list.wallet",
                link: "/",
                parentId: 19
            },
            {
                id: 21,
                label: "menuitems.crypto.list.buy/sell",
                link: "/",
                parentId: 19
            },
            {
                id: 22,
                label: "menuitems.crypto.list.exchange",
                link: "/",
                parentId: 19
            },
            {
                id: 23,
                label: "menuitems.crypto.list.lending",
                link: "/",
                parentId: 19
            },
            {
                id: 24,
                label: "menuitems.crypto.list.orders",
                link: "/",
                parentId: 19
            },
            {
                id: 25,
                label: "menuitems.crypto.list.kycapplication",
                link: "/",
                parentId: 19
            },
            {
                id: 26,
                label: "menuitems.crypto.list.icolanding",
                link: "/",
                parentId: 19
            }
        ]
    },
    {
        id: 27,
        label: "menuitems.email.text",
        icon: "bx-envelope",
        subItems: [
            {
                id: 28,
                label: "menuitems.email.list.inbox",
                link: "/",
                parentId: 27
            },
            {
                id: 29,
                label: "menuitems.email.list.reademail",
                link: "/",
                parentId: 27
            }
        ]
    },
    {
        id: 30,
        label: "menuitems.invoices.text",
        icon: "bx-receipt",
        subItems: [
            {
                id: 31,
                label: "menuitems.invoices.list.invoicelist",
                link: "/",
                parentId: 30
            },
            {
                id: 32,
                label: "menuitems.invoices.list.invoicedetail",
                link: "/",
                parentId: 30
            }
        ]
    },
    {
        id: 33,
        label: "menuitems.projects.text",
        icon: "bx-briefcase-alt-2",
        subItems: [
            {
                id: 34,
                label: "menuitems.projects.list.grid",
                link: "/",
                parentId: 33
            },
            {
                id: 35,
                label: "menuitems.projects.list.projectlist",
                link: "/",
                parentId: 33
            },
            {
                id: 36,
                label: "menuitems.projects.list.overview",
                link: "/",
                parentId: 33
            },
            {
                id: 37,
                label: "menuitems.projects.list.create",
                link: "/",
                parentId: 33
            }
        ]
    },
    {
        id: 38,
        label: "menuitems.tasks.text",
        icon: "bx-task",
        subItems: [
            {
                id: 39,
                label: "menuitems.tasks.list.tasklist",
                link: "/",
                parentId: 38
            },
            {
                id: 40,
                label: "menuitems.tasks.list.kanban",
                link: "/",
                parentId: 38
            },
            {
                id: 41,
                label: "menuitems.tasks.list.createtask",
                link: "/",
                parentId: 38
            }
        ]
    },
    {
        id: 42,
        label: "menuitems.contacts.text",
        icon: "bxs-user-detail",
        subItems: [
            {
                id: 43,
                label: "menuitems.contacts.list.usergrid",
                link: "/",
                parentId: 42
            },
            {
                id: 44,
                label: "menuitems.contacts.list.userlist",
                link: "/",
                parentId: 42
            },
            {
                id: 45,
                label: "menuitems.contacts.list.profile",
                link: "/",
                parentId: 42
            }
        ]
    },
    {
        id: 46,
        label: "menuitems.pages.text",
        isTitle: true
    },
    {
        id: 47,
        label: "menuitems.authentication.text",
        icon: "bx-user-circle",
        subItems: [
            {
                id: 48,
                label: "menuitems.authentication.list.login",
                link: "/",
                parentId: 47
            },
            {
                id: 49,
                label: "menuitems.authentication.list.register",
                link: "/",
                parentId: 47
            },
            {
                id: 50,
                label: "menuitems.authentication.list.recoverpwd",
                link: "/",
                parentId: 47
            },
            {
                id: 51,
                label: "menuitems.authentication.list.lockscreen",
                link: "/",
                parentId: 47
            }
        ]
    },
    {
        id: 52,
        label: "menuitems.utility.text",
        icon: "bx-file",
        subItems: [
            {
                id: 53,
                label: "menuitems.utility.list.starter",
                link: "/",
                parentId: 52
            },
            {
                id: 54,
                label: "menuitems.utility.list.maintenance",
                link: "/",
                parentId: 52
            },
            {
                id: 55,
                label: "menuitems.utility.list.timeline",
                link: "/",
                parentId: 52
            },
            {
                id: 56,
                label: "menuitems.utility.list.faqs",
                link: "/",
                parentId: 52
            },
            {
                id: 57,
                label: "menuitems.utility.list.pricing",
                link: "/",
                parentId: 52
            },
            {
                id: 58,
                label: "menuitems.utility.list.error404",
                link: "/",
                parentId: 52
            },
            {
                id: 59,
                label: "menuitems.utility.list.error500",
                link: "/",
                parentId: 52
            }
        ]
    },
    {
        id: 60,
        label: "menuitems.components.text",
        isTitle: true
    },
    {
        id: 61,
        label: "menuitems.uielements.text",
        icon: "bx-tone",
        subItems: [
            {
                id: 62,
                label: "menuitems.uielements.list.alerts",
                link: "/",
                parentId: 61
            },
            {
                id: 63,
                label: "menuitems.uielements.list.buttons",
                link: "/",
                parentId: 61
            },
            {
                id: 64,
                label: "menuitems.uielements.list.cards",
                link: "/",
                parentId: 61
            },
            {
                id: 65,
                label: "menuitems.uielements.list.carousel",
                link: "/",
                parentId: 61
            },
            {
                id: 66,
                label: "menuitems.uielements.list.dropdowns",
                link: "/",
                parentId: 61
            },
            {
                id: 67,
                label: "menuitems.uielements.list.grid",
                link: "/",
                parentId: 61
            },
            {
                id: 68,
                label: "menuitems.uielements.list.images",
                link: "/",
                parentId: 61
            },
            {
                id: 69,
                label: "menuitems.uielements.list.modals",
                link: "/",
                parentId: 61
            },
            {
                id: 70,
                label: "menuitems.uielements.list.rangeslider",
                link: "/",
                parentId: 61
            },
            {
                id: 71,
                label: "menuitems.uielements.list.progressbar",
                link: "/",
                parentId: 61
            },
            {
                id: 72,
                label: "menuitems.uielements.list.sweetalert",
                link: "/",
                parentId: 61
            },
            {
                id: 73,
                label: "menuitems.uielements.list.tabs",
                link: "/",
                parentId: 61
            },
            {
                id: 74,
                label: "menuitems.uielements.list.typography",
                link: "/",
                parentId: 61
            },
            {
                id: 75,
                label: "menuitems.uielements.list.video",
                link: "/",
                parentId: 61
            },
            {
                id: 76,
                label: "menuitems.uielements.list.general",
                link: "/",
                parentId: 61
            },
            {
                id: 77,
                label: "menuitems.uielements.list.colors",
                link: "/",
                parentId: 61
            },
            {
                id: 78,
                label: "menuitems.uielements.list.lightbox",
                link: "/",
                parentId: 61
            },
            {
                id: 79,
                label: "menuitems.uielements.list.cropper",
                link: "/",
                parentId: 61
            }
        ]
    },
    {
        id: 79,
        label: "menuitems.forms.text",
        icon: "bxs-eraser",
        badge: {
            variant: "danger",
            text: 'menuitems.forms.badge'
        },
        subItems: [
            {
                id: 80,
                label: "menuitems.forms.list.elements",
                link: "/",
                parentId: 79
            },
            {
                id: 81,
                label: "menuitems.forms.list.layouts",
                link: "/",
                parentId: 79
            },
            {
                id: 81,
                label: "menuitems.forms.list.validation",
                link: "/",
                parentId: 79
            },
            {
                id: 82,
                label: "menuitems.forms.list.advanced",
                link: "/",
                parentId: 79
            },
            {
                id: 83,
                label: "menuitems.forms.list.editor",
                link: "/",
                parentId: 79
            },
            {
                id: 84,
                label: "menuitems.forms.list.fileupload",
                link: "/",
                parentId: 79
            },
            {
                id: 85,
                label: "menuitems.forms.list.repeater",
                link: "/",
                parentId: 79
            },
            {
                id: 86,
                label: "menuitems.forms.list.wizard",
                link: "/",
                parentId: 79
            },
            {
                id: 87,
                label: "menuitems.forms.list.mask",
                link: "/",
                parentId: 79
            }
        ]
    },
    {
        id: 88,
        icon: "bx-list-ul",
        label: "menuitems.tables.text",
        subItems: [
            {
                id: 89,
                label: "menuitems.tables.list.basic",
                link: "/",
                parentId: 88
            },
            {
                id: 90,
                label: "menuitems.tables.list.advanced",
                link: "/",
                parentId: 88
            }
        ]
    },
    {
        id: 91,
        icon: "bxs-bar-chart-alt-2",
        label: "menuitems.charts.text",
        subItems: [
            {
                id: 92,
                label: "menuitems.charts.list.apex",
                link: "/",
                parentId: 91
            },
            {
                id: 93,
                label: "menuitems.charts.list.chartjs",
                link: "/",
                parentId: 91
            },
            {
                id: 94,
                label: "menuitems.charts.list.chartist",
                link: "/",
                parentId: 91
            },
            {
                id: 95,
                label: "menuitems.charts.list.echart",
                link: "/",
                parentId: 91
            }
        ]
    },
    {
        id: 96,
        label: "menuitems.icons.text",
        icon: "bx-aperture",
        subItems: [
            {
                id: 97,
                label: "menuitems.icons.list.boxicons",
                link: "/",
                parentId: 96
            },
            {
                id: 98,
                label: "menuitems.icons.list.materialdesign",
                link: "/",
                parentId: 96
            },
            {
                id: 99,
                label: "menuitems.icons.list.dripicons",
                link: "/",
                parentId: 96
            },
            {
                id: 100,
                label: "menuitems.icons.list.fontawesome",
                link: "/",
                parentId: 96
            }
        ]
    },
    {
        id: 101,
        label: "menuitems.maps.text",
        icon: "bx-map",
        subItems: [
            {
                id: 102,
                label: "menuitems.maps.list.googlemap",
                link: "/",
                parentId: 101
            },
            {
                id: 103,
                label: "menuitems.maps.list.leafletmap",
                link: "/",
                parentId: 101
            },
        ]
    },
    {
        id: 104,
        label: "menuitems.multilevel.text",
        icon: "bx-share-alt",
        subItems: [
            {
                id: 105,
                label: "menuitems.multilevel.list.level1.1",
                link: "javascript: void(0);",
                parentId: 104
            },
            {
                id: 106,
                label: "menuitems.multilevel.list.level1.2",
                parentId: 104,
                subItems: [
                    {
                        id: 107,
                        label: "menuitems.multilevel.list.level1.level2.1",
                        link: "javascript: void(0);",
                        parentId: 106
                    },
                    {
                        id: 108,
                        label: "menuitems.multilevel.list.level1.level2.2",
                        link: "/",
                        parentId: 106
                    }
                ]
            }
        ]
    }
];

