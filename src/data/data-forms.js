const firstname = {id: 0, title: "Prénom", type: "text"};
const lastname = {id: 1, title: "Nom", type: "text"};
const mail = {id: 2, title: "Email", type: "email"};
const job = {id: 3, title: "Fonction", type: "text"}
const status = {id: 3, title: "Status", type: "select", options: ["Biens", "Services", "Biens et services"]};
const company = {id: 4, title: "Nom de l'entreprise", type: "text"};
const company_id = {id: 3,title: "Nom d'entreprise",type: "select",options: [{ value: 1, text: 'esgi' },{ value: 2, text: 'myges' }]};
const nameGood = {id: 0, title: 'goods', input: 'text'};
const nameService = {id: 0, title: 'services', input: 'text'};

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
        },
        goods: {
            name: {
                id: 0,
                title: 'bien',
                input: 'text'
            }
        },
        services: {
            name: {
                id: 0,
                title: 'service',
                input: 'text'
            }
        },
    },
}
export {formData};

const forms = {
    staffs: {firstname, lastname, mail, job},
    sellers: {firstname, lastname, mail, status, company},
    companies: {firstname, lastname, mail, company},
    customers: {firstname, lastname, mail, company_id},
    goods: {nameGood},
    services: {nameService},
}

export default forms;