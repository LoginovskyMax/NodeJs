const addBtn = document.querySelector('#add')
const table = document.querySelector('#table')
const modal = document.querySelector('#modal')
// кнопки в модалке
const closeBtn = document.querySelector('#modalClose')
const createBtn = document.querySelector('#create')


function getData(){
    fetch('http://localhost:3003/students', {method: 'GET'})
     .then((data) => data.json())
     .then((data) => {
        console.log(data);
        drawPage(data)
     })
}

function drawPage(arr){
   arr.forEach(student => {
      const div = document.createElement('div')
      div.classList.add('table__item')
      const name = document.createElement('p')
      name.textContent = student.name
      const gender = document.createElement('p')
      gender.textContent = student.gender
      const maths = document.createElement('p')
      maths.textContent = student.maths
      const physics = document.createElement('p')
      physics.textContent = student.physics
      const english = document.createElement('p')
      english.textContent = student.english
      const button = document.createElement('button')
      button.textContent = 'Изменить'
      div.append(name, gender, english, maths, physics,button)
      table.append(div)
   });
}

getData()

let showModal = false

addBtn.addEventListener('click', () => {
    showModal = true
    if(showModal){
       modal.style.display = 'flex'
    }else {
       modal.style.display = 'none'
    }
})

closeBtn.addEventListener('click', () => {
    showModal = false
    modal.style.display = 'none'
})

// инпуты формы
const nameInp = document.querySelector('#name')
const genderInp = document.querySelector('#gender')
const englishInp = document.querySelector('#english')
const physicsInp = document.querySelector('#physics')
const mathInp = document.querySelector('#math')

createBtn.addEventListener('click', () => {
   const payload = {}
   payload.name = nameInp.value
   payload.gender = genderInp.value
   payload.maths = englishInp.value
   payload.physics = physicsInp.value
   payload.english = mathInp.value

   if(Object.values(payload).some(val => !val)){
    console.log('Заполните все поля');
    return
   }
   addStudent(payload)
})
function addStudent(payload) {

    fetch('http://localhost:3003/students', {
    method: 'POST',
    headers: {
       'content-type': 'application/json'
    },
    body: JSON.stringify(payload)
})
    .then((data) => {
        console.log(data);
        if(data.ok){
            console.log('Успешно создан');
        }
    })
    .then((data) => {
       data = 'success'
    })
}

