function addCriterions() {
	{
		let element = document.getElementById('form2');
		while (element.firstChild) element.firstChild.remove();
		element = document.getElementById('form3');
		while (element.firstChild) element.firstChild.remove();
		element = document.getElementById('form4');
		while (element.firstChild) element.firstChild.remove();
		element = document.getElementById('form5');
		while (element.firstChild) element.firstChild.remove();
	}

	const number = document.getElementById('criterions').value;
	const form = document.getElementById('form2');

	for (let i = 1; i <= number; i++) {
		const label = document.createElement('label');
		label.innerHTML = `Назва ${i}-го критерію:`;
		const input = document.createElement('input');
		input.setAttribute('type', 'text');
		input.setAttribute('required', true);
		input.setAttribute('id', `criterion${i}`);
		label.appendChild(input);
		form.appendChild(label);
	}
	{
		const inputSubmit = document.createElement('input');
		inputSubmit.setAttribute('type', 'submit');
		inputSubmit.setAttribute('value', 'Далі');
		inputSubmit.setAttribute('onclick', 'fillCriterions()');
		inputSubmit.setAttribute('class', 'button');
		form.appendChild(inputSubmit);
	}
	{
		const second = document.getElementById('second');
		second.style.display = 'block';
		const third = document.getElementById('third');
		third.style.display = 'none';
		const fourth = document.getElementById('fourth');
		fourth.style.display = 'none';
		const fifth = document.getElementById('fifth');
		fifth.style.display = 'none';
	}
}

function fillCriterions() {
	{
		let element = document.getElementById('form3');
		while (element.firstChild) element.firstChild.remove();
		element = document.getElementById('form4');
		while (element.firstChild) element.firstChild.remove();
		element = document.getElementById('form5');
		while (element.firstChild) element.firstChild.remove();
	}

	const number = document.getElementById('criterions').value;
	const form = document.getElementById('form3');

	for (let i = 1; i <= number; i++) {
		const element = document.getElementById(`criterion${i}`);
		if (element.value == null || String(element.value).trim() == '') return;
	}

	for (let i = 1; i <= number; i++) {
		const label = document.createElement('label');
		label.innerHTML = `Критер. значення у "${document.getElementById(`criterion${i}`).value}" через кому:`;
		const input = document.createElement('input');
		input.setAttribute('type', 'text');
		input.setAttribute('required', true);
		input.setAttribute('id', `criterion_names${i}`);
		label.appendChild(input);
		form.appendChild(label);
	}
	{
		const inputSubmit = document.createElement('input');
		inputSubmit.setAttribute('type', 'submit');
		inputSubmit.setAttribute('value', 'Обчислити');
		inputSubmit.setAttribute('onclick', 'showTable()');
		inputSubmit.setAttribute('class', 'button');
		form.appendChild(inputSubmit);
	}

	{
		const third = document.getElementById('third');
		third.style.display = 'block';
		const fourth = document.getElementById('fourth');
		fourth.style.display = 'none';
		const fifth = document.getElementById('fifth');
		fifth.style.display = 'none';
	}
}

function showTable() {
	{
		let element = document.getElementById('form4');
		while (element.firstChild) element.firstChild.remove();
		element = document.getElementById('form5');
		while (element.firstChild) element.firstChild.remove();
	}

	const number = document.getElementById('criterions').value;
	const form = document.getElementById('form4');

	for (let i = 1; i <= number; i++) {
		const element = document.getElementById(`criterion_names${i}`);
		if (element.value == null || String(element.value).trim() == '') return;
	}

	const table = document.createElement('table');
	const firstRow = document.createElement('tr');
	const headerNumber = document.createElement('th');
	headerNumber.innerHTML = '№';
	firstRow.appendChild(headerNumber);
	for (let i = 1; i <= number; i++) {
		const header = document.createElement('th');
		header.innerHTML = document.getElementById(`criterion${i}`).value;
		firstRow.appendChild(header);
	}
	table.appendChild(firstRow);

	// PREPARING DATA

	let K = new Array();
	for (let i = 1; i <= number; i++) {
		let currentK = new Array();
		const stringK = String(document.getElementById(`criterion_names${i}`).value);
		for (str of stringK.split(',')) {
			currentK.push(str);
		}
		K.push(currentK);
	}

	let final = 1;
	for (array of K) final *= array.length;
	for (let count = 0; count < final; count++) {
		const currentRow = document.createElement('tr');
		const elementNumber = document.createElement('td');
		elementNumber.innerHTML = `${count + 1}`;
		currentRow.appendChild(elementNumber);
		let countCopy = count;
		for (let i = 0; i < K.length; i++) {
			let alternativesWithCurrentValue = 1;
			for (let j = i + 1; j < K.length; j++) alternativesWithCurrentValue *= K[j].length;
			const currentElement = document.createElement('td');
			currentElement.innerHTML = K[i][Math.floor(countCopy / alternativesWithCurrentValue)];
			countCopy %= alternativesWithCurrentValue;
			currentRow.appendChild(currentElement);
		}
		table.appendChild(currentRow);
	}
	//

	form.appendChild(table);
	{

		const h1Count = document.createElement('h1');
		h1Count.innerHTML = `Кількість гіпотетично можливих альтернатив: ${String(final)}`;
		form.appendChild(h1Count);


		let theBestAlternative = '';
		for(let i = 0; i < K.length; i++) theBestAlternative += K[i][0] + ', ';
		theBestAlternative = theBestAlternative.slice(0, -2);
		const h1TheBest = document.createElement('h1');
		h1TheBest.innerHTML = `Найкраща альтернатива: (${theBestAlternative})`;
		form.appendChild(h1TheBest);

		let theWorstAlternative = '';
		for(let i = 0; i < K.length; i++) theWorstAlternative += K[i][K[i].length - 1] + ', ';
		theWorstAlternative = theWorstAlternative.slice(0, -2);
		const h1TheWorst = document.createElement('h1');
		h1TheWorst.innerHTML = `Найгірша альтернатива: (${theWorstAlternative})`;
		form.appendChild(h1TheWorst);
	}


	//FORM
	{
		const h1Top = document.createElement('h1');
		h1Top.innerHTML = 'Оберіть альтернативу:';
		form.appendChild(h1Top);
		for (let i = 0; i < K.length; i++) {
			const label = document.createElement('label');
			label.innerHTML = document.getElementById(`criterion${i + 1}`).value + ':';
			const selector = document.createElement('select');
			selector.setAttribute('id', `criterions${i}`);
			for (let j = 0; j < K[i].length; j++) {
				const option = document.createElement('option');
				if (j == 0) option.selected = true;
				option.value = j;
				option.innerHTML = K[i][j];
				selector.appendChild(option);
			}
			label.appendChild(selector);
			form.appendChild(label);
		}
	}

	{
		const inputSubmit = document.createElement('input');
		inputSubmit.setAttribute('type', 'submit');
		inputSubmit.setAttribute('value', 'Обчислити');
		inputSubmit.setAttribute('onclick', 'calculateTable()');
		inputSubmit.setAttribute('class', 'button');
		form.appendChild(inputSubmit);
	}
	//
	const fourth = document.getElementById('fourth');
	fourth.style.display = 'block';
	const fifth = document.getElementById('fifth');
	fifth.style.display = 'none';
}

function calculateTable() {
	{
		let element = document.getElementById('form5');
		while (element.firstChild) element.firstChild.remove();
	}

	const number = document.getElementById('criterions').value;
	const form = document.getElementById('form5');

	let K = new Array();
	for (let i = 1; i <= number; i++) {
		let currentK = new Array();
		const stringK = String(document.getElementById(`criterion_names${i}`).value);
		for (str of stringK.split(',')) {
			currentK.push(str);
		}
		K.push(currentK);
	}

	let final = 1;
	for (array of K) final *= array.length;
	const choice = new Array();
	for (let i = 0; i < K.length; i++) choice.push(document.getElementById(`criterions${i}`).value);
	const tableBetter = document.createElement('table');
	const tableWorse = document.createElement('table');
	const tableUncomparable = document.createElement('table');
	let countBetter = 0;
	let countWorse = 0;
	let countUncomparable = 0;
	for (let count = 0; count < final; count++) {
		let worse = 0;
		let better = 0;
		let countCopy = count;
		const currentRow = document.createElement('tr');
		const elementNumber = document.createElement('td');
		elementNumber.innerHTML = `${count + 1}`;
		currentRow.appendChild(elementNumber);
		for (let i = 0; i < K.length; i++) {
			let alternativesWithCurrentValue = 1;
			for (let j = i + 1; j < K.length; j++) alternativesWithCurrentValue *= K[j].length;
			const currentIndex = Math.floor(countCopy / alternativesWithCurrentValue);
			if (currentIndex <= choice[i]) better += 1;
			if (currentIndex >= choice[i]) worse += 1;
			const currentElement = document.createElement('td');
			currentElement.innerHTML = K[i][Math.floor(countCopy / alternativesWithCurrentValue)];
			currentRow.appendChild(currentElement);
			countCopy %= alternativesWithCurrentValue;
		}
		if (better == worse && better == K.length) continue;
		if (better == K.length) { tableBetter.appendChild(currentRow); countBetter += 1; continue; }
		if (worse == K.length) { tableWorse.appendChild(currentRow); countWorse += 1; continue; }
		tableUncomparable.appendChild(currentRow);
		countUncomparable += 1;
	}
	let selectedAlternative = '';
	for(let i = 0; i < K.length; i++) selectedAlternative += K[i][choice[i]] + ', ';
	selectedAlternative = selectedAlternative.slice(0, -2);
	const h1SelectedAlternative = document.createElement('h1');
	h1SelectedAlternative .innerHTML = `Вибрана альтернатива: (${selectedAlternative})`;
	form.appendChild(h1SelectedAlternative );

	const h1Better = document.createElement('h1');
	h1Better.innerHTML = `Кращі альтернативи (кількість: ${countBetter}):`;
	form.appendChild(h1Better);
	form.appendChild(tableBetter);
	const h1Worse = document.createElement('h1');
	h1Worse.innerHTML = `Гірші альтернативи (кількість: ${countWorse}):`;
	form.appendChild(h1Worse);
	form.appendChild(tableWorse);
	const h1Uncomparable = document.createElement('h1');
	h1Uncomparable.innerHTML = `Не порівняні альтернативи (кількість: ${countUncomparable}):`;
	form.appendChild(h1Uncomparable);
	form.appendChild(tableUncomparable);
	const h1Result = document.createElement('h1');
	h1Result.innerHTML = `Перевірка кількості альтернатив:`; 
	h1Result.innerHTML += `<br>${countBetter} + ${countWorse} + ${countUncomparable} + 1 = ${final}`;
	h1Result.innerHTML += `<br>${countBetter + countWorse + countUncomparable + 1} = ${final}`;
	if (countBetter + countWorse + countUncomparable + 1 == final) h1Result.innerHTML += `<br>Співпадає!`;
	else h1Result.innerHTML += `<br>Не співпадає!`;
	form.appendChild(h1Result);
	{
		const fifth = document.getElementById('fifth');
		fifth.style.display = 'block';
	}
}