const cors = require('cors');
const express = require('express');
const app = express();

// to do 
const stripe = require('stripe')('sk_test_51QQS8kGvPiJHqRNuAePMCJhROlCiTRH06KSouy0vTu6ECBRMQ3YFK227gUipk2yQJYKzlNwYB27HuNJcyKM8fNk500QEcrsdqz');
const { v4: uuidv4 } = require('uuid');




//middleware
app.use(express.json());
app.use(cors());


//routes
app.get('/', function (req, res) {
    res.send('Hello World')
})

app.post('/payment', function (req, res) {
    const { product, token } = req.body;
    console.log("PRODUCT", product);
    console.log("PRICE", product.price);

    const idempotencyKey = uuidv4();
    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            amount: product.price * 100,
            currency: 'USD',
            customer: customer.id,
            receipt_id: customer.email,
            description: `purchase of ${product.name}`,
            shipping: {
                name: token.card.name,
                address: {
                    country: token.card.address_country
                }
            }
        }, { idempotencyKey })
    }).then(result => {
        res.status(200).json(result)
    })
})

app.listen(8282)