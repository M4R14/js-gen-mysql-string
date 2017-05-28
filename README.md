## Example
```
var {QuryMysql} = require('./js_gen_mysql');

var str = new QuryMysql('user');
str.select(['username','password']).orderBy(['datetime']).where('id','=',8011);
// SELECT username,password FROM user WHERE id = 8011 ORDER BY datetime ASC;
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
