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
  // body...
}
/////////////////////////////
function reverse (string) {
  return string.split(' ').reverse().join(' ');
}
/////////////////////////////
// reverse('hi') === 'hi'
// reverse('') === ''
// reverse('a b c') === 'c b a'
// reverse('123') === '123'
// reverse('what is love') === 'love is what'
// reverse('aweg.ge. rgek gre') === 'gre rgek aweg.ge.'
/////////////////////////////

/////////////////////////////
// Is Fibo
/////////////////////////////
/**
 * You are given an integer, n. Find out if the number is an element of fibonacci series.
 *
 * The first few elements of fibonacci series are 0,1,1,2,3,5,8,13....
 * A fibonacci series is one where every element is a sum of the previous two elements in the series.
 * The first two elements are 0 and 1.
 */
function isFibo (n) {
  // body...
}
/////////////////////////////
// A utility function that returns true if x is perfect square
function isPerfectSquare (x) {
  var s = Math.floor(Math.sqrt(x));
  return (s * s === x);
}
// Returns true if n is a Fibinacci Number, else false
function isFibo (n) {
  // n is Fibinacci if one of 5*n*n + 4 or 5*n*n - 4 or both
  // is a perferct square
  return isPerfectSquare(5*n*n + 4) || isPerfectSquare(5*n*n - 4);
}
/////////////////////////////
// isFibo(0) === true
// isFibo(1) === true
// isFibo(2) === true
// isFibo(3) === true
// isFibo(4) === false
// isFibo(5) === true
// isFibo(6) === false
// isFibo(7) === false
// isFibo(8) === true
// isFibo(9) === false
// isFibo(89) === true
// isFibo(90) === true
/////////////////////////////