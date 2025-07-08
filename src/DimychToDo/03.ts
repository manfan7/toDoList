import { studentType } from "./01.tsx"

export const sudentSkillAdd = (student: studentType, skill: string) => {
  student.tech.push({ id: new Date().getTime(), title: skill })
}
export const doesStudentLive = (student: studentType, city: string) => {
  return student.adress.city.title.toUpperCase() === city.toUpperCase()
}
