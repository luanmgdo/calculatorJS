class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear();
    }

    clear(){
        this.currentOperand  = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)

    }

    apprendNumer(number){
        if(number == '.' && this.currentOperand.includes(".")) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.currentOperand == '') return
        if(this.previousOperand != ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand.toString() + " " + operation.toString()
        this.currentOperand = ''
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const curr = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(curr)) return
        switch(this.operation){
            case '+':
                computation = prev + curr
                break
            case '-':
                computation = prev - curr
                break
            case '*':
                computation = prev * curr
                break
            case '÷':
                computation = prev / curr
                break
            default:
                return              
        }
        
        this.currentOperand = computation
        this.previousOperand = ''
        this.operation = undefined

    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand
        this.previousOperandTextElement.innerText = this.previousOperand
    }

}

const numberButtons              = document.querySelectorAll('[data-number')
const operationButtons           = document.querySelectorAll('[data-operation')
const equalsButton               = document.querySelector('[data-equals')
const allClearButton             = document.querySelector('[data-all-clear')
const deleteButton               = document.querySelector('[data-delete')
const previousOperandTextElement = document.querySelector('[data-previous-operand')
const currentOperandTextElement  = document.querySelector('[data-current-operand')


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.apprendNumer(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})