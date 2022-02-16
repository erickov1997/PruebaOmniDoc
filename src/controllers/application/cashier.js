const express = require('express');
const router = express.Router();
const {searchClient} = require('../../models/auth/authmodel')
const { depostiMoney, withdrawcash } = require('../../models/cashier/cashiermodel')

router.get('/Home/:id', async (req, res) => {
    let client = await searchClient(req.params.id, 'idClient');
    res.render('../views/layouts/cashier/home', { client: client[0] })
});

router.post('/DepositMoney/:id', async (req, res) => {
    let deposit = await depostiMoney(req.body.moneyD, req.params.id);
    console.log(deposit);
    req.flash(deposit[0], deposit[1]);
    res.redirect(`/Home/${req.params.id}`)
})


router.post('/withdrawcash/:id/:cuenta/:tipo', async (req, res) => {
    let deposit = await withdrawcash(parseInt(req.body.moneyR), req.params);
    console.log(req.params)
    req.flash(deposit[0], deposit[1]);
    res.redirect(`/Home/${req.params.id}`)
})
    
/*router.post('/payCreditCard/:id/:cuenta', async (req, res) => {
    let deposit = await withdrawcash(parseInt(req.body.moneyR), req.params);
    req.flash(deposit[0], deposit[1]);
    res.redirect(`/Home/${req.params.id}`)
})*/

module.exports = router;