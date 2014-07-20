/////////////////////////////
// Multiples of 3 or 5 sum
/////////////////////////////
/**
 * If we list all the natural numbers below 10 that are multiples
 * of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
 *
 * Return the sum of all the positive multiples of 3 or 5 below n, where n is given to you
 */

function sum (n) {
 // body...
}
/////////////////////////////
function sum (n) {
  var sum = 0;
  for (var i = 0; i < n; ++i) {
    if (i % 3 === 0 || i % 5 === 0) {
      sum += i;
    }
  }
  return sum;
}
/////////////////////////////
// sum(0) === 0
// sum(10) === 23
// sum(100) === 2318
// sum(1000) === 233168
// sum(1000) === 233168
// sum(3) === 0
// sum(5) === 3
// sum(2456356) === 1407859868250
// sum(123) === 3420
/////////////////////////////

/////////////////////////////
// Reverse words in a string
/////////////////////////////
/**
 * Reverse the words in a string. For example:
 *
 * "I don't like to eat meat" -> "meat eat to like don't I"
 * reverse
 */

function reverse (string) {
  return 'hi';
}
/////////////////////////////
function reverse (argument) {
  // body...
}