/*
Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become:

[4,5,6,7,0,1,2] if it was rotated 4 times.
[0,1,2,4,5,6,7] if it was rotated 7 times.

Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].

Given the sorted rotated array nums of unique elements, return the minimum element of this array.
You must write an algorithm that runs in O(log n) time.

Example 1:
Input: nums = [3,4,5,1,2]
Output: 1
Explanation: The original array was [1,2,3,4,5] rotated 3 times.

Example 2:
Input: nums = [4,5,6,7,0,1,2]
Output: 0
Explanation: The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.

Example 3:
Input: nums = [11,13,15,17]
Output: 11
Explanation: The original array was [11,13,15,17] and it was rotated 4 times. 
 
Constraints:
n == nums.length
1 <= n <= 5000
-5000 <= nums[i] <= 5000
All the integers of nums are unique.
nums is sorted and rotated between 1 and n times.
*/

// =========================== EXPLANATION ===========================
/*
So essentially what this question is asking is to find the smallest number in the array.

Things to keep in mind:
    - the original array is SORTED in ascending order
    - they want us to run the fn in O(log n)

In other words, we want to use the binary search algorithm to find the smallest integer
RECAP binary search algo is like looking up a word in a dictionary-
    - find the midpoint in the dictionary
    - determine whether the word is located in the first half or latter half
    - then take the midpoint of whichever half and repeat the steps
*/

// ======================== SOLUTION 1 ========================
// Time Complexity: O(log n) logarithmic time because the search is halved during each iteration in the while loop
// Space Complexity: O(1) constant space bc the space required for the 3 main variables (leftIdx, rightIdx, mid) do not grow with the input size

var findMin = function (nums) {
    let leftIdx = 0; // left index is 0 because the first index in the nums array is 0
    let rightIdx = nums.length - 1; // Right index is nums.length - 1 because the last index is always 1 minus the length of the array

    /*
    WHILE LOOP CONDITIONING EXPLANATION
    Why less than as opposed to less than or equal to?
    
    Example:
    nums = [1, 2, 3, 4]
    
    Step 1: find the midpoint 
        nums.length - 1 = 3
        3/2 = Floor(1.5) ~ 1
        nums[1] = 2

    Step 2: determine if right & left value is bigger or smaller than midpoint

         L  M  R
        [1, 2, 3, 4]
        ^     ^ 
        as shown above, the left value is less than the midpoint

    Step 3: if left value less, set midpoint to right index

         L  R
        [1, 2]

    Step 4: find midpoint
        nums.length - 1 = 1
        1/2 = .5 ~ 0
        nums[0] = 1

         M
         L  R
        [1, 2]

        As you can see in step 3 above, we set the midpoint to the right index
        because the left value was less than the midpoint

        Midpoint and right index is the same here meaning
        the leftIdx and rightIdx become equal THEREFORE
        resulting in the dreaded infinite loop 

        ALL THIS TO justify the while loop condition
    */
    while (leftIdx < rightIdx) {
        let mid = Math.floor((leftIdx + rightIdx) / 2); // Find the midpoint

        // if the value on the RIGHT of the midpoint is SMALLER
        if (nums[rightIdx] < nums[mid]) {
            // move up the start point
            // here we have mid + 1 bc the mid value is already accounted for in the if condition above
            // as a result, we just need to move the start point one after the midpoint
            leftIdx = mid + 1;
        } else {
            rightIdx = mid; // in cases where the LEFT value is SMALLER, set the end point to the mid index
        }
    }

    // simply return the left most value. Note this works because the input array is SORTED
    return nums[leftIdx];
};
