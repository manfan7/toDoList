import { useSelector } from "react-redux"
import type { RootState } from "../../app/store.ts"

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppSelector = useSelector.withTypes<RootState>()
