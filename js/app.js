class Expense {
	constructor(year, month, day, type, description, value) {
		this.year = year
		this.month = month
		this.day = day
		this.type = type
		this.description = description
		this.value = value
	}

	validadeDate() {
		for (let i in this) {
			if (this[i] == undefined || this[i] == '' || this[i] == null) {
				return false
			}
		}
		return true
	}
}

class Bd {

	constructor() {
		let id = localStorage.getItem('id')

		if (id === null) {
			localStorage.setItem('id', 0)
		}
	}

	getNextId() {
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId) + 1
	}

	save(d) {
		let id = this.getNextId()

		localStorage.setItem(id, JSON.stringify(d))

		localStorage.setItem('id', id)
	}

	recoverAllRecords() {

		// array de despesas
		let expenses = Array()
		let id = localStorage.getItem('id')

		// recuperar todas as despesas cadastradas em localStorage
		for (let i = 1; i <= id; i++) {

			// Recupera as despesas
			let expense = JSON.parse(localStorage.getItem(i))

			// Verificando se existe a possibildiade de haver índices que foram pulados/ removidos. Nestes casos iremos pular esse índice
			if (expense === null) {
				continue
			}

			expense.id = i
			expenses.push(expense)
		}

		return expenses
	}

	search(expense) {

		let expenseFilter = Array()

		expenseFilter = this.recoverAllRecords()

		console.log(expense)

		console.log(expenseFilter)

		
		if(expense.year != '') {

			console.log('filtro de ano')
			expenseFilter =  expenseFilter.filter(e => e.year == expense.year)
		}

		if(expense.month != '') {

			console.log('filtro de mês')
			expenseFilter =  expenseFilter.filter(e => e.month == expense.month)
		}

		if(expense.day != '') {

			console.log('filtro de dia')
			expenseFilter =  expenseFilter.filter(e => e.day == expense.day)
		}

		if(expense.type != '') {

			console.log('filtro de tipo')
			expenseFilter =  expenseFilter.filter(e => e.type == expense.type)
		}

		if(expense.description != '') {

			console.log('filtro de descrição')
			expenseFilter =  expenseFilter.filter(e => e.description == expense.description)
		}

		if(expense.value != '') {

			console.log('filtro de valor')
			expenseFilter =  expenseFilter.filter(e => e.value == expense.value)
		}

		return expenseFilter
	}

	remover(id) {
		localStorage.removeItem(id)
	}
}

let bd = new Bd()


function registerExpense() {

	let year = document.getElementById('year')
	let month = document.getElementById('month')
	let day = document.getElementById('day')
	let type = document.getElementById('type')
	let description = document.getElementById('description')
	let value = document.getElementById('value')

	let expense = new Expense(
		year.value,
		month.value,
		day.value,
		type.value,
		description.value,
		value.value
	)


	if (expense.validadeDate()) {
		bd.save(expense)

		document.getElementById('modal_title').innerHTML = 'Registro inserido com sucesso'
		document.getElementById('modal_title_div').className = 'modal-header text-success'
		document.getElementById('modal_context').innerHTML = 'Despesa foi cadastrada com sucesso!'
		document.getElementById('modal_btn').innerHTML = 'Voltar'
		document.getElementById('modal_btn').className = 'btn btn-success'

		$('#modalRegisterExpense').modal('show')

		year.value = ''
		month.value = ''
		day.value = ''
		type.value = ''
		description.value = ''
		value.value = ''
	} else {

		document.getElementById('modal_title').innerHTML = 'Erro na inclusão do registro'
		document.getElementById('modal_title_div').className = 'modal-header text-danger'
		document.getElementById('modal_context').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente!'
		document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
		document.getElementById('modal_btn').className = 'btn btn-danger'

		$('#modalRegisterExpense').modal('show')
	}
}

function loadListExpense(expenses = Array(), filter = false) {

	if(expenses.length == 0 && filter == false) {

		expenses = bd.recoverAllRecords()
	}

	// Selecionando o elemento tbody da tabela
	let listExpenses = document.getElementById('listExpenses')
	listExpenses.innerHTML = ''

	// Percorrer o array despensas, listando cada despesa de forma dinâmica
	expenses.forEach(function(e) {
		
		// Criando a linha (tr)
		let line = listExpenses.insertRow()

		// Criando as colonuas (td)
		 line.insertCell(0).innerHTML =  `${e.day}/${e.month}/${e.year}`
		
		// Ajustando o tipo
		switch(e.type) {
			case '1': e.type = 'Alimentação'
				break
			case '2': e.type = 'Educação'
				break
			case '3': e.type = 'Lazer'
				break
			case '4': e.type = 'Saúde'
				break
			case '5': e.type = 'Transporte'
				break
			case '6': e.type = 'Prestações'
				break
			case '7': e.type = 'Outros'
				break
		}
		 line.insertCell(1).innerHTML = e.type
		 line.insertCell(2).innerHTML = e.description
		 line.insertCell(3).innerHTML = e.value

		//  Criar o botão de exclusão
		let btn = document.createElement("button")
		btn.className = 'btn btn-danger'
		btn.innerHTML = '<i class="fas fa-times"></i>'
		btn.id = `id_expense_${e.id}`
		btn.onclick = function() {
			
			let id = this.id.replace('id_expense_', '')
			
			// alert(id)

			bd.remover(this.id)

			window.location.reload()
		}
		line.insertCell(4).append(btn)

		console.log(e)
	})
}

function searchExpense() {
	let year = document.getElementById('year').value
	let month = document.getElementById('month').value
	let day = document.getElementById('day').value
	let type = document.getElementById('type').value
	let description = document.getElementById('description').value
	let value = document.getElementById('value').value

	let expense = new Expense(year, month, day, type, description, value)

	let expenses = 	bd.search(expense)

	
	loadListExpense(expenses, true)

}