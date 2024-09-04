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
// Edge Cases: empty array?

// Problem Analysis:
	// They specifically ask for O(log n) which means the search must become exponentially faster as it progresses.
    // How exactly do we do this?
    // Think about how a dictionary is organized.
        // When looking for the word 'monster', you don't start from the beginning and go one by one
        // You start in the middle where all the 'm' letter words are and work from there
        // SAME CONCEPT HERE
    // What do we know about the given array of integers? ===> they are sorted in ASCENDING ORDER (kinda like how dictionary letters are organized)
// Planning:
    // The idea here is to treat the array of integers like a dictionary
    // Find the middle, check to see if the target integer is > or < the middle
    // If target is less than middle, the entire upper half can be eliminated, and vise versa
    // Then repeat this process until you find/don't find the target


// ======================== SOLUTION 1 ========================
// Time Complexity must be O(LOG N)
var search = function(nums, target) {
    let leftIndex = 0; // Left index is 0 because the first index in the nums array is 0
    let rightIndex = nums.length - 1; // Right index is nums.length - 1 because the last index is always 1 minus the length of the array

    // My first thought was recursion? bc there is a repeated process (finding the middle, eliminating chunk)
    // However, we don't need to recurse here. I forgot about While loops. no need to complicate things
    // So the plan here is to create a while loop that repeats my desired process until a certain condition is met
    // How do we determine this condition? Well we only have a fixed amount of elements in the given array
    // The process can and should only go on if there are elements left in the array so in other words
    // As long as the leftIndex is smaller or equal to (only 1 element in the array) the rightIndex, continue the while loop
    while (leftIndex <= rightIndex) {
        // Now we want to find the midpoint of the array
        // How do we do this?
        // My initial instinct was just Total / 2 right?
        // But we need to keep in mind that nums could either be odd or even
        // Things are pretty and work out when nums is odd, but when it's even, we get a decimal
        // Therefore, we need to use either Math.floor or Math.ceil. You can use either one.
            // Just be aware of what exactly is going on when you choose floor or ceil. 
            // We'll go with floor this time
            // So for example [1, 2, 3, 4]
            // floor / 2 will return index 1 (which is integer 2) here, while if you went with ceil / 2, it would return index 2 (int 3)
        const midIndex = Math.floor((leftIndex + rightIndex) / 2);
        // Now what? We want to check for 3 things:
            // 1. whether the given target is === to nums[midIndex] (in which case yay)
            // 2. whether the given target is < the nums[midIndex]
            // 3. whether the given target is  > the nums[midIndex]
        // If 1. target === nums[midIndex], we can just return the midIndex. easy peasy
        // If 2. target < nums[midIndex], that means the target might be in the LOWER half
            // Soooo we need to eliminate the entire upper half
            // We can do this by reassigning our rightIndex to our midIndex. 
            // As a result, now we are only looking at elements from the first chunk (index 0 to middle index)
        // If 3. target > nums[midIndex], that means the target might be in the UPPER half
            // Soo in order to eliminate the lower half, reassign leftIndex to the midIndex
        //THEN REPEAT THE STEPS. THE BEAUTY OF THE WHILE LOOP IS THAT IT WILL KEEP GOING UNTIL THERE ARE NO MORE ELEMENTS
        if (target === nums[midIndex]) {
            return midIndex;
        } else if (target < nums[midIndex]) {
            rightIndex = midIndex - 1; // Here we set rightIndex = midIndex - 1 because we checked to see whether the target === to the midindex above
            // Therefore, there is no need to set rightIndex to midIndex. We subtract one because we want the lower half so we go left from the midpoint
        } else if (target > nums[midIndex]) {
            leftIndex = midIndex + 1; // Same idea here except we got 1 to the right from the midpoint because we want the upper half
        };
    };

    // Now if none of the conditions within the while loop is met, we can return -1 to indicate that our target is not within the nums array
    return -1; 
};

// ======================== SOLUTION 2 ========================
// Time Complexity must be O(LOG N)
var search = function(nums, target) {
    let lo = 0;
    let hi = nums.length-1;

    while (lo < hi) {
        let mid = lo + Math.floor((hi-lo+1)/2);
        if (target <= nums[mid]) {
            hi = mid - 1
        } else {
            lo = mid;
        };
    };

    return nums[lo] == target ? lo : -1;
};


