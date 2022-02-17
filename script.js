class CalcController {

    constructor() {

        this._displayCalcEl = document.querySelector('#display')
        this._dateEl = document.querySelector('#date')
        this._timeEl = document.querySelector(' #time')
        this.locale = 'pt-BR'
        this._memory = []
        this._lastNumber = ''
        this._lastOperator = ''

        this.initialize()

    }

    initialize() {

        this.setDisplayTime()
        setInterval(() => {

            this.setDisplayTime()
        }, 1000)

        this.initButtons()

    }

    setDisplayTime() {

        this.displayDate = (new Date()).toLocaleDateString(this.locale, {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        })
        this.displayTime = (new Date()).toLocaleTimeString(this.locale)

    }

    initButtons() {

        let buttons = document.querySelectorAll('.row > button')
        buttons.forEach(btn => {

            this.addEventListenerAll(btn, 'mouseover/mousedown', e => {

                btn.style.cursor = 'pointer'

            })

            this.addEventListenerAll(btn, 'click/drag', e => {

                let textBtn = btn.innerHTML
                this.execBtn(textBtn)

            })

        })

    }

    addEventListenerAll(element, events, fn) {

        events.split('/').forEach(event => {

            element.addEventListener(event, fn, false)

        })

    }

    execBtn(value) {

        switch (value) {

            case 'CE':
                this.clearEntry()
                break
            case 'C':
                this.clearAll()
                break
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addValue(value)
                break
            case '÷':
                this.addValue('/')
                break
            case ',':
                this.addDot()
                break
            case '=':
                this.calc()
                break
            default:
                this.addValue(value)

        }

    }

    clearAll() {

        this._memory = []
        this._lastNumber = ''
        this._lastOperator = ''
        this.refreshDisplay()

    }

    clearEntry() {

        this._memory.pop()
        this.refreshDisplay()

    }

    addValue(value) {

        if (isNaN(this.getLastSlot())) {

            if (this.isOperator(value) && this.isOperator(this.getLastSlot())) {

                this.setLastSlot(value)

            } else {

                this.pushOperator(value)

            }

        } else {

            if (this.isOperator(value)) {

                this.pushOperator(value)

            } else {

                this.setLastSlot(`${this.getLastSlot()}${value}`)

            }

        }

        this.refreshDisplay()

    }

    addDot() {



    }

    calc() {

        let last
        this._lastOperator = this.getLastItem(true)

        if (this._memory.length == 0) {

            return

        } else if (this._memory.length == 1) {

            this._memory = [this.getResult(), this._lastOperator, this._lastNumber]
            console.log(this._memory)

        } else if (this._memory.length < 3) {

            this._lastNumber = this.getLastItem(false)
            this._memory.push(this._lastNumber)

        } else if (this._memory.length == 3) {

            this._lastNumber = this.getLastItem(false)

        } else if (this._memory.length > 3) {

            last = this._memory.pop()
            this._lastNumber = this.getResult()

        }

        this._memory = [this.getResult()]
        if (last) this._memory.push(last)
        this.refreshDisplay()

    }

    refreshDisplay() {

        if (this._memory.length == 0) {

            this.displayCalc = '0'
            return

        }
        this.displayCalc = this.getLastItem(false)

        console.log(this._memory)

    }

    getResult() {

        return eval(this._memory.join(''))

    }

    getLastItem(operator = true) {

        let lastItem
        for (let i = (this._memory.length - 1); i >= 0; i--) {
            if (this.isOperator(this._memory[i]) === operator) {
                lastItem = this._memory[i]
                break
            }
        }

        if (!lastItem && lastItem != 0) {
            lastItem = (operator) ? this._lastOperator : this._lastNumber
        }

        return lastItem

    }

    getLastNumber() {

        this._lastNumber = this.getLastItem(false)
        return this._lastNumber

    }

    getLastOperator() {

        this._lastOperator = this.getLastItem(true)
        return this._lastOperator

    }

    pushOperator(value) {

        this._memory.push(value)

        if (this._memory.length > 3) {

            this.calc()

        }

    }

    getLastSlot() {

        return this._memory[this._memory.length - 1]

    }

    setLastSlot(value) {

        this._memory[this._memory.length - 1] = value

    }

    isOperator(value) {

        return (['+', '-', '*', '%', '√', 'x²', '¹/x', '/', '±'].indexOf(value) > -1)

    }

    get displayCalc() {

        return this._displayCalcEl.innerHTML

    }

    set displayCalc(value) {

        this._displayCalcEl.innerHTML = value

    }

    get displayDate() {

        return this._dateEl.innerHTML

    }

    set displayDate(value) {

        this._dateEl.innerHTML = value

    }

    get displayTime() {

        return this._timeEl.innerHTML

    }

    set displayTime(value) {

        this._timeEl.innerHTML = value

    }

}