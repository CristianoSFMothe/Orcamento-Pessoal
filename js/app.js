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

    console.log(expense)

}