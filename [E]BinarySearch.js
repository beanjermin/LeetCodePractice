/*
Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.
You must write an algorithm with O(log n) runtime complexity.

Example 1:
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4

Example 2:
Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Explanation: 2 does not exist in nums so return -1

Constraints:
1 <= nums.length <= 104
-104 < nums[i], target < 104
All the integers in nums are unique.
nums is sorted in ascending order.
*/

// Input: (2) array of integers sorted in ascending order & a target integer
// Output: if true-- index of target integer; if false-- -1
// Constraints: time complexity must be O(log n)
// Edge Cases:
// Problem Analysis:
	//

// ======================== SOLUTION 1 ========================
// Time Complexity must be O(LOG N)
var search = function(nums, target) {
    let lo = 0;
    let hi = nums.length-1;

    while (lo < hi) {
        let mid = lo + Math.floor((hi-lo+1)/2);
        if (target < nums[mid]) {
            hi = mid - 1
        } else {
            lo = mid;
        }
    }

    return nums[lo] == target ? lo : -1;
};

mid= nums.length-1 +
5/2 = 2.5 = 2


[-1,0,3,5,9,12], target = 9
lo = 0
hi = 5
mid = 5/2 = floor 2.5 = 2
index 2 = int 3
3 < 9

lo=3


[-1,0,3,9,12], target = 12
lo = 0
hi = 4
mid = 4/2 = 2 = 2
index 2 = int 3
3 < 12
lo = index 2 + 1 = 3
index 3 = int 9
lo = 3
hi = 4
mid = 7/2 = 3.5 = 3


