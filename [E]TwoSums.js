/*
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:
Input: nums = [3,3], target = 6
Output: [0,1]

Constraints:
2 <= nums.length <= 104
-109 <= nums[i] <= 109
-109 <= target <= 109
Only one valid answer exists.

Follow-up: Can you come up with an algorithm that is less than O(n2) time complexity?
*/

// ======================== SOLUTION 1 ========================
// Time Complexity: O(n^2) because nested loop

var twoSum = function(nums, target) {
    // iterate over the nums array
    for (var i = 0; i < nums.length; i++) {
        // create nested loop
        for (var j = i + 1; j < nums.length; j++) {
        // check if num[i] + num[j] = target
            if (nums[i] + nums[j] === target) {
                return [i, j];
            };
        };
    };
    return undefined;
};

// ======================== SOLUTION 2 ========================
// Time Complexity: O(n) because one loop

var twoSum = function(nums, target) {
    // Create hold obj
    const pairIdx = {};

    // Iterate over nums array
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];

        // (Target number - current number) <<< faster way to find the number that you need
        // If target number - current number is found in hold obj
        if (target - num in pairIdx) {
            // Return index of found integer in obj
            return [i, pairIdx[target - num]];
        };
        // Create num/index pair
        pairIdx[num] = i;
    };
 };

// ======================== SOLUTION 3 ========================
// *** Best Solution ***
// Time Complexity: O(n) because one loop

var twoSum = function(nums, target) {
    // Create hold obj
    let store = {};

    // Iterate over nums array
    for (let i = 0; i < nums.length; i++) {
        // The plan is to save the desired number and it's corresponding index
        // by subtracting the current value by the target value.

        // If the value, index pair exists, then return the index of stored value and the current index
        if (store[nums[i]] !== undefined:wq) return [store[nums[i]], i];

        // If value/index pair doesn't exist, store the 'desired' value/index in the hold obj
        store[target - nums[i]] = i;
    };
};