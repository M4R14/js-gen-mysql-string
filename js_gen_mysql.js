'use strict'; 
class QuryMysql{

 constructor(tableNname){
    this._table = tableNname ;
    this._where = [];
 }

 select(colums){
    this._colums = colums;
    return this;
 }

 where(colum, operator, value){
    if(typeof value == "string")
        value = "'"+ value +"'";

    this._where.push({_colum:colum, _operator:operator, _value:value});
    return this;
 }

 //clomus is Array, type = ASC|DESC 
 orderBy(colums, type){
    this._orderBy = {
        _colums:colums,
        _type:type
    }
    return this;
 }

 getQuryString(){
     if(this._colums && this._where.length > 0 && this._orderBy){
        var select_colum = '';
         var counter = 1;
         for(var index in this._colums){
             if(counter == this._colums.length){
                 select_colum = select_colum + this._colums[index];
             }else{
                select_colum = select_colum + this._colums[index] + ",";
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

         var colums = this._orderBy._colums;
         
         var orderBy_colums = '';
         var counter = 1;

         for (var index in colums) {
             if(counter == colums.length){
                orderBy_colums = orderBy_colums + colums[index];
             }else{
                orderBy_colums = orderBy_colums + colums[index] +",";                
             }
         }

        return "SELECT "+ select_colum +" FROM "+ this._table +" "+ where_str +" ORDER BY "+ orderBy_colums +" "+ this._orderBy._type +";";          
     }

     if(this._colums && this._where.length > 0){
         var select_colum = '';
         var counter = 1;
         for(var index in this._colums){
             if(counter == this._colums.length){
                 select_colum = select_colum + this._colums[index];
             }else{
                select_colum = select_colum + this._colums[index] + ",";
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

     if(this._colums){
         var select_colum = '';
         var counter = 1;
         for(var index in this._colums){
             if(counter == this._colums.length){
                 select_colum = select_colum + this._colums[index];
             }else{
                select_colum = select_colum + this._colums[index] + ",";
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
         var colums = this._orderBy._colums;
         
         var colum_str = '';
         var counter = 1;

         for (var index in colums) {
             if(counter == colums.length){
                colum_str = colum_str + colums[index];
             }else{
                colum_str = colum_str + colums[index] +",";                
             }
         }
        return "SELECT * FROM "+ this._table +" ORDER BY "+ colum_str +" "+ this._orderBy._type +";"; 
     }

     return "SELECT * FROM "+ this._table +";";
 }
}
exports.QuryMysql = QuryMysql;