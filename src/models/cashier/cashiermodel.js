const db = require('../../config/keys');
const sql = require('mssql');

async function depostiMoney(money, id) {
    try {
        const pool = await sql.connect(db);
        if (money > 10000) {
            return ['message', 'La cantidad maxima que puedes depositar es: $10,000']
        } else {
            let saldo = await GetSaldo(id, 'saldo');
            let moneyTot = saldo + parseInt(money);
            await pool.request().query(`UPDATE Cliente set saldo= ${moneyTot} where idClient = ${id}`);
            return ['success', 'Operacion realizada con exito'];
        }
    } catch (error) {
        console.log(error);
    }
}

async function withdrawcash(money, params) {
    try {
        const pool = await sql.connect(db);
        let saldo = await GetSaldo(parseInt(params.id), params.cuenta);

        if (money > saldo) {
            return ['message', 'No cuentas con fondos suficientes para realizar la operacion']
        } else {
            let moneyTot;
            if ((params.cuenta =='saldoCred' && params.tipo == 'pago') || (params.cuenta == 'saldo' && params.tipo == 'retiro')) {
                moneyTot = saldo - parseInt(money);
            } else {
                moneyTot = saldo - (parseInt(money) + (parseInt(money) * .005))
            }
            console.log(' moneyTot ', moneyTot )
            await pool.request().query(`UPDATE Cliente set ${params.cuenta} = ${moneyTot} where idClient = ${params.id}`);
            return ['success', 'Operacion realizada con exito'];
        }
    } catch (error) {
        console.log(error);
    }
}

async function GetSaldo(id, cuenta) {
    console.log('id: ', typeof id, '  cuenta: ', typeof cuenta)
    const pool = await sql.connect(db);
    let Yourmoney = await pool.request().query(`SELECT ${cuenta} from  Cliente where idClient = ${id}`);
    console.log('Yourmoney: ', Yourmoney.recordset)
    if (cuenta == 'saldo') {
        return Yourmoney.recordset[0].saldo;
    } else {
        return Yourmoney.recordset[0].saldoCred;

    }
}

module.exports = { depostiMoney, withdrawcash }