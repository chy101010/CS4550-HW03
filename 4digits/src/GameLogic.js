// Returns a string of 4 unique digits
export function generateSecret() {
    let digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let result = "";
    while (result.length !== 4) {
        let index = Math.floor(Math.random() * digits.length);
        result += digits[index];
        digits.splice(index, 1);
    }
    return result
}

/* 
    A guess is valid if all 4 digits in {guess} are unique, and the combination is not repeated in {guesses}
        {guesses} - String[], previous guesses.
        {guess}   - String, new guess
*/
export function validGuess(guesses, guess) {
    if (guesses.includes(guess)) {
        return { status: -1, message: "Invalid: Require New Guess" };
    }
    const unique = [...new Set(guess.split(''))];
    if (4 < guess.length || unique.length < 4) {
        return { status: -1, message: "Invalid: Require 4 Unique Digits" }
    }
    else if(isNaN(guess)) {
        return {status : -1, message: "Invalid: Require Only Numbers"};
    }
    else if(guess.includes("0")) {
        return {status : -1, message: "Invalid: Require 1 - 9, [0]"};
    }
    return { status: 0, message: "Guess Processed" };
}


/*
    Compare the guess string with the secret string and returns the #A#B results
    {guess}  - String, new guess
    {secret} - String, the Secrete 
*/
export function compareGuess(guess, secret) {
    let bull = 0;
    let cow = 0;
    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === secret[i]) {
            bull++;
        } else if (secret.includes(guess[i])) {
            cow++;
        }
    }
    let code = (bull === 4) ? 0 : -1;
    console.log(code);
    return { status: code, message: `${bull}A${cow}B` };
}

