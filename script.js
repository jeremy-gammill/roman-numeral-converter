/**
 * Filename: script.js
 * Project: Roman Numeral Converter
 * Live Demo: https://jeremy-gammill.github.io/roman-numeral-converter/
 * 
 * Author: Jeremy Gammill | github.com/jeremy-gammill
 * Date Created: March 31, 2024
 * Last Modified: April 1, 2024
 * License: MIT
 * 
 * Description:
 *   Developed for the freeCodeCamp JavaScript Algorithms and Data Structures certification.
 *  
 *   Key Features:
 *   - Converts numeric input to Roman numerals within the range of 1 to 3999, focusing on common use cases.
 *   - Displays an appropriate feedback message to the user when receiving invalid input.
 *   - Utilizes a recursive function for conversion.
 */

"use strict";

const inputEl = document.getElementById("number");
const outputEl = document.getElementById("output");
const convertBtn = document.getElementById("convert-btn");

convertBtn.addEventListener("click", convertNumberToRomanNumeral);
inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        convertNumberToRomanNumeral();
    }
});

function convertNumberToRomanNumeral() {
    const number = parseInt(inputEl.value);
    const p = document.createElement("p");

    const roman1 = "I";
    const roman5 = "V";
    const roman10 = "X";
    const roman50 = "L";
    const roman100 = "C";
    const roman500 = "D";
    const roman1000 = "M";

    let romanNumeral = "";
    outputEl.innerHTML = "";
    outputEl.classList.remove('invalid-number');

    if (isNaN(number)) {
        outputEl.classList.add('invalid-number');
        p.textContent = "Please enter a valid number.";
    } else if (number < 1) {
        outputEl.classList.add('invalid-number');
        p.textContent = "Please enter a number greater than or equal to 1.";
    } else if (number > 3999) {
        outputEl.classList.add('invalid-number');
        p.textContent = "Please enter a number less than or equal to 3999";
    } else {
        p.classList.add("roman-numeral");
        p.textContent = _convert(number);
    }

    // Recursive function that will continue to call itself until building the last character of the romanNumeral string.
    function _convert(number) {
        let charRepeatCount = 1;

        if (number >= 1000) {
            charRepeatCount = Math.floor(number / 1000);
            romanNumeral += roman1000.repeat(charRepeatCount)
            _convert(number % 1000);
        } else if (number >= 900) {
            romanNumeral += roman100 + roman1000;
            _convert(number % 900);
        } else if (number >= 500) {
            romanNumeral += roman500;
            _convert(number % 500);
        } else if (number >= 400) {
            romanNumeral += roman100 + roman500;
            _convert(number % 400);
        } else if (number >= 100) {
            charRepeatCount = Math.floor(number / 100);
            romanNumeral += roman100.repeat(charRepeatCount);
            _convert(number % 100);
        } else if (number >= 90) {
            romanNumeral += roman10 + roman100;
            _convert(number % 90);
        } else if (number >= 50) {
            romanNumeral += roman50;
            _convert(number % 50);
        } else if (number >= 40) {
            romanNumeral += roman10 + roman50;
            _convert(number % 40);
        } else if (number >= 10) {
            charRepeatCount = Math.floor(number / 10);
            romanNumeral += roman10.repeat(charRepeatCount);
            _convert(number % 10);
        } else if (number === 9) {
            romanNumeral += roman1 + roman10;
        } else if (number >= 5) {
            romanNumeral += roman5;
            _convert (number % 5);
        } else if (number === 4) {
            romanNumeral += roman1 + roman5;
        } else if (number > 1) {
            romanNumeral += roman1.repeat(number);
        } else if (number === 1) {
            romanNumeral += roman1;
        }

        return romanNumeral;
    }

    outputEl.appendChild(p);
    updateOutputVisibility();
}

function updateOutputVisibility() {
    if (!outputEl.innerHTML && !outputEl.classList.contains('hidden')) {
        outputEl.classList.add('hidden');
    } else {
        outputEl.classList.remove('hidden');
    }
}


/**
 * Potential Improvements:
 * 
 * - This application was created using only the 7 base roman numeral characters.
 *   However, I believe it could be simplified by expanding the character set
 *   to include character combinations in the 4, 9, 40, 90, 400, 900 etc. positions.
 *  
 * - This expanded set of characters could be stored in a multidimensional array such as:
 *   [ 
 *     [1000, 'M'],
 *     [900, 'CM'],
 *     [500, 'D'],
 *     [400, 'CD'],
 *     [100, 'C'],
 *     [90, 'XC'],
 *     [50, 'L'],
 *     [40, 'XL'],
 *     [10, 'X'],
 *     [9, 'IX'],
 *     [5, 'V'],
 *     [4, 'IV'],
 *     [1, 'I']
 *   ]
 * 
 * - Then, I could use .forEach() combined with an inner loop to loop through each of the array items
 *   and compare the current number to the values in the array.  Starting with the highest numeral in
 *   the set, if the current number is greater than or equal to roman value breakpoint, can add the
 *   corresponding character or character combination to the string, and then reduce the current number
 *   by the same amount.  
 * 
 * - It would be possible to use either string concatenation or (array.push() + string conversion) to
 *   build out the final roman numeral.
 * 
 * - This may be a good opportunity for refactoring in the future.
 */