/**
 * Paginate function
 * 
 * Filters the contents of an array to only show a subset
 * for a single page of results
 * Generally for use with bd-stampy/components/Pagination
 *
 * @param {array} array - the array of items to paginate
 * @param {number} amount - the amount of items to show on a page
 * @param {number} page - the number of the page to show, starting from page 1 (not 0!)
 */

function paginate(array, amount, page) {
    // make sure invalid page values are dealt with as this is often set from a query string
    if(!Number.isInteger(page)) {
        page = 1;
    }

    // calculate the maximum value that start can be: the start index of the final page of results
    var maxStart = Math.floor(array.length / amount) * amount;
    // prevent the start page from being less than 1
    var startPage = Math.max(page, 1);
    // find the start index from the start page
    var start = (startPage - 1) * amount;
    // ensure start isn't greater than maxStart
    start = Math.min(start, maxStart);
    // calcualte the end index
    var end = start + amount;
    // slice the chunk you need from the array and return
    return array.slice(start, end);
}