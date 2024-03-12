/*
Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.

Example 1:
Input: nums = [1,2,3,1]
Output: true

Example 2:
Input: nums = [1,2,3,4]
Output: false

Example 3:
Input: nums = [1,1,1,3,3,4,3,2,4,2]
Output: true


Constraints:
1 <= nums.length <= 105
-109 <= nums[i] <= 109
*/

// Time Complexity: O(n)
// Space Complexity: O(n)
// Linear Complexity (directly proportional to input size) because solution needs to go through each item in array one by one.

// ======================== SOLUTION 1 ========================
var containsDuplicate = function(nums) {
    // Create hold object
    let obj = {};

    // Loop through nums array
    for (let i = 0; i < nums.length; i++) {
        // If number in array does not exist in hold array,
        if (obj[nums[i]] === undefined) {
            // Create key-value pair
            obj[nums[i]] = 1;
        } else {
            return true;
        };
    };

    // Return false (default) if loop does not catch a duplicate
    return false;
};

// ======================== SOLUTION 2 ========================
// *** Best Solution ***
var containsDuplicate = function(nums) {
    // Set is an object of unique values meaning a value can only appear once
    // Create object of unique values
    const s = new Set(nums);

    // Check to see if the size of the new object is equal to the length of the array
    return s.size !== nums.length;
};