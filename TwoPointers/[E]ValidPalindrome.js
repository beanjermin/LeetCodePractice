/*
A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.

Example 1:
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.

Example 2:
Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.

Example 3:
Input: s = " "
Output: true
Explanation: s is an empty string "" after removing non-alphanumeric characters.
Since an empty string reads the same forward and backward, it is a palindrome.

Constraints:
1 <= s.length <= 2 * 105
s consists only of printable ASCII characters.
*/

// ======================== SOLUTION 1 ========================
// Time Complexity: O(n) because replace method and split/reverse are linear

var isPalindrome = function(s) {
    // Replace all non alpha-numeric values with ""
    // Regex "g" = global; "i" = case-insensitive search
    const newString = s.toLowerCase().replace(/[^a-z0-9]/gi, "");

    // Check to see if the new string is = to its reverse
    return newString === newString.split('').reverse().join('');
};

// ======================== SOLUTION 2 ========================
// Time Complexity: O(n) because split/filter and forloop are linear

// Define all possible alpha-numeric options
const alphanumeric = 'abcdefghijklmnopqrstuvwxyz0123456789';

var isPalindrome = function(s) {
    // Change string to lowercase
    // Split string to array
    // Then filter the array for only alphanumeric values
    const filtered = s.toLowerCase().split('').filter(c => alphanumeric.includes(c));

    const len = filtered.length;

    // Iterate over the length of the filtered array
    // Iterate from the front and the back simultaneously
    for (let i = 0, j = len - 1; i < len; i++, j--) {
        // Check to see if front value matches end value
        if (filtered[i] !== filtered[j]) {
            return false;
        };
    };
    // If nothing is flagged, return true
    return true;
};