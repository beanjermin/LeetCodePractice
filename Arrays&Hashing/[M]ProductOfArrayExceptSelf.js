/*
Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].
The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
You must write an algorithm that runs in O(n) time and without using the division operation.

Example 1:
Input: nums = [1,2,3,4]
Output: [24,12,8,6]

Example 2:
Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]

Constraints:
2 <= nums.length <= 105
-30 <= nums[i] <= 30
The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

Follow up: Can you solve the problem in O(1) extra space complexity? (The output array does not count as extra space for space complexity analysis.)

*/

// ======================== SOLUTION with division ========================
var productExceptSelf = function (nums) {
    let answer = [];
    let sumOfProds = 1;
    let zeroCount = 0;

    nums.forEach((int) => {
        if (int === 0) {
            zeroCount++;
        } else {
            sumOfProds *= int;
        }
    });

    if (zeroCount > 1) {
        return new Array(nums.length).fill(0);
    }

    for (let i = 0; i < nums.length; i++) {
        if (zeroCount === 1) {
            answer.push(nums[i] === 0 ? sumOfProds : 0);
        } else {
            answer.push(sumOfProds / nums[i]);
        }
    }
    return answer;
};

// ======================== SOLUTION 1 ========================
// Time Complexity: O(n)
var productExceptSelf = function (nums) {
    let answer = [];

    // Find prefix product
    for (let i = 0; i < nums.length; i++) {
        if (nums[i - 1] === undefined) {
            answer[i] = nums[i];
        } else {
            answer[i] = answer[i - 1] * nums[i];
        }
    }

    // Set post
    let post = 1;

    // Update prefix product
    for (let i = nums.length - 1; i >= 0; i--) {
        if (nums[i + 1] === undefined) {
            answer[i] = answer[i - 1];
            post = nums[i];
        } else {
            answer[i] =
                (answer[i - 1] === undefined ? 1 : answer[i - 1]) * post;
            post = post * nums[i];
        }
    }
    return answer;
};

// ======================== SOLUTION 2 ========================
// Time Complexity: O(n)
var productExceptSelf = function (nums) {
    let n = nums.length;
    let answer = new Array(n).fill(1);
    let prefix = 1;
    for (let i = 0; i < n; i++) {
        answer[i] *= prefix;
        prefix *= nums[i];
    }
    console.log(answer);

    let suffix = 1;
    for (let i = n - 1; i >= 0; i--) {
        answer[i] *= suffix;
        suffix *= nums[i];
    }
    return answer;
};
