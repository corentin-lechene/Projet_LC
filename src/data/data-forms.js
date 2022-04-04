import {sendGetDataTable} from "@/components/requests-bdd";
import {createValue} from "@/components/my-functions";

async function createSelect(route, attribute, placeHolder) {
    const res = await sendGetDataTable(route);
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

const companies = {label: "Nom de l'entreprise", placeHolder: "Choisir l'entreprise", type: "select", options: [] , onCreate: async (route) => { forms[route].companies.options = await createSelect('companies', ['company_id', 'company'], companies.placeHolder) }};
const sellers = {label: "Nom du vendeur", placeHolder: "Choisir le vendeur", type: "select", options: [] , onCreate: async (route) => { forms[route].sellers.options = await createSelect('sellers', ['seller_id', 'company'], sellers.placeHolder) }};

const nameCompany = {label: "Nom de l'entreprise", placeHolder: "Saisir le nom de l'entreprise", type: "text"};
const nameGood = {label: 'Nom du produit', placeHolder: "Saisir le nom du produit", type: 'text'};
const nameService = {label: 'Nom du service ', placeHolder: "Saisir le nom du service", type: 'text'};
const nameCategory = {label: 'Nom de la catégorie', placeHolder: "Saisir le nom de la catégorie", type: 'text'};
const nameCatalogue = {label: 'Nom de la catalogue', placeHolder: "Saisir le nom du catalogue", type: 'text'};

const job = {label: "Fonction", placeHolder: "Saisir la fonction", type: "text"};
const status = {label: "Status", type: "select", options: [{value: null, text: "Saisir le status", disabled: true}, {value: 'biens', text: "Biens"}, {value: 'services', text: "Services"}, {value: 'biens et services', text: "Biens et services"}]};
const categories = {label: 'Type de catégorie', type: 'select', options: [{value: null, text: "Saisir le type de catégorie", disabled: true}, {value: 'goods', text: "Produits"}, {value: 'services', text: "Services"}]};
const catalogues = {label: 'Type de catalogue', type: 'select', options: [{value: null, text: "Saisir le type de catalogue", disabled: true}, {value: 'goods', text: "Produits"}, {value: 'services', text: "Services"}]};

const description = {label: 'Description', placeHolder: "Saisir la description", type: 'textarea', rows: 3, max_rows: 6};
const price = {label: 'Prix', placeHolder: "Saisir le prix", type: 'number'};
const file = {label: 'Image', placeHolder: "Inserer le fichier", type: 'file', accept: ".jpg, .png, jpeg", browse_text: "Choisir l'image"};


const forms = {
    customers: {firstname, lastname, mail, companies},
    sellers: {firstname, lastname, mail, status, nameCompany},
    companies: {firstname, lastname, mail, nameCompany},
    staffs: {firstname, lastname, mail, job},

    goods: {nameGood, description, price, file, sellers},
    services: {nameService, description, price, file, sellers},

    categories: {nameCategory, categories},
    catalogues: {nameCatalogue, catalogues},

    warehouses: {address, phone},
}

export default forms;
