/*
Function recieves string fraction ('3/4', '7/8', '6/4'),
returns a number fixed maximum to 3.
@param: string fraction
*/
Math.fractionToNumber = function(str) {
	try {
		if (typeof str !== 'string' || isNaN(parseInt(str)))
			throw new TypeError('Math.fractionToNumber: argument should be a string fraction');
		
		// if '1 1/2' or '1-1/2'
		const [first, second] = str.split(/[\s-]/);

		if (!second) {
			// thne 'first' is just '1/2'
			return simpleFraction(first);
		} else {
			// '1 1/2' or '1-1/2'
			return +first + simpleFraction(second);
		}

		function simpleFraction(fraction) {
			// a - numerator, b - denominator
			const [a, b] = fraction.split('/').map(num => parseInt(num));
			return !b ? a : parseFloat((a / b).toFixed(3));
		}
	} catch (error) {
		console.log(error);
		return str;
	}
}


/*
Function recieves a number, and returns a string fraction ('3/4', '2 1/2')
@param: number
*/
Math.numberToFraction = function(num) {
	try {
		if (typeof num !== 'number')
			throw new TypeError('Math.numToFraction: argument should be a number.');

		if (num < 1) {
			// 0.75
			return simpleDivision(num);
		} else if (num % 1 !== 0) {
			// 2.4
			// take the first part of the number
			const int = parseInt(num);
			const decim = parseFloat((num - int).toFixed(3));

			return int + '' + simpleDivision(decim);
		} else {
			return num;
		}
	} catch (error) {
		console.log(error);
		return num;
	}
		

	function simpleDivision(num) {
		// translate it to 750/1000
		let a = num * 1000;
		let b = 1000;
		
		// loop for division both numbers on 2, 3, 4 ... 9
		main:
		while (true) {
			division:
			for (let i = 2; i <= 9; i++) {
				// if none of the number divides completely,
				// then we already have the result
				if (i === 9) break main;

				// if mods of both numbers are 0
				// then divide numbers and quit from the loop
				if (a % i === 0 && b % i === 0) {
					a = a / i;
					b = b / i;
					break division;
				}
			}
		}

		return `<span class="sup">${a}</span>/<span class="sub">${b}</span>`;
	}
}