import { query } from '../connection';

function selectUser() {
    query('SELECT * FROM Users', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
    });
}

selectUser();