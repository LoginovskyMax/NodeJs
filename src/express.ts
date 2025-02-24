import express from 'express'
const app = express()
import fs from 'node:fs/promises'
import path from 'node:path'
const port = 3003
// обрабатыавет боди
const bodyJsonMiddleWare = express.json()
const staticMid = express.static('./pages')
app.use(bodyJsonMiddleWare)
app.use(staticMid)



app.get('/',async (req, res) => {
  res.sendFile('./home.html', {root: './pages' });
})

function getPath(file:string){
  const pathToFile = path.join(__dirname, file)
  return pathToFile
}

async function getStudents(){
  const jsonFile = await fs.readFile(getPath('db.json'), 'utf8')
  return JSON.parse(jsonFile)
}

async function setStudents(file:Object[]){
  const jsonFile = await fs.writeFile(getPath('db.json'),JSON.stringify(file), 'utf8')
}

app.route('/students')
  .get(async (req, res) => {
     const students = await getStudents()
    res.json(students)
   })
  .post(async(req, res) => {
    // получаем всех студентов из файла
    const students = await getStudents()
    req.body.id = Date.now()
    students.push(req.body)
    // записываем новый список студентов в файл
    await setStudents(students)
    res.sendStatus(201)
  })
  .put((req, res) => {
    res.json('Update the book')
  })


app.get('/users/:id', (req, res) => {
    // const user = db.users.find(user => user.id === +req.params.id)
    // if(!user){
    //   res.sendStatus(404)
    //   return
    // }
    //   res.json(user)
})


app.listen(port, () => {
    console.log(`Server work on port ${port}`);
})