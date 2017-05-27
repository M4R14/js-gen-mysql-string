'use strict'; 
class QuryMysql{

 constructor(tableNname){
    this._table = tableNname ;
    this._where = [];
 }

 /**
 * @param {array} columns The array
 */
 select(columns = []){
    this._columns = columns;
    return this;
 }

 /**
 * @param {string} columns The string
 * @param {string} operator =, <, >, Like
 * @param {string or number} value
 */
 where(colum, operator, value){
    if(typeof value == "string")
        value = "'"+ value +"'";

    this._where.push({_colum:colum, _operator:operator, _value:value});
    return this;
 }

 /**
 * @param {list} columns ['user_id','username',['pass']]
 * @param {string} type ASC or DESC
 */
 orderBy(columns = [], type){
    if(!type)
        type = 'ASC';
        
    this._orderBy = {
        _columns:columns,
        _type:type
    }
    return this;
 }

 get toSql(){
     if(this._columns && this._where.length > 0 && this._orderBy){
        var select_colum = '';
         var counter = 1;
         for(var index in this._columns){
             if(counter == this._columns.length){
                 select_colum = select_colum + this._columns[index];
             }else{
                select_colum = select_colum + this._columns[index] + ",";
             }
             counter++;
         }

        var where_str = '';
        var counter = 1;
        for(var index in this._where){
            var condition = this._where[index];
            if(counter == 1){
                where_str = where_str + "WHERE " + condition._colum +" "+ condition._operator +" "+ condition._value ;
            }else{
                where_str = where_str + " AND " + condition._colum +" "+ condition._operator +" "+ condition._value ;                
            }
            counter++;
        }

         var columns = this._orderBy._columns;
         
         var orderBy_columns = '';
         var counter = 1;

         for (var index in columns) {
             if(counter == columns.length){
                orderBy_columns = orderBy_columns + columns[index];
             }else{
                orderBy_columns = orderBy_columns + columns[index] +",";                
             }
         }

        return "SELECT "+ select_colum +" FROM "+ this._table +" "+ where_str +" ORDER BY "+ orderBy_columns +" "+ this._orderBy._type +";";          
     }

     if(this._columns && this._where.length > 0){
         var select_colum = '';
         var counter = 1;
         for(var index in this._columns){
             if(counter == this._columns.length){
                 select_colum = select_colum + this._columns[index];
             }else{
                select_colum = select_colum + this._columns[index] + ",";
             }
             counter++;
         }

        var where_str = '';
        var counter = 1;
        for(var index in this._where){
            var condition = this._where[index];
            if(counter == 1){
                where_str = where_str + "WHERE " + condition._colum +" "+ condition._operator +" "+ condition._value ;
            }else{
                where_str = where_str + " AND " + condition._colum +" "+ condition._operator +" "+ condition._value ;                
            }
            counter++;
        }
        
        return "SELECT "+ select_colum +" FROM "+ this._table +" "+ where_str + ";";
     }

     if(this._columns){
         var select_colum = '';
         var counter = 1;
         for(var index in this._columns){
             if(counter == this._columns.length){
                 select_colum = select_colum + this._columns[index];
             }else{
                select_colum = select_colum + this._columns[index] + ",";
             }
             counter++;
         }
         return "SELECT "+ select_colum +" FROM "+ this._table +";";
     }

     if(this._where.length > 0){
        var where_str = '';
        var counter = 1;
        for(var index in this._where){
            var condition = this._where[index];
            if(counter == 1){
                where_str = where_str + "WHERE " + condition._colum +" "+ condition._operator +" "+ condition._value ;
            }else{
                where_str = where_str + " AND " + condition._colum +" "+ condition._operator +" "+ condition._value ;                
            }
            counter++;
        }

        return "SELECT * FROM "+ this._table +" "+ where_str +";";
     }

     if(this._orderBy){
         var columns = this._orderBy._columns;
         
         var colum_str = '';
         var counter = 1;

         for (var index in columns) {
             if(counter == columns.length){
                colum_str = colum_str + columns[index];
             }else{
                colum_str = colum_str + columns[index] +",";                
             }
         }
        return "SELECT * FROM "+ this._table +" ORDER BY "+ colum_str +" "+ this._orderBy._type +";"; 
     }

     return "SELECT * FROM "+ this._table +";";
 }
}
exports.QuryMysql = QuryMysql;