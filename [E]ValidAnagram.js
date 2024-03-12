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
var isAnagram = function(s, t) {
    if (s.length != t.length) {
        return false
    };

    let charArray = Array(26).fill(0)

    for (let i = 0; i < s.length; i++) {
        charArray[s.charCodeAt(i) - 'a'.charCodeAt(0)]++
        charArray[t.charCodeAt(i) - 'a'.charCodeAt(0)]--
    };

    return charArray.every(count => count == 0);
  };