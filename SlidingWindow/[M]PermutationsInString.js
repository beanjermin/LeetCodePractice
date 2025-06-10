/*
Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.
In other words, return true if one of s1's permutations is the substring of s2.

Example 1:
Input: s1 = "ab", s2 = "eidbaooo"
Output: true
Explanation: s2 contains one permutation of s1 ("ba").

Example 2:
Input: s1 = "ab", s2 = "eidboaoo"
Output: false

Constraints:
1 <= s1.length, s2.length <= 104
s1 and s2 consist of lowercase English letters.
*/

/*
=========================== EXPLANATION ===========================
SLIDING WINDOW TECHNIQUE
In this problem, we need to implement the sliding window method
However, that's easier said than done.
I've been stuck on this bitch all day trying to figure out how to implement it.
I get the diagram and I get what I have to do
but trying to translate it into code broke my brain
Let's take a look

Example:
let s1 = 'adc';
let s2 = 'dcda';

We want to see if any permutation (any mix) of 'adc' can be found in 'dcda'
so what did I do? I created an obj to keep track of s1

s1 = {
  a: 1,
  d: 1,
  c: 1
}
Now we implement the sliding window method on s2

STEP 1: create window
s1 = {
  a: 1,
  d: 1,
  c: 1
}
[d] c d a
  ^
is d in our s1 obj? YES. so decrement d value
------------------------------------
STEP 2: expand window
s1 = {
  a: 1,
  d: 0,
  c: 1
}
[d c] d a
    ^
Is c in our s1 obj? YES so decrement c value
------------------------------------
STEP 3: check and modify
s1 = {
  a: 1,
  d: 0,
  c: 0
}
[d c d] a
      ^
Is d in our s1 obj? YES BUT we don't have anymore d
So! we move the window up
d [c] d a
    ^
AND reset s1 obj
------------------------------------
STEP 4: expand window
s1 = {
  a: 1,
  d: 1,
  c: 1
}
d [c] d a
    ^
Is c in s1? YES so decrement c value
------------------------------------
STEP 5: expand window
s1 = {
  a: 1,
  d: 1,
  c: 0
}
d [c d] a
      ^
is d in s1? YES decrement d
------------------------------------
STEP 6: expand window
s1 = {
  a: 1,
  d: 0,
  c: 0
}
d [c d a]
        ^
is a in s1? YES decrement a
------------------------------------
STEP 7: check
s1 = {
  a: 0,
  d: 0,
  c: 0
}
as you can see above, all letters are accounted for
Therefore, we return true


HONESTLY simple enough. BUT HOW THE FUCK DO YOU IMPLEMENT THIS??
How would you reset s1 like you did above? make a copy?
How do you create the window?

The solution is actually pretty clever
What we want to do is still create that s1 object
but we also want to create an s2 object

let s1 = 'adc';
let s2 = 'dcda';

s1 = {
  a: 1,
  d: 1,
  c: 1
}
s2 = {
  a: 1,
  d: 2,
  c: 1
}

Then we want to iterate over s2 (modifying s2 obj in the process)
WHILE checking to see if the s1 and s2 objects are equal to each other
so for example

STEP 1






*/

// ======================== SOLUTION ========================
// Time Complexity:
// Space Complexity:

var checkInclusion = function (s1, s2) {
  if (s1.length > s2.length) return false;

  // Create frequency map for s1
  let s1Map = {};
  for (let char of s1) {
    s1Map[char] = (s1Map[char] || 0) + 1;
  }

  let windowMap = {};
  let start = 0;

  // Sliding window over s2
  for (let end = 0; end < s2.length; end++) {
    let charEnd = s2[end];
    windowMap[charEnd] = (windowMap[charEnd] || 0) + 1;

    // If the window size exceeds s1's length, shrink the window from the start
    if (end - start + 1 > s1.length) {
      let charStart = s2[start];
      windowMap[charStart]--;
      if (windowMap[charStart] === 0) delete windowMap[charStart];
      start++;
    }

    // Check if the current window matches s1's frequency map
    if (Object.keys(s1Map).every((char) => s1Map[char] === windowMap[char])) {
      return true;
    }
  }

  return false;
};
