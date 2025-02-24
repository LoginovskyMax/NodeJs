import express from 'express'
import {Request, Response} from 'express'
const app = express()
const port = 3003
// обрабатыавет боди
const bodyJsonMiddleWare = express.json()
const staticMid = express.static('./pages')
app.use(bodyJsonMiddleWare)
app.use(staticMid)
app.use((req, res, next) => {
  console.log('middleware work');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
})

const users = [
  {id:0, name: 'Max'},
  {id:1, name: 'Alice'}
]
const cours = [
  {id:0, name: 'front-end'},
  {id:1, name: 'back-end'},
  {id:1, name: 'devops'}
]
const db = {
  users: users,
  cours: cours
}

app.get('/',(req, res) => {
  console.log('hi');
  res.sendFile('./home.html', {root: './pages' });
})

// app.get('/',(req, res) => {
//   console.log('hi');
//   res.sendFile('./home.html', {root: './pages' });
// })


app.get('/cours', (req:Request<{title:string}>, res) => {
  let filtered = db.cours
  if(req.query.title) {
    filtered = filtered.filter(cours => cours.name.indexOf(req.query.title as string) > -1)
  }
    res.json(filtered)
  }) 

app.post('/cours', (req, res:Response<{id: number, name:string}[]>) => {
  const cours = {
    id: Date.now(),
    ...req.body
  }
    db.cours.push(cours)
    res
    .status(201)
    .json(db.cours)
  })
app.delete('/cours/:id', (req, res) => {
    db.cours = db.cours.filter(user => user.id !== +req.params.id)
    res
    .json(db.cours)
})

app.put('/cours/:id', (req, res) => {
  const user = db.users.find(user => user.id === +req.params.id)
  if(!user){
    res.sendStatus(404)
    return
  }
  user.name = req.body.name
  res
  .status(204)
  .json(user)
}) 

app.route('/users')
  .get((req, res) => {
    throw new Error('error inn users')
    res.json(db.users)
  })
  .post((req, res) => {
    res.json('Add a userr')
  })
  .put((req, res) => {
    res.json('Update the book')
  })


app.get('/users/:id', (req:Request<{ id: string }>, res) => {
    const user = db.users.find(user => user.id === +req.params.id)
    if(!user){
      res.sendStatus(404)
      return
    }
      res.json(user)
})

// Middleware для обработки ошибок (должно быть последним)
app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack); // Логируем ошибку
  res.status(500).send('Something broke!'); // Отправляем ответ с кодом 500
  });

app.listen(port, () => {
    console.log(`Server work on port ${port}`);
})