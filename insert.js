//To INSERT random data into posts table
const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const getRandomQuote = require('random-quote-generator5.0');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'DB1',
    password: 'Jaikar123'
});

let getRandomUser= () => {
    return [
      faker.string.uuid(),
      faker.internet.userName(),
      getRandomQuote()
    ];
}
// console.log(getRandomUser());

let q='INSERT INTO posts (id, username, content) VALUES ?;';
let data=[];
for(let i=1;i<=10;i++){
    data.push(getRandomUser());
}
// console.log(data);

try{
    connection.query(q, [data],
        (err, results, fields)=> {
            if(err)     throw err;
            console.log(results);
        }
    );
}
catch(err){
    console.log(err);
}

connection.end();