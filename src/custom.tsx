import { useEffect, useState } from "react"

type Test = {
  but: number
  ad: string
  h: string
  fal: boolean
}

type MyPick<T, O extends keyof T> = {
  [K in keyof T as K extends O ? K : never]: T[K]
}
type MyPickAlternate<T, K extends keyof T> = {
  [P in K]: T[P]
}
type NNN = MyPickAlternate<Test, "ad" | "fal">

type N<T> = {
  [K in keyof T as T[K] extends string ? string : never]: T[K]
}
type R<T> = {
  [K in keyof T]?: T[K]
}

type My = N<Test>

const gg: NNN = {
  ad: "dsfdf",
  fal: true,
}

export const Test = () => {
  console.log("app render")
  const [a, setA] = useState(false)
  const sum = () => {
    return 2 + 3 + Math.random()
  }
  useEffect(() => {
    console.log("useefect in app render")
    return () => console.log("app cleanup")
  }, [a])
  return (
    <>
      {a}
      <button onClick={() => setA(!a)}>SetA</button>
      <Child a={sum} />
    </>
  )
}
const Child = ({ a }: any) => {
  console.log("CHILD RENDER")
  const [newval, setnewVal] = useState(1)
  const c = () => {
    const n = a()
    setnewVal(n)
  }

  useEffect(() => {
    console.log("child render in useeffect")
    return () => console.log("child cleanup")
  }, [newval])
  return (
    <>
      Child
      {newval}:bbb
      <button onClick={c}>SetB</button>
    </>
  )
}
