/*
You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.
Return the length of the longest substring containing the same letter you can get after performing the above operations.

Example 1:
Input: s = "ABAB", k = 2
Output: 4
Explanation: Replace the two 'A's with two 'B's or vice versa.

Example 2:
Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.
There may exists other ways to achieve this answer too.

Constraints:
1 <= s.length <= 105
s consists of only uppercase English letters.
0 <= k <= s.length
*/

// =========================== EXPLANATION ===========================
// First, what is the sliding window technique?
// It's basically a technique where you check various conditions
// on a certain "window" of elements at a time
/*
say you're given a string
We're checking for the longest repeated substring in a given string

Example: "AABABBA" k = 1

1. Create the window
  [A] A B A B B A
  our first letter is "A"

2. Check, expand and record length
  [A A] B A B B A
  A & A are dupes. repeated so move on

3. Check, expand and record length
  [A A B] A B B A
  here we have a discrepancy "B"
  so replace B for A
  remember k = 1 so we can only change 1 letter at a time

4. Check, expand and record length
  [A A A* A] B B A
  repeated so move on
  longest substring so far = 4**

5. Check, expand, record length, and modify window
  [A A A* A B] B A
  here we have our next discrepancy "B"
  we can't change any more letters bc k = 1
  and we already changed a letter
  so what do we do now?
  we move the start of the window up

6. Check and modify window
  A [A B A B] B A
  notice that the size of the window stays the same
  this is an invalid scenario bc k = 1
  and you would have to change both "B"s or "A"s
  Create a condition that checks for this
  So if invalid, move the window up again

7. Check, expand, record
  A A [B A B] B A
  with k = 1, we would have to change A to B
  which give sus BBB
  This is valid so expand the window

8. Check, expand, record, modify
  A A [B A B B] A
  valid substring
  record length (4) still the longest
  expand

9. Check, modify
  A A [B A B B A]
  invalid. move window up

10. Check, modify
  A A B [A B B A]

11. Check
  A A B A [B B A]
  valid but no where for window left to expand
  length is 3 but longest is 4

  SO THE ANSWER IS 4
*/

// ======================== SOLUTION 1 ========================
// Time Complexity: O(n) for loop
// Space Complexity: O(n) hash obj

var characterReplacement = function (s, k) {
  let longest = 0; // keep track of longest window/substring
  let start = 0; // tracks start of window
  let topFreq = 0; // record of highest repeated letter
  let hash = {}; // hash obj to keep track of letters and freq

  // iterate over input string. end of the window will update as we iterate over string
  for (let end = 0; end < s.length; end++) {
    // if letter doesnt exist in the hash obj, add it
    if (!hash[s[end]]) {
      hash[s[end]] = 0;
    }
    hash[s[end]]++; // increment existing letter count in hash obj

    topFreq = Math.max(topFreq, hash[s[end]]); // CHECK: gives you  most common repeated letter

    // length of the window is end - start + 1 (+1 bc string is 0 indexed)
    // subtracting the length of the window from our topFreq
    // tells us if we have enough "k" to replace the lesser repeated letter
    // for example: "[A A B B] A" k = 1
    // visually you can see that we don't have enough k (need 2) to satisfy our condition
    // length is 4. most common repeated letter count is 2.
    // 4-2 = 2. which is greater than k = 1
    // 2 < 1 SO NOT VALID. what do we do? MOVE THE WINDOW UP
    if (end - start + 1 - topFreq > k) {
      hash[s[start]]--; // decrement the start window count from the hash map bc we're moving the window up
      start++; // increment start. move window up
    }
    longest = Math.max(longest, end - start + 1); // update longest length.
  }
  return longest; // return longest length
};
