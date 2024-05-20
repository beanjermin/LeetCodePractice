/*
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
An input string is valid if:
Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Every close bracket has a corresponding open bracket of the same type.

Example 1:
Input: s = "()"
Output: true

Example 2:
Input: s = "()[]{}"
Output: true

Example 3:
Input: s = "(]"
Output: false

Constraints:
1 <= s.length <= 104
s consists of parentheses only '()[]{}'.
*/

// ======================== SOLUTION 1 ========================
// Time Complexity: O(n) Linear because only one iteration

// Problem Analysis:
    // Each valid set of parenthesis has a start and end pair
    // In other words, an open parenthesis must come first, if at all, then must close
    // Note: problem does not state that you must close the parenthesis immediately after opening
    // However, problem does say that the parenthesis need to be closed IN CORRECT ORDER
    // Things I can't do:
        // 1. start with an end bracket-- ')', ']', '}'
        // 2. end with a start bracket-- '(', '[', '{'
    // I need a way to track that when a bracket is open, it is properly closed
    // How do I want to do this? What are some ways this can be acheived?
    // First Impressions:
        // Objects: store the 3 set of parenthesis in an object as key-value pairs
            // use obj to check/keep track of legitimate pairs
        // Array: push and pop start/end brackets to keep track of pairs
            // if array is empty, it means all sets of parenthesis were properly paired
// Plan:
    // Create object of parenthesis pairs
    // Create hold array
    // Iterate over input array
    // Check for open bracket: if open bracket, push into hold array
    // Check for close bracket: check if corresponding open bracket is in hold array

var isValid = function(s) {
    // create parenthesis obj to hold valid sets
    let parenPairs = {
        '(' : ')',
        '[' : ']',
        '{' : '}'
    };

    // create a hold array to keep track of the type of open brackets and the order in which they need to be closed
    // hold array = stack because of order-- first one in, last one out. first open bracket will be last one closed
    let stack = [];

    // iterate over the input array s
    for (let i = 0; i < s.length; i++) {
        let currentParen = s[i];

        // if the current parenthesis is an OPEN bracket that is defined in our parenPairs obj
        if (parenPairs[currentParen]) {
            // push the open bracket into the hold array
            stack.push(currentParen);

            // if it's a CLOSED bracket, pop the most recent open parenthesis in the hold array
                // Why? order-- most recent open paren should be the first to close
            // if there is a valid key-value pair in our obj based on the current closed bracket, move on
        } else if (parenPairs[stack.pop()] !== currentParen) {
            // if the open bracket does not match with the closed bracket, return false.
            // WHY?
                // because if the test fails, it either means the order in which the brackets are closed is wrong-- ex: '[{]}'
                // OR the bracket sets themeselves are not valid-- ex: '{]'
            return false;
        };
    };

    // after iteration, check to see if hold array is empty
    // if it's empty, then all the brackets were properly paired
    // if the length of the hold array is defined, then something went wrong
    return !stack.length;
};

// ======================== SOLUTION 2 ========================
// Time Complexity: O(n) Linear because only one iteration

var isValid = function(s) {
  let stack = [];

  for (let i = 0; i < s.length; i++) {
      if (s[i] == '(') {
          stack.push(')');
      } else if (s[i] == '[') {
          stack.push(']');
      } else if (s[i] == '{') {
          stack.push('}');
      } else if (stack.pop() !== s[i]) {
          return false;
      };
  };
  return !stack.length;
};