const addBtn = document.querySelector('#add')
const table = document.querySelector('#table')
const modal = document.querySelector('#modal')
// кнопки в модалке
const closeBtn = document.querySelector('#modalClose')


let redactingMode = false
let currentId = 0


function getData(){
    fetch('http://localhost:3003/students', {method: 'GET'})
     .then((data) => data.json())
     .then((data) => {
        drawPage(data)
     })
}

function clearTable(){
   table.innerHTML = ''
}

function createDiv(tag, className, text){
   const div = document.createElement(tag)
   if(className){
      div.classList.add(className)
   }
   div.textContent = text
   return div
}

function drawPage(arr){
   arr.forEach(student => {
      const div = createDiv('div','table__item' )

      const name = createDiv('p', '', student.name )

      const gender = createDiv('p', '', student.gender)
      const maths = createDiv('p', '', student.maths )

      const english = createDiv('p', '', student.english )
      const physics = createDiv('p', '', student.physics )

      const button = createDiv('button', '','Удалить' )
  
      button.addEventListener('click', ()=> {
         actionsWithStudents(student.id, "DELETE")
      })

      const button2 = createDiv('button', '','Изменить' )
      button2.addEventListener('click', ()=> {
         openModalToRedactStudent(student)
      })

      div.append(name, gender, english, maths, physics,button, button2)
      table.append(div)
   });
}

getData()

// инпуты формы
const nameInp = document.querySelector('#name')
const genderInp = document.querySelector('#gender')
const englishInp = document.querySelector('#english')
const physicsInp = document.querySelector('#physics')
const mathInp = document.querySelector('#math')
const modalTitle = document.querySelector('#modalTitle')
const createBtn = document.querySelector('#create')


addBtn.addEventListener('click', () => {
   openModal()
   redactingMode = false
   createBtn.textContent = 'Создать'
   modalTitle.textContent = 'Создиние нового студента'
})

function closeModal(){
       modal.style.display = 'none'
}
function openModal(){
   modal.style.display = 'flex'
}

closeBtn.addEventListener('click', () => {
    closeModal()
})

createBtn.addEventListener('click', () => {
      checkData()
})

function openModalToRedactStudent(student){
   redactingMode = true
   createBtn.textContent = 'Изменить'
   modalTitle.textContent = 'Изменение студента'
   currentId = student.id
   nameInp.value= student.name 
   genderInp.value= student.gender 
   mathInp.value= student.maths 
   physicsInp.value= student.physics 
   englishInp.value= student.english 
   openModal()
}

function checkData(){
   const payload = {}
   payload.name = nameInp.value
   payload.gender = genderInp.value
   payload.maths = englishInp.value
   payload.physics = physicsInp.value
   payload.english = mathInp.value
   if(redactingMode){
      payload.id = currentId
   }
   if(Object.values(payload).some(val => !val)){
    console.log('Заполните все поля');
    return
   }
   if(redactingMode){
      actionsWithStudents(payload, "PUT")
   }else {
      actionsWithStudents(payload, "POST")
   }

   closeModal()
}

function actionsWithStudents(payload, method){
   let path = `http://localhost:3003/students`
   if(method === 'DELETE'){
      path += `/${payload}`
   }
   fetch(path, {
      method,
      headers: {
         'content-type': 'application/json'
      },
      body:method === 'DELETE'?null : JSON.stringify(payload)
     })
      .then((data) => {
          if(data.ok){
              clearTable()
              getData()
              console.log('Успешно создан');
          }
      })
}

