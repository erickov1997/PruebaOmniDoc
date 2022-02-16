const express = require('express');
const router = express.Router();
const { RegisterClient, searchClient, depostiMoney, withdrawcash } = require('../../models/auth/authmodel')


router.get('/LogIn', (req, res) => {
    res.render('../views/auth/LogIn')
});

router.post('/LogIn', async (req, res) => {
    if (req.body.nipL != '') {
        let clientData = await searchClient(req.body.nipL, 'nip');
        if (clientData.length == 0) {
            req.flash('message', 'NIP invalido');
            res.redirect('/LogIn');
        } else {
            res.redirect(`/Home/${clientData[0].idClient}`)
        }
    } else {
        req.flash('message', 'NIP invalido');
        res.redirect('/LogIn');
    }
});

router.get('/SignIn', (req, res) => {
    res.render('../views/auth/signIn')
});

router.post('/SignIn', async (req, res) => {
    console.log(req.body);
    let message = await RegisterClient(req.body)
    req.flash(message[0], message[1]);
    res.redirect('/SignIn')
});


module.exports = router;