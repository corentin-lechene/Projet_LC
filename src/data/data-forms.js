const formData = {

    register: {
        staffs: {
            firstname: {
                id: 0,
                title: "Prénom",
                type: "text"
            },
            lastname: {
                id: 1,
                title: "Nom",
                type: "text"
            },
            mail: {
                id: 2,
                title: "Email",
                type: "email"
            },
            job: {
                id: 3,
                title: "Fonction",
                type: "text",
            }
        },
        sellers: {
            firstname: {
                id: 0,
                title: "Prénom",
                type: "text"
            },
            lastname: {
                id: 1,
                title: "Nom",
                type: "text"
            },
            mail: {
                id: 2,
                title: "Email",
                type: "email"
            },
            status: {
                id: 3,
                title: "Status",
                type: "select",
                options: [
                    "Biens",
                    "Services",
                    "Biens et services"
                ]
            },
            company: {
                id: 4,
                title: "Nom de l'entreprise",
                type: "text"
            }
        },
        companies: {
            firstname: {
                id: 0,
                title: "Prénom",
                type: "text"
            },
            lastname: {
                id: 1,
                title: "Nom",
                type: "text"
            },
            mail: {
                id: 2,
                title: "Email",
                type: "email"
            },
            company: {
                id: 3,
                title: "Nom de l'entreprise",
                type: "text"
            }
        },
        customers: {
            firstname: {
                id: 0,
                title: "Prénom",
                type: "text"
            },
            lastname: {
                id: 1,
                title: "Nom",
                type: "text"
            },
            mail: {
                id: 2,
                title: "Email",
                type: "email"
            },
            company_id: {
                id: 3,
                title: "Nom d'entreprise",
                type: "select",
                options: [
                    { value: 1, text: 'esgi' },
                    { value: 2, text: 'myges' }
                ]
            }
        }


    },


    customer: {
        firstname: {
            id: 0,
            title: "Prénom",
            type: "text"
        },
        lastname: {
            id: 1,
            title: "Nom",
            type: "text"
        },
        mail: {
            id: 2,
            title: "Email",
            type: "email"
        },
        birthdate: {
            id: 3,
            title: "Date de naissance",
            type: "date"
        },
        phone: {
            id: 4,
            title: "Téléphone",
            type: "tel",
        },
        address: {
            id: 5,
            title: "Adresse",
            type: "text"
        },
        city: {
            id: 6,
            title: "Ville",
            type: "text"
        },
        country: {
            id: 7,
            title: "Pays",
            type: "select",
            options: [
                "France",
                "Suisse",
                "Belgique",
                "Luxembourg",
                "Royaume-Uni",
                "Irlande"
            ]
        },
        postal_code: {
            id: 8,
            title: "Code Postal",
            type: "text"
        },
    },

    other: {
        firstname: {
            id: 0,
            title: "Prénom",
        },
        lastname: {
            id: 1,
            title: "Nom",
        },
        mail: {
            id: 2,
            title: "Email",
        },
        phone: {
            id: 4,
            title: "Téléphone",
        },
        company: {
            id: 9,
            title: "Nom entreprise",
        },
    }
}
export {formData};