import { useWindowSize } from "@uidotdev/usehooks"
import { useMemo } from "react"

export function useLayout() {
    const { width: innerWidth } = useWindowSize()

    const { dimensions, mobile } = useMemo(() => {
        const mobile = innerWidth === null || innerWidth < 768
        const sidebarInitialW = Math.min((innerWidth ?? 9999)*0.3, 400)
        
        return {
            mobile,
            dimensions: {
                drawerClosedSnap: '60px',
                sidebarInitialW,
            }
        }
    }, [innerWidth])

    return {
        mobile,
        dimensions
    }
}