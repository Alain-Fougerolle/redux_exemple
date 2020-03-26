const mysql = require('mysql');

class Sql {
    constructor() {

        this.bdd = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '', //password : 'wTOyqtzaFi',
            database : 'test-moneway-users'
        });

        this.sql = null;
        this.post = null;
        this.query = null;
    }

    BddConnection() {
        this.bdd.connect((err) => {
            if(err) throw err;
            console.log('Mysql connected !');
        }); // Return Si la Bdd est bien co
    }

    users(client) {
        this.sql = `SELECT * FROM users `;
        let tab = new Array();
        
        this.query = this.bdd.query(this.sql, (err, result) => {
            if(err) throw err;
            for(var results of result.values()) {

                let user = {
                    id          : results.id,
                    prenom      : results.prenom,
                    nom         : results.nom,
                    codePostal  : results.codePostal,
                    ville       : results.ville,
                    rue         : results.rue,
                    email       : results.email,
                    tel         : results.tel,
                    transaction : false
                }

                // Pour éviter une table de liaison avec jointure afin de gagner du temps pour le test
                // Stockage d'une string avec chaque valeur séparer par des virgules =)

                if(results.montant_Transaction.split(',').length > 1) {
                    user.transaction = [];

                    for (let i = 0; i < results.montant_Transaction.split(',').length; i++) {

                        let userTransaction = {
                            idT      : results.id_Transaction.split(',')[i],
                            dateT    : results.date_Transaction.split(',')[i],
                            montantT : results.montant_Transaction.split(',')[i],
                            lieuxT   : results.lieux_Transaction.split(',')[i]
                        }
                        
                        user.transaction.push(userTransaction);
                    }
                }

                tab.push(user);
            }

            client.emit("Users", tab);
        });
    }

    modifUser(modif) {
        this.post = modif;
        this.sql = `UPDATE users SET ? WHERE id = ` + modif.id;

        this.query = this.bdd.query(this.sql, this.post, (err, result) => {
            if(err) throw err;
            // console.log(result);
        });
    }
}

module.exports = { Sql };