console.log('Client side JS')

// fetch('http://localhost:3000/weather?address=').then((res) => {
//     res.json().then((data)=>{
//         console.log(data)
//     })
// })

const weatherFrom = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')


weatherFrom.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value
    fetch('/weather?address='+location).then((res) => {
    res.json().then((data)=>{
        if(data.error){
            messageTwo.textContent = data.error
        }else{
            messageOne.textContent = data.forecast
            messageTwo.textContent =  'In '+ data.location + ' it is ' + data.temperature
        }
        
    })
})
    
})

