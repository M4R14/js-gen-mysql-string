var clc = require('cli-color');
var {QuryMysql} = require('./js_gen_mysql');

function test_value_should_be(title, value, should_be){
    console.log(value == should_be ?  clc.greenBright('trun') : clc.redBright('false') ,":",title);
}

// test
var mysql = new QuryMysql('dog');
test_value_should_be("select * some table. ", mysql.toSql, "SELECT * FROM dog;");

var mysql = new QuryMysql('dog').select(['A','B']);
test_value_should_be("select some column. ", mysql.toSql , "SELECT A,B FROM dog;"); 

var mysql = new QuryMysql('dog').where('A','=',1);
test_value_should_be("select * where some value. ", mysql.toSql , "SELECT * FROM dog WHERE A = 1;"); 

var mysql = new QuryMysql('dog').where('A','=',1).where('B','>',2);
test_value_should_be("select * 2 condition. ", mysql.toSql , "SELECT * FROM dog WHERE A = 1 AND B > 2;");

var mysql = new QuryMysql('dog').where('A','=','string');
test_value_should_be("select * where string value. ", mysql.toSql , "SELECT * FROM dog WHERE A = 'string';");

var mysql = new QuryMysql('dog').where('A','=','string').where('B','=','string2');
test_value_should_be("select * 2 condition where string value. ", mysql.toSql , "SELECT * FROM dog WHERE A = 'string' AND B = 'string2';");

var mysql = new QuryMysql('dog').orderBy(['A'],'ASC');
test_value_should_be("select * FROM ? ORDER BY ?. ", mysql.toSql , "SELECT * FROM dog ORDER BY A ASC;");

var mysql = new QuryMysql('dog').select(['A','B']).where('A','=',1);
test_value_should_be("select some column and 1 condition. ", mysql.toSql, "SELECT A,B FROM dog WHERE A = 1;");

var mysql = new QuryMysql('dog').select(['A','B']).where('A','=',1).where('B','>',2);
test_value_should_be("select some column and 2 condition. ", mysql.toSql , "SELECT A,B FROM dog WHERE A = 1 AND B > 2;");

var mysql = new QuryMysql('dog').select(['A','B']).where('A','=',1).orderBy(['A'],'ASC');
test_value_should_be("select some column and 1 condition ORDER  BY ?. ", mysql.toSql, "SELECT A,B FROM dog WHERE A = 1 ORDER BY A ASC;");

var mysql = new QuryMysql('dog').orderBy(['A']);
test_value_should_be("select * FROM ? ORDER BY ? Without ASC|DESC ", mysql.toSql, "SELECT * FROM dog ORDER BY A ASC;");

var mysql = new QuryMysql('table_name').insert(['value1', 'value2', 'value3']);
test_value_should_be("INSERT INTO only data type String", mysql.toSql,"INSERT INTO table_name VALUES ('value1','value2','value3');")

var mysql = new QuryMysql('table_name').insert(['value1', 0, 49]);
test_value_should_be("INSERT INTO only data type String and number", mysql.toSql,"INSERT INTO table_name VALUES ('value1',0,49);")

console.log("\n",mysql.toSql);