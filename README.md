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
- [ ] SELECT && JOIN
- [ ] SELECT HAVING
- [ ] INSERT
- [ ] INSERT by Json
- [ ] DELETE
- [ ] DELETE && WHERE
- [ ] DELETE && JOIN
- [ ] UPDATE
- [ ] UPDATE && WHERE 
- [ ] UPDATE && JOIN
