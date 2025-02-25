interface User {
  uName: string;
  pw: string;
}

let data = [
  {uName: "Mohid", pw: "1234"},
  {uName: "Mohi", pw: "123"},
  {uName: "Moh", pw: "12"}
]

localStorage.setItem("loginData", JSON.stringify(data))

export function setData(dataParam: User[]){
  localStorage.setItem("loginData", JSON.stringify(dataParam))
}