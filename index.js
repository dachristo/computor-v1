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
	console.log(number);
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
	else
		return ("+");
}

let modify_expression = function(number, letter, sign, expression, i_save) {
	let find = false;
	if (expression[i_save] == 0)
		return (i_save);
	if (letter == undefined)
		return (i_save);
	for (let i = 0; expression && expression[i] !== "="; i++) {
		console.log("boucle ", expression[i], letter);
		if (regex_find(i, expression) === letter) {
			find = true;
			console.log("Je gère : ", letter);
			if (sign === "+") {
				if (i === 0) {
					console.log("here1");
					expression.splice(0, "-");
					expression.splice(1, number);
					expression.splice(2, "*");
					console.log(expression.join(" "));
				}
				else if (expression[i - 1] !== "*") {
					console.log("here2");
					expression[i - 1] = "-";
					expression.splice(i, number);
					expression.splice(i + 1, "*");
					console.log(expression.join(" "));
				}
				else {
					console.log("here3");
					console.log("3 : ", expression.join(" "));
					if (number > expression[i - 2]) {
						console.log("here4");
						console.log("4 avant", expression.join(" "));
						expression[i - 2] = (parseInt(expression[i - 2]) - number) * -1;
						if (i < 3) {
							expression.splice(0, 0, "-");
							i++;
						}
						else
							expression[i - 3] = "-";
						console.log("4 apres", expression.join(" "));
					}
					else {
						console.log("here5");
						console.log("5 avant", expression.join(" "));
						expression[i - 2] = parseInt(expression[i - 2]) - number;
						console.log("5 apres", expression.join(" "));
					}
					console.log("a la fin", expression.join(" "));
				}
			}
			else if (sign === "-") {
				if (i === 0) {
					console.log("6 avant ", expression.join(" "));
					epxression.splice(0, number);
					epxression.splice(1, "*");
					console.log("6 apres ", expression.join(" "));
				}
				else if (expression[i - 1] !== "*") {
					console.log("7 avant ", expression.join(" "));
					expression.splice(i, number);
					expression.splice(i + 1, "*");
					console.log("7 apres ", expression.join(" "));
				}
				else {
					console.log("8 avant ", expression.join(" "));
					expression[i - 2] = parseInt(expression[i - 2]) + (number * -1);
					console.log("8 apres ", expression.join(" "));
					if (expression[i - 3] === "-" && expression [i - 2] < number) {
						console.log("8 avant2 ", expression.join(" "));
						expression [i - 3] = "+";
						console.log("8 apres2 ", expression.join(" "));
					}
				}
			}
		}
	}
	if (!find) {
		// TODO : Il faut rajouter a la fin avant le =;
	}

	if (number !== 1) {
		expression.splice(i_save, 1);
		if (sign === "-") {
			expression.splice(i_save - 3, 3);
		}
		else if (sign === "+" && expression[i_save - 3] === "=") {
			expression.splice(i_save - 2, 2);
		}
		else {
			expression.splice(i_save - 3, 3);
		}
	}
	return (i_save - 3);
}

let find_if_degree_3 = function(expression) {
	let regex_3 = /^X\^3$/;
	for (let i = 0; expression && expression[i] !== "="; i++) {
		if (regex_3.test(expression[i]))
			return true;
	}
	return false;
}

let regex_test = function(i, expression, abc){
	let regex_a = /^X\^2$/;
	let regex_b = /^X\^1$/;
	let regex_c = /^X\^0$/;

	if (regex_a.test(expression[i]))
		abc[0] = the_number_is(i, expression);
	if (regex_b.test(expression[i]))
		abc[1] = the_number_is(i, expression);
	if (regex_c.test(expression[i]))
		abc[2] = the_number_is(i, expression);
}

let find_solution_degree = function(expression) {
    let regex_0 = /^X\^/;

    for (let i = 0; expression && expression[i] !== "="; i++) {
        if (regex_0.test(expression[i])) {
            if (the_number_is(i, expression) === 0)
                return ("Tous les nombres réels sont solution...");
            else
                return (the_sign_is(i, expression) === "+" ? the_number_is(i, expression) * -1 : the_number_is(i, expression));
        }
    }
}

let find_solution_degree_0 = function(expression) {
	let regex_0 = /^X\^0$/;

	for (let i = 0; expression && expression[i] !== "="; i++) {
		if (regex_0.test(expression[i])) {
			if (the_number_is(i, expression) === 0)
				return ("Tous les nombres réels sont solution...");
			else
				return (the_sign_is(i, expression) === "+" ? the_number_is(i, expression) * -1 : the_number_is(i, expression));
		}
	}
}

let find_solution_degree_1 = function(expression) {
	let regex_1 = /^X\^1$/;

	for (let i = 0; expression && expression[i] !== "="; i++) {
		if (regex_1.test(expression[i])) {
            console.log(i, expression);
            if (the_number_is(i, expression) === 0)
				return ("Tous les nombres réels sont solution...");
			return (the_number_is(i, expression));
		}
	}
	return ("Aucune solution n'est possible");
};

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
		let i_save = i++;
		while (i < expression.length) {
			i = modify_expression(the_number_is(i, expression), regex_find(i, expression), the_sign_is(i, expression), expression, i);
			i++;
		}
		console.log("ici ", i, expression.length, expression);
		expression.splice(i_save + 2, expression.length);
		console.log(i_save + 2, expression.length, expression);
		for (i = 0; expression && expression[i] !== "="; i++) {
			regex_test(i, expression, abc);
		}
		expression.push("0");
		console.log("Reduced form:", expression.join(" "));
		if (find_if_degree_3(expression))
			console.log("Polynomial degree: 3\nThe polynomial degree is stricly greater than 2, I can't solve.");
		else if (abc[0] == undefined || abc[0] == 0) {
			console.log("Polynomial degree: 1\nThe solution is:");
			let result = find_solution_degree_1(expression);
			let result2 = find_solution_degree_0(expression);
			let resultX = find_solution_degree(expression);
			if (result !== "Tous les nombres réels sont solution..." && result !== "Aucune solution n'est possible" && result != 0)
				console.log(result2 / result);
			else if (result == 0)
				console.log("1Aucune solution n'est possible");
			else if (result === "Tous les nombres réels sont solution..." || result2 === "Tous les nombres réels sont solution..." || resultX === "Tous les nombres réels sont solution...")
				console.log("Tous les nombres réels sont solution...");
			else
				console.log(result);
		}
		else {
			let delta = abc[1] * abc[1] - 4 * abc[0] * abc[2];
			if (delta < 0 || abc[1] == undefined || abc[2] == undefined || abc[0] == undefined)
				console.log("2Aucune solution n'est possible");
			else if (delta === 0) {
				console.log("Polynomial degree: 1\nThe solution is:")
					if (abc[0] === 0)
						console.log("3Aucune solution n'est possible");
					else
						console.log(-abc[1] / 2 * abc[0]);
			}
			else if (delta > 0) {
				console.log("Polynomial degree: 2\nDiscriminant is strictly positive, the two solutions are:");
				console.log((-abc[1] + delta ** 0.5 / (2 * abc[0]));
				console.log((-abc[1] - delta ** 0.5 / (2 * abc[0]));
			}
		}
	}
}

main();
