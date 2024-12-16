/*
Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

Example 1:
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]

Example 2:
Input: nums = [1], k = 1
Output: [1]


Constraints:
1 <= nums.length <= 105
-104 <= nums[i] <= 104
k is in the range [1, the number of unique elements in the array].
It is guaranteed that the answer is unique.

Follow up: Your algorithm's time complexity must be better than O(n log n), where n is the array's size.

*/

// ======================== SOLUTION 1 ========================
// Time Complexity: O(n log n)

var topKFrequent = function (nums, k) {
    let result = []; // Create results array
    let map = new Map(); // Create a new map instance to store unique ints and their frequency

    // Loop over nums array
    // Note: for..of loop for 2 reasons:
    // 1. Only need values; no need for indexes
    // 2. Map instances are iterable
    for (let int of nums) {
        // If int exists in map
        if (map.has(int)) {
            let freq = map.get(int); // get freq count
            map.set(int, freq + 1); // increment freq
        } else {
            map.set(int, 1); // if int not in map, set key-value pair {int: freq}
        }
    }
    // Sort map entries by freq (high to low)
    let sorted = Array.from(map.entries()).sort((a, b) => b[1] - a[1]);

    // Push k # of ints into the result array
    for (let i = 0; i < k; i++) {
        result.push(sorted[i][0]);
    }

    // Return result
    return result;
};

// ======================== SOLUTION 1 Refactored ========================
// Time Complexity: O(n log n)

var topKFrequent = function (nums, k) {
    let result = [];
    let map = new Map();

    for (let int of nums) {
        // If int exists in map
        if (map.has(int)) {
            let freq = map.get(int); // get freq count
            map.set(int, freq + 1); // increment freq
        } else {
            map.set(int, 1); // if int not in map, set key-value pair {int: freq}
        }
    }

    // const bc int doesn't change
    for (const int of nums) {
        // set map key to int
        // set map value: if exists add 1 to value, if it doesnt exist set to 0 and add 1
        map.set(int, (map.get(int) || 0) + 1);
    }

    let sorted = Array.from(map.entries()).sort((a, b) => b[1] - a[1]);

    for (let i = 0; i < k; i++) {
        result.push(sorted[i][0]);
    }

    return result;
};
