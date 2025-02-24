fetch('http://localhost:3003/users', {method: 'GET'})
.then((data) => data.json())
.then((data) => console.log(data))

fetch('http://localhost:3003/cours', {method: 'POST', body: JSON.stringify({ name: 'Python'}), 
headers: {
    'content-type': 'application/json'
}})
.then((data) => data.json())
.then((data) => console.log(data))

fetch('http://localhost:3003/cours/0', {method: 'DELETE', 
headers: {
    'content-type': 'application/json'
}})
.then((data) => data.json())
.then((data) => console.log(data))
