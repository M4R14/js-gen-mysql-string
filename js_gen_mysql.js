'use strict'; 
class QuryMysql{

 constructor(tableNname){
    this._table = tableNname ;
    this._where = [];
    this._join  = [];
    this._delete = false;
 }

 join(tableNname, column_left, operator, column_right){
     this._join.push({
             "type": "INNER_JOIN", 
             "table": tableNname,
             "operator": operator,
             "column_left": column_left,
             "column_right": column_right
     });
     return this;
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

    this._where.push({
        _type:"DEFAULT",
        _colum:colum, 
        _operator:operator, 
        _value:value
    });
    return this;
 }

 whereNull(column_name){
    this._where.push({
        _type:"WHERE_NULL",
        _colum:column_name, 
        _operator:"IS", 
        _value:"NULL"
    });
    return this;
 }

 whereNot(column_name, operator,value){
    if(typeof value == "string")
        value = "'"+ value +"'";
    
    this._where.push({
        _type:"WHERE_NOT",
        _unique_operator:"NOT",
        _colum:column_name, 
        _operator: operator,
        _value:value
    });
    return this;
 }

 orWhere(column_name, operator,value){
     if(typeof value == "string")
        value = "'"+ value +"'";
    
    this._where.push({
        _type:"OR_WHERE",
        _unique_operator:"OR",
        _colum:column_name, 
        _operator: operator,
        _value:value
    });
    return this;
 }

 whereIn(column_name, value = []){
    for (var index in value) {
        if(typeof value[index] == "string")
            value[index] = "'"+ value[index] +"'";
    }

    this._where.push({
        _type:"WHERE_IN",
        _colum:column_name, 
        _operator:"IN", 
        _value:value
    });

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

 get select_column_str(){
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
    return select_colum;
 }

 get where_str(){
      var where_str = '';
        var counter = 1;
        for(var index in this._where){
            var condition = this._where[index];
            var AND = " AND ";
            if(counter == 1)
                AND = "";

            switch (condition._type) {
                case "WHERE_IN":
                    where_str = where_str + AND + condition._colum +" "+ condition._operator +" ("+ condition._value +")" ;
                    break;

                case "WHERE_NOT":
                    where_str = where_str + AND + "NOT" + " " + condition._colum +" "+ condition._operator +" "+ condition._value;
                    break;

                case "OR_WHERE":
                    var OR = " OR ";
                    if(counter == 1)
                        OR = "";

                    where_str = where_str + OR + condition._colum +" "+ condition._operator +" "+ condition._value;
                    break;

                default:
                    where_str = where_str + AND + condition._colum +" "+ condition._operator +" "+ condition._value;
                    break;
            }
            counter++;
        }
     return where_str;
 }

 get toSql(){
    if(this._join.length > 0 && this._columns){
        var join_data = this._join;
        var join_str = '';
        var counter = 1;
        for(var index in join_data){
            switch (join_data[index].type) {
                case "INNER_JOIN":
                    join_str += " JOIN "+ join_data[index].table +" ON "+ join_data[index].column_left + " " + join_data[index].operator + " " + join_data[index].column_right;  
                    break;
            }
        }
        
        return "SELECT "+ this.select_column_str +" FROM "+ this._table + join_str + ";";
    }

    if(this._join.length > 0){
        var join_data = this._join;
        var join_str = '';
        var counter = 1;
        for(var index in join_data){
            switch (join_data[index].type) {
                case "INNER_JOIN":
                    join_str += " JOIN "+ join_data[index].table +" ON "+ join_data[index].column_left + " " + join_data[index].operator + " " + join_data[index].column_right;  
                    break;
            }
        }
        return "SELECT * FROM "+ this._table + join_str + ";";
    }

    if(this._delete == true){
        return "DELETE FROM "+ this._table +" WHERE "+ this.where_str +";";
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

        return "UPDATE "+ this._table +" SET "+ date_string +" WHERE "+ this.where_str +";"
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

        return "SELECT "+ this.select_column_str +" FROM "+ this._table +" WHERE "+ this.where_str +" ORDER BY "+ orderBy_columns +" "+ this._orderBy._type +";";          
     }

     if(this._columns && this._where.length > 0){
        return "SELECT "+ this.select_column_str +" FROM "+ this._table +" WHERE "+ this.where_str + ";";
     }

     if(this._columns && this._orderBy){
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
        return "SELECT "+ this.select_column_str +" FROM "+ this._table +" ORDER BY "+ colum_str +" "+ this._orderBy._type +";"; 
     }

     if(this._columns){
         return "SELECT "+ this.select_column_str +" FROM "+ this._table +";";
     }

     if(this._where.length > 0){
        return "SELECT * FROM "+ this._table +" WHERE "+ this.where_str +";";
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