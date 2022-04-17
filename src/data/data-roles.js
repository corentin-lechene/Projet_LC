const profile = {link: '#profile', name: 'Profile', icon: 'bx-user-circle'};
const settings = {link: '#settings', name: 'Settings', icon: 'bx-cog'};
const dashboard = {link: '#dashboard', name: 'Dashboard', icon: 'bx-grid-alt'};
const logs = {link: '#logs', name: 'Logs', icon: 'bx-news'};
const mycard = {link: '#mycard', name: 'My Card', icon: 'bx bx-food-menu'}


const users = {link: '#users', name: 'Users', icon: 'bx-user'};
const customers = {link: '#customers', name: 'Customers', icon: 'bxs-user-detail'};
const companies = {link: '#companies', name: 'Companies', icon: 'bx-building'};
const sellers = {link: '#sellers', name: 'Sellers', icon: ' bx-store'};
const warehouses = {link: '#warehouses', name: 'Warehouses', icon: 'bx-home-alt'};

const orders = {link: '#orders', name: 'Orders', icon: 'bx-cart'};
const goods = {link: '#goods', name: 'Goods', icon: 'bx-shopping-bag'};
const services = {link: '#services', name: 'Services', icon: 'bxs-plane-alt'};
const categories = {link: '#categories', name: 'Categories', icon: 'bx bx-list-ul'};
const catalogues = {link: '#catalogues', name: 'Catalogues', icon: 'bx bx-food-menu'}


const roles = {
    customers: [profile, orders, settings, mycard],
    sellers: [dashboard, profile, goods, services, orders, settings],
    companies: [profile, customers, settings],
    staffs: [profile, users, companies, sellers, goods, services, warehouses, categories, catalogues, settings],
    admin: [profile, users, companies, sellers, goods, services, warehouses, categories, catalogues, logs, settings]
};
export default roles;
