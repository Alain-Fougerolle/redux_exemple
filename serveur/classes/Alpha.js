const { Sql } = require('./Sql.js');

class Alpha {
    constructor() {
        this.sql = new Sql();
    }
}

module.exports = { Alpha };