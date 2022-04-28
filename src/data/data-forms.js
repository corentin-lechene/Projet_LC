import {sendGetDataTable} from "@/components/requests-bdd";
import {createValue} from "@/components/my-functions";

async function createSelect(route, id, attribute, placeHolder) {
    const res = id === -1 ? await sendGetDataTable(route) : await sendGetDataTable(route, id);
    let b = createValue(res.result, attribute);
    for (let i = 0; i < b.length; i++) {
        b[i].value = b[i][attribute[0]];
        delete b[i][attribute[0]];
        b[i].text = b[i][attribute[1]];
        delete b[i][attribute[1]];
    }
    b.unshift({value: null, text: placeHolder, disabled: true});
    return b;
}


const firstname = {label: "Prénom", placeHolder: "Saisir le prénom", type: "text"};
const lastname = {label: "Nom", placeHolder: "Saisir le nom", type: "text"};
const mail = {label: "Email", placeHolder: "Saisir l'email", type: "email"};
const address = {label: 'Adresse', placeHolder: "Saisir l'adresse", type: 'textarea', rows: 2, max_rows: 4};
const phone = {label: "Téléphone", placeHolder: "Saisir le numéro de téléphone", type: "tel"};

const description = {label: 'Description', placeHolder: "Saisir la description", type: 'textarea', rows: 3, max_rows: 6};
const job = {label: "Fonction", placeHolder: "Saisir la fonction", type: "text"};
const price = {label: 'Prix', placeHolder: "Saisir le prix", type: 'number'};
const revenue = {label: 'Revenue', placeHolder: "Saisir le montant du revenue", type: 'number'};
const quantity = {label: 'Quantité', placeHolder: "Saisir la quantité", type: 'number'};
const file = {label: 'Image', placeHolder: "Inserer le fichier", type: 'file', accept: "image/jpeg, image/png, image/jpg", browse_text: "Choisir l'image"};
const startDate = {label: 'Date', placeHolder: "Saisir la date de début", type: 'date'};
const endDate = {label: 'Date', placeHolder: "Saisir la date de fin", type: 'date'};

const nameCompany = {label: "Nom de l'entreprise", placeHolder: "Saisir le nom de l'entreprise", type: "text"};
const nameGood = {label: 'Nom du produit', placeHolder: "Saisir le nom du produit", type: 'text'};
const nameService = {label: "Nom du service ", placeHolder: "Saisir le nom du service", type: 'text'};
const nameCategory = {label: "Nom de la catégorie", placeHolder: "Saisir le nom de la catégorie", type: 'text'};
const nameCatalogue = {label: "Nom de la catalogue", placeHolder: "Saisir le nom du catalogue", type: 'text'};
const nameWareHouse = {label: "Nom de l'entrepot", placeHolder: "Saisir le nom de l'entrepot", type: 'text'};

const goods = {
    label: "les biens",
    placeHolder: "Choisir les biens",
    type: "select",
    options: [],
    onCreate: async (route, id) => {
        forms[route].goods.options = await createSelect('goods', id, ['good_id', 'name'], goods.placeHolder)
    }
};
const services = {
    label: "les services",
    placeHolder: "Choisir les services",
    type: "select",
    options: [],
    onCreate: async (route, id) => {
        forms[route].services.options = await createSelect('services', id, ['service_id', 'name'], services.placeHolder)
    }
};
const companies = {
    label: "Nom de l'entreprise",
    placeHolder: "Choisir l'entreprise",
    type: "select",
    options: [],
    onCreate: async (route, id) => {
        forms[route].companies.options = await createSelect('companies', id, ['company_id', 'company'], companies.placeHolder)
    }
};
const sellers = {
    label: "Nom du vendeur",
    placeHolder: "Choisir le vendeur",
    type: "select",
    options: [],
    onCreate: async (route, id) => {
        sellers.options = await createSelect('sellers', id, ['seller_id', 'company'], sellers.placeHolder)
    }
};
const warehouses = {
    label: "Entrepot",
    placeHolder: "Choisir l'entrepot",
    type: "select",
    options: [],
    onCreate: async (route, id) => {
        forms[route].warehouses.options = await createSelect('warehouses', id, ['warehouse_id', 'name_warehouse'], warehouses.placeHolder)
    }
};

const categories = {
    label: "Catégorie du produit",
    placeHolder: "Choisir la catégorie",
    type: "select",
    options: [],
    onCreate: async (route, id) => {
        forms[route].categories.options = await createSelect('categories', id, ['category_id', 'title'], categories.placeHolder)
    }
};

const status = {
    label: "Status",
    type: "select",
    options: [
        {value: null, text: "Saisir le status", disabled: true},
        {value: 'biens', text: "Biens"},
        {value: 'services', text: "Services"},
        {value: 'biens et services', text: "Biens et services"}
    ]
};
// eslint-disable-next-line no-unused-vars
const typeProducts = {
    label: "Categories",
    type: "select",
    options: [
        {value: null, text: "Saisir le type de produit", disabled: true},
        {value: 'biens', text: "Biens"},
        {value: 'services', text: "Services"},
        {value: 'biens et services', text: "Biens et Services"},
    ]
};

const forms = {
    customers: {firstname, lastname, mail, companies},
    sellers: {firstname, lastname, mail, status, nameCompany},
    companies: {firstname, lastname, mail, nameCompany, revenue},
    staffs: {firstname, lastname, mail, job},

    goods: {nameGood, description, price, file, sellers, categories},
    services: {nameService, description, price, file, sellers, categories},

    categories: {nameCategory, typeProducts},
    catalogues: {nameCatalogue, startDate, endDate, file},

    warehouses: {nameWareHouse, address, phone},
    warehouses_stocks: {warehouses, goods, quantity} //tous les warehouses, tous les goods, nombre stock, mettre en ligne
}

export default forms;
