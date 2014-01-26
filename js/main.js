/**
 * Created by Mario Enrique on 1/25/14.
 */

// Convert a number to an array of digits
function numbToArray(numb){
    return numb.toString().split("").map(Number);
}

// Check if the given number is palindromic
function isPalindrome(numb){
    return numb === parseInt(numbToArray(numb).reverse().join(""));
}

// Sum the values of an array
function sumArray(array) {
    var i, sum = 0;

    for (i = 0; i < array.length; i++) {
        sum += array[i];
    }

    return sum;
}

// Remove duplicated
function removeDuplicated(array) {
    var result = [];

    array.forEach(function (value) {
        if (result.indexOf(value) === -1) {
            result.push(value);
        }
    });

    return result;
}

// Find all palindromic numbers that can be written like a sum of consecutive squares
function FindValidPalindromes(numb) {
    var palindromes = [],
        max = Math.sqrt(numb),
        sumSqr = 0,
        i,
        j,
        inRange = false;

    // Iterate with possible sums
    for (i = 1; i <= max; i++) {
        sumSqr = Math.pow(i, 2);

        for (j = i + 1; j <= max; j++) {
            sumSqr += Math.pow(j, 2);

            if (sumSqr > numb) {
                break;
            };

            if (isPalindrome(sumSqr))
                palindromes.push(sumSqr);
        }
    }

    // Maybe some numbers can be written in more than one sequence so... remove duplicated
    return removeDuplicated(palindromes.sort(function (current, next) {
        return current - next;
    }));
}

// UI
$(document).ready(function(){

    // Function to solve the problem and display the result
    function solve(){
        var polList = [],
            numb = 0;

        numb = parseInt($("#txtNumb").val());
        polList = FindValidPalindromes(numb);

        $("#txtPalindromes").val("Sum: " + sumArray(polList) + "\r\nPalindromes: [" + polList.join(", ") + "]");
    }

    // Prevent invalid operation with no integer
    $("#txtNumb").keyup(function () {
        var valid = $("#txtNumb").val().match(/^\d+$/);

        $("#txtPalindromes").val("");

        $("#inputGroup").toggleClass("has-error", !valid);
        if (valid) {
            $("#btnSolve").removeAttr("disabled");
        } else {
            $("#btnSolve").attr("disabled", "disabled");
        }
    })

    // Execute the operation
    $("#btnSolve").click(function(){
        solve();
    });

    // Reset input values
    $('#myModal').on('shown.bs.modal', function (e) {
        $("#txtNumb").val("").focus();
        $("#txtPalindromes").val("");
    });


});