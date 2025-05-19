import Scene from "@/3d"
import QuakeList from "./quakeList"
import { Sidebar, SIDEBAR_HANDLE_W_PX } from "@/ui/layout/sidebar/sidebar"

import './page.scss'
import { useState } from "react"

export const Page = () => {
    const [sidebarWidth, setSidebarWidth] = useState(200)

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
                style={{ marginLeft: sidebarWidth-SIDEBAR_HANDLE_W_PX }}
            >
                <Scene />
            </div>       
        </div>
    )
}
