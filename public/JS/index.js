console.log('Client side javascript file is loaded!')

let weatherForm = document.querySelector('form')
let search = document.querySelector('input')
let messageOne = document.querySelector('#msg-1')
let messageTwo = document.querySelector('#msg-2')

weatherForm.addEventListener('submit', e => {
    e.preventDefault()
    let location = search.value
    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''
    fetch(`/weather?address=${location}&units=si`).then(response => {
        response.json().then(data => {
            if (data.errors) {
                return messageOne.textContent = data.errors
            }
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        })
    })
})