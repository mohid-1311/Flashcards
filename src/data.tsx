interface User {
  uName: string;
  pw: string;
}

let data = [
  {uName: "Mohid", passwort: "1234"},
  {uName: "Mohi", passwort: "123"},
  {uName: "Moh", passwort: "12"}
]

export function setData(dataParam: User[]){
  localStorage.setItem("loginData", JSON.stringify(dataParam))
}