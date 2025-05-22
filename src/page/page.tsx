import Scene from "@/3d"
import QuakeList from "./quakeList"
import { Sidebar, SIDEBAR_HANDLE_W_PX } from "@/ui/layout/sidebar/sidebar"
import { useState } from "react"
import { useThrottle } from "@uidotdev/usehooks"

import './page.scss'

export const Page = () => {
    const [sidebarWidth, setSidebarWidth] = useState(200)
    const throttledSidebarWidth = useThrottle(sidebarWidth, 100)

    return (
        <div className="page">
            <Sidebar
                className="page__sidebar"
                minWidthPx={200}
                onResize={(w) => setSidebarWidth(w)}
            >
                <Sidebar.Content>
                    <QuakeList />
                </Sidebar.Content>
            </Sidebar>
            <div
                className="page__scene"
                style={{ 
                    left: throttledSidebarWidth-SIDEBAR_HANDLE_W_PX,
                }}
            >
                <Scene />
            </div>       
        </div>
    )
}
