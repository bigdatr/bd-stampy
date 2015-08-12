/*eslint-disable */
var Paginate = function (array, ammount, page){
    var start = page * ammount;
    var end = start + ammount;

    if(start >= array.length) {
        start = array.length - ammount; 
    }

    return array.slice(start, end);
};

module.exports = Paginate;