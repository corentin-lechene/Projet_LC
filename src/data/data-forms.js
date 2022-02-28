const formData = {

    register: {
        firstname: {
            id: 0,
            title: "Prénom",
            type: "text",
            placeholder: "Prénom"
        },
        lastname: {
            id: 1,
            title: "Nom",
            type: "text",
            placeholder: "Nom"
        },
        mail: {
            id: 2,
            title: "Email",
            type: "email",
            placeholder: "Email"
        }
    },


    customer: {
        firstname: {
            id: 0,
            title: "Prénom",
            type: "text",
            placeholder: "Prénom"
        },
        lastname: {
            id: 1,
            title: "Nom",
            type: "text",
            placeholder: "Nom"
        },
        mail: {
            id: 2,
            title: "Email",
            type: "email",
            placeholder: "Email"
        },
        birthdate: {
            id: 3,
            title: "Date de naissance",
            type: "text",
            placeholder: "Date de naissance"
        },
        phone: {
            id: 4,
            title: "Téléphone",
            type: "tel",
            placeholder: "Téléphone",
            pattern: "[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}"
        },
        address: {
            id: 5,
            title: "Adresse",
            type: "text",
            placeholder: "Adresse"
        },
        city: {
            id: 6,
            title: "Ville",
            type: "text",
            placeholder: "Ville"
        },
        country: {
            id: 7,
            title: "Pays",
            placeholder: "Pays"
        },
        postal_code: {
            id: 8,
            title: "Code Postal",
            type: "text",
            placeholder: "Code Postal",
            pattern: "[0-9]{5}"
        },
    },

    other: {
        firstname: {
            id: 0,
            title: "Prénom",
            type: "text",
            placeholder: "Prénom"
        },
        lastname: {
            id: 1,
            title: "Nom",
            type: "text",
            placeholder: "Nom"
        },
        mail: {
            id: 2,
            title: "Email",
            type: "email",
            placeholder: "Email"
        },
        phone: {
            id: 4,
            title: "Téléphone",
            type: "tel",
            placeholder: "Téléphone",
            pattern: "[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}"
        },
        company: {
            id: 9,
            title: "Nom entreprise",
            type: "text",
            placeholder: "Entreprise"
        },
    }
}
export { formData };