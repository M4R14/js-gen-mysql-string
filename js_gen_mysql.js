'use strict'; 
class QuryMysql{

 constructor(tableNname){
    this._table = tableNname ;
    this._where = [];
    this._delete = false;
 }

 delete(){
     this._delete = true;
     return this;
 }

 update(data = {}){
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if(typeof data[key] == "string")
                data[key] = "'"+ data[key] +"'"; 
        }
    }

    this._updata = data;
    return this;
 }

 insert(data = []){
    for(var index in data){
        if(typeof data[index] == "string")
            data[index] = "'"+ data[index] +"'";
    }
    this._insert_data = data
    return this;
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
    if(this._delete == true){
        var where_str = '';
        var counter = 1;
        for(var index in this._where){
            var condition = this._where[index];
            if(counter == 1){
                where_str = where_str + condition._colum +" "+ condition._operator +" "+ condition._value ;
            }else{
                where_str = where_str + " AND " + condition._colum +" "+ condition._operator +" "+ condition._value ;                
            }
            counter++;
        }

        return "DELETE FROM "+ this._table +" WHERE "+ where_str +";";
    }

    if(this._updata){
        var data_for_update = this._updata;
        var date_string = '';
        var counter = 1;
        for (var key in data_for_update) {
            if (data_for_update.hasOwnProperty(key)) {
                if(counter == Object.keys(data_for_update).length){
                    date_string +=  key +" = "+ data_for_update[key];
                }else{
                    date_string +=  key +" = "+ data_for_update[key] + ", ";
                }
            }
            counter++;
        }

        var where_str = '';
        var counter = 1;
        for(var index in this._where){
            var condition = this._where[index];
            if(counter == 1){
                where_str = where_str + condition._colum +" "+ condition._operator +" "+ condition._value ;
            }else{
                where_str = where_str + " AND " + condition._colum +" "+ condition._operator +" "+ condition._value ;                
            }
            counter++;
        }

        return "UPDATE "+ this._table +" SET "+ date_string +" WHERE "+ where_str +";"
    }

     if(this._insert_data){
        var insert_data = this._insert_data;
        var data = '';
        var counter = 1;
        for (var index in insert_data) {
            if(index == insert_data.length -1){
                data = data + insert_data[index];
            }else{
                data = data + insert_data[index] + ',';
            }
        }
        return "INSERT INTO "+this._table+" VALUES (" + data + ");"
     }

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