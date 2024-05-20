/*
You are given an array prices where prices[i] is the price of a given stock on the ith day.
You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

Example 1:
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.

Example 2:
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.

Constraints:
1 <= prices.length <= 105
0 <= prices[i] <= 104
*/

// ======================== SOLUTION 1 ========================
// Time Complexity: O(n) Linear because only one iteration

// Problem Analysis:
    // Two things we're trying to determine: when to buy and when to sell
    // We want to maximize profit, but profits can only be made in buy/sell order
    // We want to buy at the lowest possible price, and sell at the highest possible price
// Planning:
    // The idea is to iterate over the array while keeping track of the max profits.
    // Create a buy variable. This is a placeholder variable that will represent the lowest possible price.
    // Create a profit variable to keep track of max profits

    var maxProfit = function(prices) {
        // set buy variable to the first number by default
        let buy = prices[0];
        // create profit var
        let profit = 0;

        // iterate over the input arr (note: i starts at 1 because we accounted for the first number in the buy var)
        for (let i = 1; i < prices.length; i++) {
            // we're looking for the lowest possible price to buy. if buy value is greater than the current price, we want to replace the buy var with the lower number
            if (buy > prices[i]) {
                buy = prices[i];
            // if however, the current price is greater than the current buy variable (which satisfies the buy/sell order for profit [sell day comes after buy day]), we want to keep track of the profit
            } else {
                // Math.max will take multiple parameters and output the biggest number. Here we are comparing the new potential profit with the existing profit. This way, we can save the max profit amount
                profit = Math.max(prices[i] - buy, profit);
            };
        };
        // then, simply return the max profit amount
        return profit;
    };