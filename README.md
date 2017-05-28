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
- [ ] SELECT && WHRER IN
- [ ] SELECT && WHRER Not
- [ ] SELECT && WHRER Null
- [x] SELECT && ORDER BY
- [x] SELECT && JOIN
- [ ] SELECT HAVING
- [ ] INSERT
- [x] INSERT by Json
- [x] DELETE
- [x] DELETE && WHERE
- [ ] DELETE && JOIN
- [x] UPDATE
- [x] UPDATE && WHERE 
- [ ] UPDATE && JOIN
