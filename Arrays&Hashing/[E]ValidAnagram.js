/*
Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

Example 1:
Input: s = "anagram", t = "nagaram"
Output: true

Example 2:
Input: s = "rat", t = "car"
Output: false


Constraints:
1 <= s.length, t.length <= 5 * 104
s and t consist of lowercase English letters.

*/

// Time Complexity: O(n)
// Space Complexity: O(n)
// Linear Complexity (directly proportional to input size) because solution needs to go through each item in array one by one.

// ======================== SOLUTION 1 ========================
var isAnagram = function(s, t) {
    if (s.length !== t.length) {
        return false;
    };

    const sArr = s.split('').sort().join('');
    const tArr = t.split('').sort().join('');

    return sArr === tArr;
};

// ======================== SOLUTION 2 ========================
// *** Best Solution ***

// Code Plan:
    // 1. Create array of 0s representing each letter in the alphabet
    // 2. Iterate through each input string
    // 3. Find letter place in array from first input string and INCREMENT by 1
    // 4. Find letter place in array from second input string and DECREMENT by 1
    // All elements in hold array should be === 0

    // s = 'brain'
    // t = 'rainb'

    // [0, 0, 0, 0, 0 .....]

    // 'b' ==> [0, 1, 0, 0, 0, 0, ...] s string
    // 't' ==> [0, 1, 0, 0, 0, -1, ...] t string

    // 'r' in s string
    // 'r' in t string should cancel out

var isAnagram = function(s, t) {
    // Edge case: if length not the same, not anagram
    if (s.length != t.length) {
        return false
    };

    // Create an array filled with '0' (each place representing a letter in the alphabet)
    let charArray = Array(26).fill(0)

    // Iterate over length of string
    for (let i = 0; i < s.length; i++) {
        // Find letter place in array from s string and increment by 1
        charArray[s.charCodeAt(i) - 'a'.charCodeAt(0)]++
        // Find letter place in array from t string and decrement by 1
        charArray[t.charCodeAt(i) - 'a'.charCodeAt(0)]--
    };
    // If both strings are an anagram, incrementing and decrementing should set each element in the array back to 0

    // Iterate over the hold array to check that each element === 0
    return charArray.every(count => count == 0);
  };