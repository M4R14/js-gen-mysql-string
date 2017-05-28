## Example
strart
```js
var {QuryMysql} = require('./js_gen_mysql');
```

SELECT
```js
var str = select(['username','password']).orderBy(['datetime']).where('id','=',8011);
// SELECT username,password FROM user WHERE id = 8011 ORDER BY datetime ASC;
```

INSERT
```js
var mysql = new QuryMysql('table_name').insert(['value1', 'value2', 'value3']);
// INSERT INTO table_name VALUES ('value1','value2','value3');
```

UPDATE
```js
var mysql = new QuryMysql('users').update({username:'mark', password:'000000'}).where('user_id','=',100);
// UPDATE users SET username = 'mark', password = '000000' WHERE user_id = 100;
```

DELETE
```js
var mysql = new QuryMysql('users').where('user_id','=',100).delete();
// DELETE FROM users WHERE user_id = 100;
```

## todo
- [x] SELECT
- [ ] SELECT && LIMIT
- [x] SELECT && WHRER
- [x] SELECT && WHRER IN
- [x] SELECT && WHRER Not
- [x] SELECT && WHRER Null
- [x] SELECT && ORDER BY
- [x] SELECT && JOIN
- [ ] SELECT HAVING
- [ ] LEFT JOIN
- [ ] RIGHT JOIN
- [ ] BETWEEN
- [ ] FULL OUTER JOIN
- [ ] GROUP BY
- [ ] GROUP BY column_name(s)
- [x] INSERT by Json
- [x] DELETE
- [x] DELETE && WHERE
- [ ] DELETE && JOIN
- [x] UPDATE
- [x] UPDATE && WHERE 
- [x] UPDATE && JOIN
