var clc = require('cli-color');
var {QuryMysql} = require('./qury-mysql');

var true_score = 0;
var false_score = 0;
function test_value_should_be(title, value, should_be){
    if(value == should_be){
       var result = clc.greenBright('trun');
       true_score++;
    }else{
       false_score++; 
       var result = clc.redBright('false');
    }
    console.log( result,":",title);
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

var mysql = new QuryMysql('users').update({username:'mark', password:'000000'}).where('user_id','=',100);
test_value_should_be(
    "UPDATE SET WHERE data type Json", 
    mysql.toSql,
    "UPDATE users SET username = 'mark', password = '000000' WHERE user_id = 100;")

var mysql = new QuryMysql('users').where('user_id','=',100).delete();
test_value_should_be("DELETE WHERE", mysql.toSql,"DELETE FROM users WHERE user_id = 100;")

var mysql = new QuryMysql('users').where('user_id','=','UX100').delete();
test_value_should_be("DELETE WHERE Data type String", mysql.toSql,"DELETE FROM users WHERE user_id = 'UX100';")

var mysql = new QuryMysql('users').where('user_id','=','UX100').where('status','=',100).delete();
test_value_should_be("DELETE WHERE 2 condition Data type String and number", mysql.toSql,"DELETE FROM users WHERE user_id = 'UX100' AND status = 100;")

var mysql = new QuryMysql('user').join('role','user.user_id','=','role.user_id');
test_value_should_be("JOIN", mysql.toSql, "SELECT * FROM user JOIN role ON user.user_id = role.user_id;");

var mysql = new QuryMysql('user').join('role','user.user_id','=','role.user_id').join('detail','user.user_id','=','detail.user_id');
test_value_should_be("JOIN 3 tatle", mysql.toSql, 
"SELECT * FROM user JOIN role ON user.user_id = role.user_id JOIN detail ON user.user_id = detail.user_id;");

var mysql = new QuryMysql('user').select(['user.username','role.*']).join('role','user.user_id','=','role.user_id');
test_value_should_be("JOIN AND SELECT COLUMN", mysql.toSql, "SELECT user.username,role.* FROM user JOIN role ON user.user_id = role.user_id;");

var mysql = new QuryMysql('user').whereIn('status',['1','2',3]);
test_value_should_be("Setect * WhereIn", mysql.toSql, "SELECT * FROM user WHERE status IN ('1','2',3);")

var mysql = new QuryMysql('user').whereNull('password');
test_value_should_be("Setect * Where is Null", mysql.toSql, "SELECT * FROM user WHERE password IS NULL;")

var mysql = new QuryMysql('user').whereNull('password').whereNull('status').select(['user_id','username']);
test_value_should_be("Setect columns Where is Null (2 condition)", mysql.toSql, "SELECT user_id,username FROM user WHERE password IS NULL AND status IS NULL;")

var mysql = new QuryMysql('user').whereNot('status','=',3);
test_value_should_be("Setect * whereNot", mysql.toSql, "SELECT * FROM user WHERE NOT status = 3;")

var mysql = new QuryMysql('user').whereNot('status','=',3).whereNot('status','=',2);
test_value_should_be("Setect * whereNot (2 condition)", mysql.toSql, "SELECT * FROM user WHERE NOT status = 3 AND NOT status = 2;")

var mysql = new QuryMysql('user').where('status', '=',3).orWhere('status', '=',1);
test_value_should_be("Setect * where or", mysql.toSql, "SELECT * FROM user WHERE status = 3 OR status = 1;")

var mysql = new QuryMysql('user').select(['A','B']).orderBy(['A']);
test_value_should_be("Select columns order by ?", mysql.toSql, "SELECT A,B FROM user ORDER BY A ASC;");

var mysql = new QuryMysql('user').join('role','user.user_id','=','role.user_id').orderBy(['user.user_id']);
test_value_should_be("JOIN orderBy", mysql.toSql, "SELECT * FROM user JOIN role ON user.user_id = role.user_id ORDER BY user.user_id ASC;");

var mysql = new QuryMysql('user').update({'user.name':"#profile.name"}).join('profile', 'user.user_id', '=', 'profile.user_id')
test_value_should_be("Update add Join", mysql.toSql, "UPDATE user JOIN profile ON user.user_id = profile.user_id SET user.name = profile.name;")


console.log("conclude:",clc.greenBright(true_score) ,"/", clc.redBright(false_score));
console.log("\n",mysql.toSql);
