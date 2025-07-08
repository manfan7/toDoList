import { RootState } from "./store.ts"
import { ThemeMode } from "./app-slice.ts"
import type { RequestStatus } from "@/common/types"

export const selectThemeMode = (state: RootState): ThemeMode => state.APP.themeMode
export const selectLoadingState = (state: RootState): RequestStatus => state.APP.status
