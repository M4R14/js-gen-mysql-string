var {QuryMysql} = require('./js_gen_mysql');

// test
var mysql = new QuryMysql('dog');
console.log("select * some table. :", mysql.toSql === "SELECT * FROM dog;");

var mysql = new QuryMysql('dog').select(['A','B']);
console.log("select some colum. :", mysql.toSql == "SELECT A,B FROM dog;"); 

var mysql = new QuryMysql('dog').where('A','=',1);
console.log("select * where some value. :", mysql.toSql == "SELECT * FROM dog WHERE A = 1;"); 

var mysql = new QuryMysql('dog').where('A','=',1).where('B','>',2);
console.log("select * 2 condition. :", mysql.toSql == "SELECT * FROM dog WHERE A = 1 AND B > 2;");

var mysql = new QuryMysql('dog').where('A','=','string');
console.log("select * where string value. :", mysql.toSql == "SELECT * FROM dog WHERE A = 'string';");

var mysql = new QuryMysql('dog').where('A','=','string').where('B','=','string2');
console.log("select * 2 condition where string value. :", mysql.toSql == "SELECT * FROM dog WHERE A = 'string' AND B = 'string2';");

var mysql = new QuryMysql('dog').orderBy(['A'],'ASC');
console.log("select * FROM ? ORDER BY ?. :", mysql.toSql === "SELECT * FROM dog ORDER BY A ASC;");

var mysql = new QuryMysql('dog').select(['A','B']).where('A','=',1);
console.log("select some colum and 1 condition. :", mysql.toSql == "SELECT A,B FROM dog WHERE A = 1;");

var mysql = new QuryMysql('dog').select(['A','B']).where('A','=',1).where('B','>',2);
console.log("select some colum and 2 condition. :", mysql.toSql == "SELECT A,B FROM dog WHERE A = 1 AND B > 2;");

var mysql = new QuryMysql('dog').select(['A','B']).where('A','=',1).orderBy(['A'],'ASC');
console.log("select some colum and 1 condition ORDER BY ?. :", mysql.toSql == "SELECT A,B FROM dog WHERE A = 1 ORDER BY A ASC;");

var mysql = new QuryMysql('dog').orderBy(['A']);
console.log("select * FROM ? ORDER BY ? Without ASC|DESC :", mysql.toSql === "SELECT * FROM dog ORDER BY A ASC;");

console.log("\n",mysql.toSql);