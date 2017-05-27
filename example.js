var {QuryMysql} = require('./js_gen_mysql');

var str = new QuryMysql('user');
str.select(['username','password']).orderBy(['datetime']).where('id','=','8011');

console.log(str.toSql);
