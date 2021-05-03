class Expense {
    constructor(year, month, day, type, description, value) {
        this.year = year
        this.month = month
        this.day = day
        this.type = type
        this.description = description
        this.value = value
    }
}

// classe responsavel por sauva as informações
class Bd {

    // Criando o ID
    constructor() {
        let id = localStorage.getItem('id')

        if(id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getNextId() {
        let nextId = localStorage.getItem('id')  
        return parseInt(nextId) + 1
    }
    

    record(e) {
        
        let id = this.getNextId()
        
        localStorage.setItem(id , JSON.stringify(e))

        localStorage.setItem('id', id)
    }

}

let bd = new Bd()

function registerExpense() {
    
    // Recuperando os valores do campo
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

    // Fazendo a presistencia dos artibutos dentro do Local Storage
    bd.record(expense)

}

