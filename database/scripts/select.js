let connection = require('../connection');

function selectUser() {
    connection.query('SELECT * FROM Users', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
    });
}

selectUser();