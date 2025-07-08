// export function spliText(sensetce:string){
//     return sensetce.split(' ').filter((i)=>i!=='')
//         .map(w=>w.replace('!',''))
// }
export type cityType = {
  title: string
  country: string
  houses?: []
  governmentBuildings?: []
  citizensNumber?: number
}
type adressType = {
  cityAdress: string
  city: cityType
}
type itemType = {
  id: number
  title: string
}
export type studentType = {
  name: string
  age: number
  isActive: boolean
  adress: adressType
  tech: Array<itemType>
}

export const student: studentType = {
  name: "Igor",
  age: 35,
  isActive: true,
  adress: {
    cityAdress: "surganova",
    city: {
      title: "minsk",
      country: "belarus",
    },
  },
  tech: [
    {
      id: 1,
      title: "html",
    },
    {
      id: 2,
      title: "css",
    },
  ],
}
