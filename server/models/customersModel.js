// import connection
import db, {encodeToken, generatePassword} from "../config/database.js";
import {sendEmail} from "../mails/mails.js";
import Stripe from "stripe";
import fetch from 'node-fetch';


// Get All Customers
export const getCustomers = (result) => {
    db.query("SELECT *, DATE_FORMAT(birthdate,'%d/%m/%Y') AS birthDay FROM users u INNER JOIN customers cu INNER JOIN companies co WHERE u.user_id = cu.user_id AND cu.company_id = co.company_id", (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

export const getCustomersByCompanyId = (id, result) => {
    db.query("SELECT * FROM customers INNER JOIN users u on customers.user_id = u.user_id WHERE company_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Get Single Customers
export const getCustomersById = (id, result) => {
    db.query("SELECT * FROM users INNER JOIN customers c on users.user_id = c.user_id WHERE c.customer_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

export const createPayment = async (data, token, pointsUse, result) => {
    let res = await fetch('http://localhost:9000/token', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({token: token})
    })
    const user = await res.json();

    if(user === undefined || user.result === [] ) {
        result({valid: false, result: "Err Token"});
    }

    res = await fetch('http://localhost:9000/carts-customer/'+ user.result.customer_id, {
        method: 'get',
        headers: {'Content-Type': 'application/json'}
    });
    const cart = await res.json();
    const finalTotal = (cart.result.map(item => item.total).reduce((prev, curr) => prev + curr, 0));
    let total = finalTotal * 0.3;
    for (let i = 1; i < finalTotal / 100; i++) {
        total++;
    }
    const totalPoint = total.toFixed(0);

    res = await fetch('http://localhost:9000/customers/'+ user.result.customer_id,{
        method: 'get',
        headers: {'Content-Type': 'application/json'}
    });
    const cus = await res.json();

    const points = totalPoint - pointsUse;

    await fetch('http://localhost:9000/cards/'+ cus.result.card_id,{
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({points: points})
    });


    try {
        const stripe = Stripe(process.env.SECRET_KEY_STRIPE);

        const customer = await stripe.customers.create({
            name: user.result.firstname +""+  user.result.lastname
        });

        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: {token: data.id}
        });

        const t = (finalTotal - pointsUse * 0.2).toFixed(2).replace('.', '');
        const paymentIntent = await stripe.paymentIntents.create({
            amount: t,
            currency: 'eur',
            customer: customer.id,
            payment_method: paymentMethod.id,
            automatic_payment_methods: {enabled: true},
            confirm: true,
            return_url: 'http://localhost:8081/'
        });

        // Send the result to the client
        const response = generateResponse(paymentIntent);

        if(response.success !== undefined) {
            await fetch('http://localhost:9000/carts/'+ cart.result[0].cart_id, {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({customer_id: user.result.customer_id})
            });

            for (let i = 0; i < cart.result.length; i++) {
                if(cart.result[i].cart_name === 'goods') {
                    await fetch('http://localhost:9000/warehouses_stocks/'+ cart.result[i].product_id, {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({quantity: cart.result[i].cart_quantity})
                    });
                }
            }
            sendEmail(user.result.mail, "Merci pour votre achat", "<h1>Votre achat blabla</h1><p>Votre facture ci-jointe ou dans votre espace mes commandes.</p><p>A bientot chez LoyaltyCard</p>")
        }

        result(response);
    } catch (e) {
        // Display error on client
        return result({error: e.message});
    }
}

const generateResponse = (intent) => {
    // Note that if your API version is before 2019-02-11, 'requires_action'
    // appears as 'requires_source_action'.
    if (
        intent.status === 'requires_action' &&
        intent.next_action.type === 'use_stripe_sdk'
    ) {
        // Tell the client to handle the action
        return {
            requires_action: true,
            payment_intent_client_secret: intent.client_secret
        };
    } else if (intent.status === 'succeeded') {
        // The payment didn’t need any additional actions and completed!
        // Handle post-payment fulfillment
        return {
            success: true
        };
    } else {
        // Invalid status
        return {
            error: 'Invalid PaymentIntent status'
        }
    }
};

// Insert Customers to Database
export const insertCustomers = (data, result) => {
    for (const dataKey in data) {
        if (data[dataKey] === "" || data[dataKey] === null)
            result({valid: false, result: "row empty"});
    }
    db.query("SELECT user_id FROM users WHERE mail = ?", [data.mail], (err, resultsEmail) => {
        if (err) {
            result(err);
        } else if (resultsEmail[0]) {
            result({valid: false, result: "Email already used"});
        } else {
            const password = generatePassword();
            db.query("INSERT INTO users(firstname, lastname, mail, password, role) VALUE(?, ?, ?, ?, 'customers')", [data.firstname, data.lastname, data.mail, password.pwd_hash], (err, resultsUsers) => {
                if (err) {
                    result({error: true, reason: err});
                } else if (resultsUsers.insertId) {
                    const user_id = resultsUsers.insertId;
                    const token = encodeToken({user_id: user_id, role: data.role});
                    db.query("UPDATE users set token = ? WHERE user_id = ?", [token, user_id], (err) => {
                        if (err) {
                            result({error: true, reason: err});
                        } else {
                            db.query("INSERT INTO cards(code, points) VALUES(?, ?)", [token, 0], (err, resultsCards) => {
                                if (err) {
                                    result({error: true, reason: err});
                                } else if (resultsCards.insertId) {
                                    const card_id = resultsCards.insertId;
                                    db.query("INSERT INTO customers(card_id, company_id, user_id) VALUES(?, ?, ?)", [card_id, data.companies, user_id], (err, results) => {
                                        if (err) {
                                            result({error: true, reason: err});
                                        } else if (results.insertId) {
                                            const templateRegister = `
                                        <h3>Bonjour ${data.firstname},</h3>
                                        <p>Un compte a été créé par votre entreprise.</p>
                                        <p>Pour vous connecter, voici vos identifiants.</p>
                                        <p>Email : ${data.mail}</p>    
                                        <p>Mot de passe : ${password.pwd_visible}</p> 
                                        <p>Vous pouvez vous connecter <a href="http://localhost:8081/login">ici</a></p>
                                        <p>Cordialement</p>
                                        <p><u>LoyaltyCard</u></p>
                                    `; //FIXME changer l'adresse du lien
                                            sendEmail(data.mail, "Inscription sur LoyaltyCard", templateRegister);
                                            result({valid: true, result: "OK"});
                                        } else {
                                            result({valid: false, result: results});
                                        }
                                    })
                                }
                            })
                        }
                    });
                }
            });
        }
    });
}

// Update Customers to Database
export const updateCustomersById = (data, id, result) => {
    db.query("UPDATE users SET ? WHERE user_id = ?", [data, id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Delete Customers to Database
export const deleteCustomersById = (id, result) => {
    db.query("DELETE FROM customers WHERE customer_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else if (results.affectedRows !== 0) {
            result({valid: true, result: "Colonne supprimée"});
        } else {
            result({valid: false, reason: "Colonne non supprimée ou inexistante"});
        }
    });
}
