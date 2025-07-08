import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../app/store.ts"

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
