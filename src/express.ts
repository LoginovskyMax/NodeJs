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

interface IStudent {
  id: number,
  name: string,
  gender: string,
  physics: number,
  maths: number,
  english: number
}



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
     const students:IStudent[] = await getStudents()
    res.json(students)
   })
  .post(async(req, res) => {
    // получаем всех студентов из файла
    const students:IStudent[] = await getStudents()
    req.body.id = Date.now()
    students.push(req.body)
    // записываем новый список студентов в файл
    await setStudents(students)
    res.sendStatus(201)
  })
  .put(async (req, res) => {
       // получаем всех студентов из файла
       const students:IStudent[] = await getStudents()
       let changedStudentIndex = students.findIndex(student => student.id === req.body.id)
       students.splice(changedStudentIndex, 1, req.body)
      //  записываем новый список студентов в файл
       await setStudents(students)
       res.sendStatus(201)
  })

app.delete('/students/:id', async (req, res) => {
        // получаем всех студентов из файла
        console.log(req.params.id);
        let students:IStudent[] = await getStudents()
        console.log(students);
        students = students.filter(student => student.id !== +req.params.id)
        // записываем новый список студентов в файл
        await setStudents(students)
        res.sendStatus(200)
})


app.listen(port, () => {
    console.log(`Server work on port ${port}`);
})