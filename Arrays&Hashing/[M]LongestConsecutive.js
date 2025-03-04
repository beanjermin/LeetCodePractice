/*

Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.
You must write an algorithm that runs in O(n) time.

 
Example 1:
Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.

Example 2:
Input: nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9

Example 3:
Input: nums = [1,0,1,2]
Output: 3

Constraints:
0 <= nums.length <= 105
-109 <= nums[i] <= 109

*/

// ======================== SOLUTION 1 ========================
// Time Complexity: O(n)

var longestConsecutive = function (nums) {
    // Create a new set obj to get a unique set of nums
    // Then sort from low to high
    const sorted = [...new Set(nums)].sort((a, b) => a - b);

    // Create two flag variables
    let longest = 0; // Keeps track of longest consecutive group
    let count = 1; // Keeps track of current consecutive length

    // Iterate over the sorted array
    for (let i = 0; i < sorted.length; i++) {
        let next = sorted[i + 1];
        let current = sorted[i];

        // If consecutive, increase count
        if (next - current === 1) {
            count++;
        } else if (next - current !== 1) {
            // Update longest variable if count is bigger than current longest count
            if (count > longest) {
                longest = count;
            }
            count = 1; // If not consecutive reset count
        }
    }
    // Return longest count
    return longest;
};

// ======================== SOLUTION 2 ========================
// Time Complexity: O(n)

var longestConsecutive = function (nums) {
    const uniqueNums = new Set(nums);
    let longest = 0;

    for (const num of uniqueNums) {
        if (!uniqueNums.has(num - 1)) {
            // num is a starting number
            let length = 1; // Count num itself
            let prevNum = num;

            while (uniqueNums.has(prevNum + 1)) {
                prevNum += 1;
                length += 1;
            }

            longest = Math.max(longest, length);
        }
    }

    return longest;
};
