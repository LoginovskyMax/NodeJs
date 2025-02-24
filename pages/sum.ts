export  function  sum(a:number,b:number){
    return a + b 
}

export  function  sumHard(a:number,b:number, c:()=>number){
    return a + b + c()
}

export  async function  sumWithFetch(a:number,b:number){
    const data = await getData()
    return a + b + data
}



export async function getData() {
    console.log('getData');
    const resp = await fetch('http//:localhost:3000')
    const data = await resp.json()
    return data
}