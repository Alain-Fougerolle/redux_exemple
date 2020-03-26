const { io } = require('./server.js');

const { Alpha } = require('./classes/Alpha.js');
const alpha = new Alpha();
alpha.sql.BddConnection();

io.on('connection', (client) => {

    client.on('recupUsers', () => {
        alpha.sql.users(client);
    });

    client.on('modifUser', (modif) => {
        alpha.sql.modifUser(modif);
    });

    client.on('disconnect', () => {
        // console.log("client disconnect");
    });
});