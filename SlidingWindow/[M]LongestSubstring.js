/*
Given a string s, find the length of the longest substring without duplicate characters.

Example 1:
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.

Example 2:
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.

Example 3:
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

Constraints:
0 <= s.length <= 5 * 104
s consists of English letters, digits, symbols and spaces.
*/

// =========================== EXPLANATION ===========================
// need to iterate over string
// im thinking using an obj as storage to keep track of dupes
// We need to take track of dupes and length
/*
EXAMPLE: "pwwkew"

We could use a set obj to keep track of dupes
set {}
then set a variable to track length
let longest = 0;

first check if each letter is in set object
"pwwkew"
"p"
is "p" in set obj? NO
set {p, }
longest = 1

is "w" in set obj? NO
set {p, w}
longest = 2

is "w" in set obj? YES
we want to DELETE the left
set {_, w}
longest = 2

is "k" in set obj? NO
set {_, w, k,}
longest = 2

is "e" in set obj? NO
set {_, w, k, e}
longest = 3

is "w" in set obj? YES
WE WANT TO DELETE
set {_, _, k, e}
longest = still 3

SO THE STRAT IS 
if in the set, ADD letter then COUNT
if not in set, DELETE letter then check count
*/

// ======================== SOLUTION 1 ========================
// Time Complexity: O(n) bc one while loop
// Space Complexity: O(n) left, right, set, and longest

var lengthOfLongestSubstring = function (s) {
    let longest = 0; // tracks longest substring
    let set = new Set(); // create set obj
    let left = 0; // keeps track of left pointer
    let right = 0; // keeps track of right pointer

    // loop over letters in string
    while (right < s.length) {
        let letter = s[right]; // current letter

        // if the letter is not in our set obj
        if (!set.has(letter)) {
            set.add(letter); // add the letter
            longest = Math.max(longest, set.size); // update longest length
            right++; // increment right (goes to next letter)

            // if the letter IS in our set obj
        } else {
            set.delete(s[left]); // delete the first dupe from the set
            left++; // move the left pointer up to the next letter
        }
    }
    return longest; //return result
};
