/*
Given an array of strings strs, group the anagrams together. You can return the answer in any order.

Example 1:
  Input: strs = ["eat","tea","tan","ate","nat","bat"]
  Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
  Explanation:
    There is no string in strs that can be rearranged to form "bat".
    The strings "nat" and "tan" are anagrams as they can be rearranged to form each other.
    The strings "ate", "eat", and "tea" are anagrams as they can be rearranged to form each other.

Example 2:
  Input: strs = [""]
  Output: [[""]]

Example 3:
  Input: strs = ["a"]
  Output: [["a"]]

*/

// ======================== SOLUTION 1 ========================
// Time Complexity: O(n)

/*
Brute force
    I tried to use the same logic from ValidAnagram here to solve this problem
    In fact, I created a whole separate function to check for valid anagrams
    Brute forcing would require nested loops resulting in O(n^2) time complexity
    Was there a way to shorten this?
    Maybe I can shorten the array while matching valid anagrams so time complexity is closer to O(logn)?
The plan:
    1. iterate over input array
    2. find all anagrams in array
    3. push all anagrams into a hold array, then delete these elements from the input array
    4. repeat these steps until done
Problem: edge cases man
    It worked until inputs like ['', '', '']
    empty strings
*/

const checkAnagram = (s, t) => {
    if (s === t) {
        return true;
    }
    let length = s.length !== 0 ? s.length : t.length;
    let charArr = Array(26).fill(0);
    for (let i = 0; i < length; i++) {
        charArr[s.charCodeAt(i) - "a".charCodeAt(0)]++;
        charArr[t.charCodeAt(i) - "a".charCodeAt(0)]--;
    }
    return charArr.every((count) => count === 0);
};

var groupAnagrams = function (strs) {
    let result = [];

    if (strs.length < 2) {
        result.push(strs);
        return result;
    }

    while (strs.length > 0) {
        let bucket = [strs[0]];
        for (let i = 1; i < strs.length; i++) {
            if (checkAnagram(strs[0], strs[i])) {
                bucket.push(strs[i]);
                strs.splice(i, 1);
            }
        }
        strs.shift();
        result.push(bucket);
    }

    return result;
};

// ======================== SOLUTION 2 ========================
// Time Complexity: O(n)

/*
Code Plan:
    1. sort each word in input array (all anagrams should be the same now)
    2. throw them shits into an obj
        key: sorted string
        alue: [actual string, actual string, ...]
    3. return object values
*/

var groupAnagrams = function (strs) {
    let result = {}; // create result obj

    // iterate over input array
    for (let i = 0; i < strs.length; i++) {
        let sorted = strs[i].split("").sort().join(""); // sort through each word in input array
        // if sorted anagram exists,
        if (result[sorted]) {
            result[sorted].push(strs[i]); // push actual word into value array
        } else {
            result[sorted] = [strs[i]]; // otherwise, create key/value pair-- sortedword : [word]
        }
    }

    // return result values (Object.values returns an array of the obj values**)
    return Object.values(result);
};

// ======================== SOLUTION 3 ========================
// Same logic as ans above, but utilizing Map()

var groupAnagrams = function (strs) {
    let result = new Map();

    for (let word of strs) {
        let sorted = word.split("").sort().join("");
        if (result.has(sorted)) {
            result.get(sorted).push(word);
        } else {
            result.set(sorted, [word]);
        }
    }

    return Array.from(result.values());
};
