function registerExpense() {
    
    // Recuperando os valores do campo
    let year = document.getElementById('year')
    let month = document.getElementById('month')
    let day = document.getElementById('day')
    let type = document.getElementById('type')
    let description = document.getElementById('description')
    let value = document.getElementById('value')

    console.log(year.value, month.value, day.value, type.value, description.value, value.value)

}