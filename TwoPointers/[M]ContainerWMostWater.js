/*
You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).
Find two lines that together with the x-axis form a container, such that the container contains the most water.
Return the maximum amount of water a container can store.
Notice that you may not slant the container.

Example 1:
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.

Example 2:
Input: height = [1,1]
Output: 1

Constraints:
n == height.length
2 <= n <= 105
0 <= height[i] <= 104
*/

// =========================== EXPLANATION ===========================
// Another two pointer question
// We need to find the greatest area within the given array
// Just as any two pointer question, there will be two points: start and end
// A couple of things to keep in mind: 
    // We must take the shortest height of the two points
    // length is the indices between the two points
// Strategy
// Two points: start and end
// Find the area of the space between the start and the end
// Save that area in a variable
// Whichever point is smaller, increment or decrement
/*
EXAMPLE:

[1, 5, 3, 4]
 ^        ^
start    end

height: 1 < 4 = 4
width: 3 - 0 = 3
area: 4 * 3 = 12
now because 1 is less than 4
we want to increment the start

[1, 5, 3, 4]
    ^     ^
  start  end

height: 5 > 4 = 4
width: 3 - 1 = 2
area: 4 * 2 = 8
now because 4 is less than 5, 
we want to decrement the end

[1, 5, 3, 4]
    ^  ^
 start end

*/

// ======================== SOLUTION 1 ========================
// Time Complexity: O(n) bc only one while loop
// Space Complexity: O(1) only holding result array

var maxArea = function(height) {
    let result = 0; // Result array

    let l = 0; // left variable (start)
    let r = height.length - 1; // right variable (end)

    // while loop all the elements between start and end
    while (l < r) {
        let wall = Math.min(height[r], height[l]); // find the shortest height of the two points
        let area = wall * (r - l); // find the area
        
        // if the new area is greater than the current result, replace it
        if (area > result) {
            result = area;
        }


        // if the start is greater, we need to decrement the end
        if (height[l] >= height[r]) {
            r--;
        } else {
            l++; // and vise versa here
        }
    };

    return result; // simply return the result
};