let the_number_is = function(i, expression) {
    let number;
    let regex_number = /^[0-9]+,?.?[0-9]*$/;
    if (i === 0 || expression[i - 1] !== "*")
        number = 1;
    else if (regex_number.test(expression[i - 2]))
        if (expression[i - 3] === "-")
            number = expression[i - 2] * -1;
        else
            number = expression[i - 2];
    else
        console.log("Je n'ai pas pu trouver le nombre désolé");
    return (number);
}

let regex_find = function (i, expression) {
    let regex_a = /^X\^1$/;
    let regex_b = /^X\^2$/;
    let regex_c = /^X\^0$/;

    if (regex_a.test(expression[i]))
        return ("a");
    else if (regex_b.test(expression[i]))
        return ("b");
    else if (regex_c.test(expression[i]))
        return ("c");
}

let the_sign_is = function(i, expression) {
    if (i === 0)
        return ("+")
    else if (expression[i - 1] !== "*")
        if (expression [i - 1] === "=")
            return ("+");
        else
            return (expression [i - 1]);
    else if (expression[i - 3] === "+" || expression[i - 3] === "-")
        return (expression [i - 3]);
}

let modify_expression = function(number, letter, sign, expression, i_save) {
    if (expression[i_save] == 0)
        return ;
    for (let i = 0; expression[i] && expression[i] !== "="; i++) {
        if (regex_find(i, expression) === letter) {
            if (sign === "+") {
                if (i === 0) {
                    expression.splice(0, "-");
                    expression.splice(1, number);
                    expression.splice(2, "*");
                }
                else if (expression[i - 1] !== "*") {
                    expression[i - 1] = "-";
                    expression.splice(i, number);
                    expression.splice(i + 1, "*");
                }
                else
                    if (number > expression[i - 2]) {
                        expression[i - 2] = parseInt(expression[i - 2]) - number * -1;
                        expression.splice(i - 3, "-");
                    }
                    else
                        expression[i - 2] = parseInt(expression[i - 2]) - number;
            }
            else if (sign === "-") {
                if (i === 0) {
                    epxression.splice(0, number);
                    epxression.splice(1, "*");
                }
                else if (expression[i - 1] !== "*") {
                    expression.splice(i, number);
                    expression.splice(i + 1, "*");
                }
                else
                    expression[i - 2] = parseInt(expression[i - 2]) + number;
                    if (expression[i - 3] === "-" && expression [i - 2] < number)
                        expression [i - 3] = "+";
            }
        }
    }
    if (number === 1) {
        expression[i_save] = "0";
    }
    else if (number !== 1) {
        expression[i_save] = "0";
        if (sign === "-")
            expression.splice(i_save - 3, 3);
        else if (sign === "+" && expression[i_save - 3] === "=")
            expression.splice(i_save - 2, 2);
        else
            expression.splice(i_save - 3, 3);
    }

}

let regex_test = function(i, expression, abc){
    let regex_a = /X\^2/;
    let regex_b = /X\^1/;
    let regex_c = /X\^0/;

    if (regex_a.test(expression[i])) {
        abc[0] = the_number_is(i, expression);
        console.log("a", abc[0]);
    }
    if (regex_b.test(expression[i])) {
        abc[1] = the_number_is(i, expression);
        console.log("b", abc[1]);
    }
    if (regex_c.test(expression[i])) {
        abc[2] = the_number_is(i, expression);
        console.log("c", abc[2]);
    }
}

let main = function() {
    let abc = [];
    if (process.argv.length < 3)
        console.log("Nombre d'argument insuffisant\nExample : 4 * X^2 + 5 * X^1 + 2 * X^0 = 1 * X^0");
    else if (process.argv.length > 3)
        console.log("Nombre d'argument trop important\nExample : 4 * X^2 + 5 * X^1 + 2 * X^0 = 1 * X^0");
    else {
        let expression = process.argv[2].split(" ");
        let i = 0;
        while (expression[i] !== "=")
            i++;
        i++;
        while (expression[i]) {
            modify_expression(the_number_is(i, expression), regex_find(i, expression), the_sign_is(i, expression), expression, i);
            i++;
        }
        for (i = 0; expression[i] && expression[i] !== "="; i++) {
            regex_test(i, expression, abc);
        }
        console.log(expression.join(" "));
        let delta = abc[1] * abc[1] - 4 * abc[0] * abc[2];
        if (delta < 0)
            console.log("Aucune solution n'est possible");
        else if (delta === 0) {
            console.log("Polynomial degree: 1\nThe solution is:")
            console.log(-abc[1] / 2 * abc[0]);
        }
        else if (delta > 0) {
            console.log("Polynomial degree: 2\nDiscriminant is strictly positive, the two solutions are:");
            console.log((-abc[1] + Math.sqrt(delta)) / (2 * abc[0]));
            console.log((-abc[1] - Math.sqrt(delta)) / (2 * abc[0]));
        }
    }
}

main();