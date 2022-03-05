const formData = {

    register: {
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
export { formData };