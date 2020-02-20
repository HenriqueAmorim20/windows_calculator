class CalcController {

    constructor() {

        this._displayCalcEl = document.querySelector('#display')
        this._dateEl = document.querySelector('#date')
        this._timeEl = document.querySelector(' #time')
        this.locale = 'pt-BR'

        this.initialize()

    }

    initialize() {
        
        this.setDisplayTime()
        setInterval(()=>{
            
            this.setDisplayTime()
        },1000)

    }

    setDisplayTime(){

        this.displayDate = (new Date()).toLocaleDateString(this.locale, {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        })
        this.displayTime = (new Date()).toLocaleTimeString(this.locale)

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