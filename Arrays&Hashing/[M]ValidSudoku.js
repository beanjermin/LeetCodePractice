/*
Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
Note:

A Sudoku board (partially filled) could be valid but is not necessarily solvable.
Only the filled cells need to be validated according to the mentioned rules.

Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
Note:

Example 1:
Input: board =
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: true

Example 2:

Input: board =
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: false
Explanation: Same as Example 1, except with the 5 in the top left corner being modified to 8.
Since there are two 8's in the top left 3x3 sub-box, it is invalid.
*/

// ======================== SOLUTION 1 ========================
// Time Complexity: O(n) Linear complexity bc nested loop

/*
CODE PLANNING:
There are three main factors we need to keep track of:
    1. rows
    2. columns
    3. quadrants

Let's take a second to log some key aspects of the problem:
    1. the input board/matrix is 9x9, meaning each row and column is 9 elements long
    2. each quadrant is is a 3x3 box
    3. each row, column and box need to contain the numbers 1-9 UNIQUE

So, we need to figure out a way to keep track of these 3 factors
How do we want to store each value?
How do we want to traverse the board?

We will traverse the board one row at a time from left to right, top to bottom
As we traverse the board, we want to record each number that is contained in each row, column and quadrant
First instinct is to create a nested loop
Then create a way to store each value for each row, column, and quadrant

Maybe we can create an array of sets (use Set objects bc each value must be unique and retreival is constant time) for each factor
Then loop through the board and record each value in its respective set
*/

var isValidSudoku = function (board) {
    let rows = Array.from({ length: 9 }, () => new Set()); // Create an array of Set Objs for each row
    let cols = Array.from({ length: 9 }, () => new Set()); // Create an array of Set Objs for each column
    let boxes = Array.from({ length: 9 }, () => new Set()); // Create an array of Set Objs for each quadrant

    // Iterate through the board by implementing a nested loop
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            // If space is empty, just move on
            if (board[r][c] === ".") {
                continue;
            }

            let value = board[r][c]; // Hold current value on the board
            let boxIndex = Math.floor(r / 3) * 3 + Math.floor(c / 3); // Calculate which quadrant current value is located

            // Check if current value is in each Set
            if (
                rows[r].has(value) || // Checks if current value is in row Set
                cols[c].has(value) || // Checks if current value is in col Set
                boxes[boxIndex].has(value) // Checks if current value is in box Set
            ) {
                return false; // If value already exists, sudoku fails
            }

            rows[r].add(value); // Add current value to row Set
            cols[c].add(value); // Add current value to col Set
            boxes[boxIndex].add(value); // Add current value to box Set
        }
    }
    // If nothing gets flagged,
    return true; // Return true
};
