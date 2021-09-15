//build a calculator to calculate spending

//declare variables with name of id attribute
//targeting these elements by their ids
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

//example of how the data is stored
//const dummyData = [
    // { id: 1, text: 'gas', amount: -25 },
    // { id: 2, text: 'salary', amount: 18.99 },
    // { id: 3, text: 'JavaScript Book', amount: -74 }
    // { id: 4, text: 'car', amount: 2625 }

    //]

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [] 

//Add transactions function that targets the event
// e shows there is an event happening
function addTransaction(e) {
    e.preventDefault();
    //first if statement is a checkpoint
    // add error message if no text or amount is entered in calculator and stops the code running
    //adds break point in code
    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text and amount')
    } else {
        //take value entered in app and store it in the object called transaction
        const transaction = {
            //generateId creates a unique id for this field
            id: generateId(),
            text: text.value,
            //unless a - is added to the input count the amount as a positive
            amount: +amount.value,
        }
        //console.log(transaction);
        //push the data entered into an array called transactions
        transactions.push(transaction);

        addTransactionList(transaction);

        updateValues()

        updateLocalStorage();
        //returns the values to empty after transactions button is typed.
        text.value = ''
        amount.value = ''
    }
}

//function to generate random id number for each entry in calculator 
function generateId() {
    return Math.floor(Math.random() * 10000000)
}

//Add transaction to the history list 
function addTransactionList(transaction) {
    //get sign = if is less than zero it should have a - entered in front of the amount entered otherwise treat it as a positive
    const sign = transaction.amount < 0 ? '-' : '+' //checking the value of the amount
    const item = document.createElement('li');

    //add class based on value of the amount to give style
    //assign class of minus or plus to item so that styles in css are applied to it
    item.classList.add(transaction.amount < 0 ? 'minus': 'plus')

    //inserts html into object that has been created
    item.innerHTML = 
    `
    ${transaction.text} <span>${sign}$ {Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeItem(${transaction.id}">x</button>
    ` //Math.abs is to get rid of the minus sign in the amount property
    
    list.appendChild(item)

    //update the total card
    function update() {
        const amount = transactions.map(transaction => transaction.amount)

        const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)

        const income = amounts
        //filter 
        .filter(item => item > 0)
        //.reduce returns the sum of all elements in an array = automatically adds positive items together
        //add the totals to card
        .reduce((acc, item) => (acc += item), 0).toFixed(2)

        const expense = amounts
        .filter(item => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1 .toFixed(2)

        balance.innerHTML = `$${total}`
        money_plus.innerHTML = `$${income}`
        money_minus.innerHTML = `$${expense}`
    }
}

//remove item by ids
//id parameter comes from object for transactions
function removeItem(id) {
    //.filter() method creates a new array with all elements that pass the test implemented by the provided function.
    // delete if not equal to the id
    transactions = transactions.filter(transaction => transaction.id !== id);
    //function updateLocalStorage()
    updateLocalStorage();
    //initiate a clean record
    init()
}

function updateLocalStorage() {
    //JSON.stringify method takes a value and a key(which is a string) and creates a json file
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

//int app
function init() {
    //empties the list
    list.innerHTML = ''

    //go through list and update list
    transactions.forEach(addTransactionList) //looping through the array and a
    //updates any changes in history list
    updateValues() //calling the amounts array
}

init()

//add a transaction
form.addEventListener('submit', addTransaction)
