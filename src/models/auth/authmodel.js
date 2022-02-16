const db = require('../../config/keys');
const sql = require('mssql');

async function RegisterClient(client) {
    const pool = await sql.connect(db);

    try {
        if (client.name == '' || client.lastname == '' || client.age == '' || client.nip == '' || client.Cnip == '' || client.InitBal == '') {
            return ['message' , 'Debe llenar todos los campos']
        } else if (client.age < 18) {
            return ['message' , 'Debes ser mayor de edad para poder abrir una cuenta'];
        } else if (parseInt(client.InitBal) < 1000) {
            return ['message' ,'El saldo inicial de tu cuenta debe ser mayor a $1,000'];
        } else if (client.nip != client.Cnip) {
            return [ 'message' , 'Tu nip no coincide'];
        } else {
            let existClient = await searchClient(client.nip, 'nip').length;
            if (existClient > 0) {
                return [ 'message', 'Ya existe un usuario con el mismo nip, introduce uno nuevo'];
            } else {
                let register = await pool.request().query(`INSERT INTO  Cliente (nombre,apellidos,edad,nip,saldo,saldoCred) VALUES ('${client.name}','${client.lastname}',${client.age},${client.nip},${client.InitBal},${client.InitBal})`);
                return ['success' , 'Te haz registrado correctamente'];
            }
        }
    } catch (error) {
        console.log(error)
    }
}

async function searchClient(valor, campo) {
    const pool = await sql.connect(db);
    try {
        let client = await pool.request().query(`SELECT * FROM Cliente where ${campo} =${valor}`)
        return client.recordset
    } catch (error) {
        console.log(error)
    }
}

module.exports = { RegisterClient, searchClient }