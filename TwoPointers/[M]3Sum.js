/*
Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] 
such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
Notice that the solution set must not contain duplicate triplets.

Example 1:
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation: 
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.

Example 2:
Input: nums = [0,1,1]
Output: []
Explanation: The only possible triplet does not sum up to 0.

Example 3:
Input: nums = [0,0,0]
Output: [[0,0,0]]
Explanation: The only possible triplet sums up to 0.
 
Constraints:
3 <= nums.length <= 3000
-105 <= nums[i] <= 105
*/

/* 
=========================== EXPLANATION ===========================
======================== 2 POINTER METHOD ========================
Regular 2 pointer method: start from beginning and end
**if LESS or EQUAL than target move i to the right
**if GREATER than target move j to the left

Example: [1, 2, 3, 4, 5] target = 8
     i           j
    [1, 2, 3, 4, 5]
     ^           ^
    1 + 5 = 6
    6 < 8 (target) 6 is less than target so move start up one
    ---------------------------------------------------------------
    [1, 2, 3, 4, 5]
        ^        ^
    2 + 5 = 7
    LESS. move that shit up
    ---------------------------------------------------------------
    [1, 2, 3, 4, 5]
           ^     ^
    3 + 5 = 8 BOOM 
    EQUAL. answer(s) is 3 & 5
    move that shiet up again
    ---------------------------------------------------------------
    [1, 2, 3, 4, 5]
              ^  ^
    4 + 5 = 9
    GREATER than target and cant move anymore

    SO ANSWER: 3 & 5

======================== 3 SUM METHOD ========================
Now that we understand the two pointer method, how do we upgrade to 3?
Gotta have 3 markers T^T
Similar concept. one in front, one in back, BUT NOW one in the middle too
Keep in mind some constraints in this problem:
no duplicate triplets(indices)
target = 0

Example: [1, 2, 3, 4, 5, 6, 7] target = 0

      i   j            k
    [-4, -1, -1, 0, 1, 2]
      ^   ^            ^
    -4 - 1 + 2 = -3
    LESS than target, so move j up one

      i       j        k
    [-4, -1, -1, 0, 1, 2]
      ^       ^        ^
    -4 - 1 + 2 = -3
    LESS than target, so move j up one

      i          j     k
    [-4, -1, -1, 0, 1, 2]
      ^          ^     ^
    -4 + 0 + 2 = -2
    LESS than target, so move j up one

      i             j  k
    [-4, -1, -1, 0, 1, 2]
      ^             ^  ^
    -4 + 1 + 2 = -1
    LESS than target and can't go any further. move i up one

          i   j        k
    [-4, -1, -1, 0, 1, 2]
          ^   ^        ^
    -1 - 1 + 2 = 0
    EQUAL to target!
    ANSWER(S) [-1, -1, 2]
    now try moving j up one

          i      j     k
    [-4, -1, -1, 0, 1, 2]
          ^      ^     ^
    -1 + 0 + 2 = 1
    GREATER than target which means
    we try to decrease k by one

          i      j  k
    [-4, -1, -1, 0, 1, 2]
          ^      ^  ^
    -1 + 0 + 1 = 0;
    EQUAL to target!
    ANSWER(S) [-1, 0, 1]
    notice j and k can't move anywhere so we try to move i

              i  j  k
    [-4, -1, -1, 0, 1, 2]
              ^  ^  ^
    -1 + 0 + 1 = 0;
    BUT uh oh we've already accounted for -1
    remember we're trying to avoid duplicates. so we would skip -1
    and i would move over to the next number

                 i  j  k
    [-4, -1, -1, 0, 1, 2]
                 ^  ^  ^
    0 + 1 + 2 = 3
    GREATER and nowhere else to go so the answers are

    [-1, -1, 2] & [-1, 0, 1]
    
    THAT'S BASICALLY 3SUMS STRAT

 */

// ======================== SOLUTION 1 ========================
// Time Complexity: sort O(nlog(n)) + nested loop O(n^2) = O(n^2)
// Space Complexity: O(1) only holding result array

var threeSum = function (nums) {
    let results = []; // results hold array
    
    // Constraint: nums array should have at least 3 numbers
    if (nums.length < 3) return results;
    
    // sort the nums array so we can implement the pointer method
    nums.sort((a, b) => a - b);

    // Iterate over the nums array
    // Note: nums.length - 2 because j and k covers the last two numbers
    // in other words, i never gets to the last two numbers
    // worst case scenario, it looks like this:
    //                       i  j  k
    //          [-4, -1, -1, 0, 1, 2]
    //                       ^  ^  ^
    for (let i = 0; i < nums.length - 2; i++) {
        // Check for duplicates
        // i cannot be a positive number bc we're looking for sum of 0 
        // AND
        // if current number was already accounted for previously, continue
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        let j = i + 1; // define j (always starts one after i)
        let k = nums.length - 1; // define k (always starts at the end)

        // while loop effectively covers elements between j and k
        // while j is less than k
        while (j < k) {
            let sum = nums[i] + nums[j] + nums[k]; // sum of the 3 current numbers

            // If the sum equals our target
            if (sum === 0) {
                results.push([nums[i], nums[j], nums[k]]); // push that b into the result hold array

                // just as we're checking for dups with i, we need to do the same for j and k
                while (nums[j] === nums[j + 1]) j++; // if current j and j+1 are the same, move j UP
                while (nums[k] === nums[k - 1]) k--; // if current k and k-1 are the same, move k BACK
                
                // in case of no duplicates
                j++; // still need to increment j
                k--; // still need to increment k

              // if sum is less than 0, we need to move j up to increase the sum
            } else if (sum < 0) {
                j++;

              // else if sum is greater, decrement k to decrease the sum
            } else {
                k--;
            }
        }
    }
    return results; // return the results
};
