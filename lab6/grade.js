/*
 * ============================================================================
 * PART 1: ERROR IDENTIFICATION LIST (14 Errors Found)
 * ============================================================================
 * Error 1 (grade.html, Line 9): Missing "return" in onsubmit="checkMark()" caused the form to reload the page and erase the result immediately. Changed to onsubmit="return checkMark()".
 * Error 2 (grade.html, Line 16): Function call onclick="showtable()" used lowercase 't', causing a ReferenceError because the function in JS is named showTable().
 * Error 3 (grade.html, Line 18): Script tag linked to src="grades.js" instead of the actual filename "grade.js".
 * Error 4 (grade.js, Line 2): Missing assignment operator (=) in "let name document.forms...".
 * Error 5 (grade.js, Line 3): Missing assignment operator (=) and mismatched bracket/parenthesis in 'let mark document.forms["gradeForm"]["mark").value;'.
 * Error 6 (grade.js, Line 4): Used single equals assignment operator (name = "") instead of comparison operator (name === "") inside the if condition.
 * Error 7 (grade.js, Line 7): Incorrect capitalization in "isNan(mark)" instead of "isNaN(mark)" (ReferenceError).
 * Error 8 (grade.js, Line 10): Logical AND (mark < 0 && mark > 100) is impossible for a single number; changed to logical OR (mark < 0 || mark > 100).
 * Error 9 (grade.js, Lines 7-17): Mismatched/inverted curly braces and misplaced statements caused syntax errors and unreachable code after return statements.
 * Error 10 (grade.js, Line 16): Missing assignment operator (=) in "mark parseInt(mark);".
 * Error 11 (grade.js, Lines 20, 23, 24, 26): Invalid math symbols ($>=$, $=$, $^{\circ}$), missing closing parenthesis on line 23, missing semicolon on line 24, and missing (=) on line 26.
 * Error 12 (grade.js, Lines 28-29): Incorrect capitalization in "getElementByID" (should be "getElementById"), missing (=) operator, and unquoted string "got grade".
 * Error 13 (grade.js, Line 30): British spelling "style.colour" instead of CSS DOM property "style.color".
 * Error 14 (grade.js, Lines 38-42): Loop started at i = 1 (skipping index 0 / Grade "A"), closed "</table>" inside the loop on every iteration, and used wrong capitalization ".innerHtml" instead of ".innerHTML".
 */

// Function to validate inputs, calculate grade, and display colored result + timestamp
function checkMark() {
    let name = document.forms["gradeForm"]["name"].value.trim();
    let markInput = document.forms["gradeForm"]["mark"].value.trim();

    // Validate empty name
    if (name === "") {
        alert("Name must be filled out.");
        return false;
    }

    // Extended feature (Step 5): Check for empty mark field
    if (markInput === "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    // Validate numeric input
    if (isNaN(markInput)) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    // Convert valid numeric string to number and check range (0 - 100)
    let mark = Number(markInput);
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    // Determine grade and corresponding text color (Step 6)
    let grade;
    let textColor;

    if (mark >= 80) {
        grade = "A";
        textColor = "green";
    } else if (mark >= 65) {
        grade = "B";
        textColor = "green";
    } else if (mark >= 50) {
        grade = "C";
        textColor = "orange";
    } else {
        grade = "F";
        textColor = "red";
    }

    // Display result with dynamic color
    let resultEl = document.getElementById("result");
    resultEl.innerHTML = name + " got grade " + grade;
    resultEl.style.color = textColor;

    // Extended feature (Step 8): Display date and time checked using Date()
    let timeEl = document.getElementById("checkedTime");
    timeEl.innerHTML = "Checked on: " + new Date();
    timeEl.style.color = textColor;

    // Return false so the form does not refresh the page
    return false;
}

// Extended feature (Step 7): Generate a random whole number from 0 to 100
function generateRandomMark() {
    let randomScore = Math.floor(Math.random() * 101);
    document.getElementById("mark").value = randomScore;
}

// Function to display the complete Grade Table (Grades A, B, C, F)
function showTable() {
    let grades = ["A", "B", "C", "F"];
    let ranges = ["80-100", "65-79", "50-64", "0-49"];

    let tableHTML = "<table>";
    tableHTML += "<tr><th>Grade</th><th>Mark range</th></tr>";

    // Start loop at i = 0 so Grade A is included
    for (let i = 0; i < grades.length; i++) {
        tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
    }

    tableHTML += "</table>";
    document.getElementById("tableContainer").innerHTML = tableHTML;
}