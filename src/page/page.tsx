import Scene from "@/3d"
import QuakeList from "./quakeList"
import { Sidebar, SIDEBAR_HANDLE_W_PX } from "@/ui/layout/sidebar/sidebar"
import { useState } from "react"
import { useThrottle, useWindowSize } from "@uidotdev/usehooks"

import './page.scss'
import { Drawer } from "@/ui/layout/drawer/drawer"

export const Page = () => {
    const [sidebarWidth, setSidebarWidth] = useState(200)
    const throttledSidebarWidth = useThrottle(sidebarWidth, 100)
    const { width: innerWidth } = useWindowSize()
    const mobile = innerWidth === null || innerWidth < 768

    return (
        <div className="page">
            <div
                className="page__scene"
                style={{ 
                    left: mobile ? 0 : throttledSidebarWidth-SIDEBAR_HANDLE_W_PX,
                }}
            >
                <Scene />
            </div>
            {
                mobile ? (
                    <Drawer>
                        <QuakeList />
                    </Drawer>
                ) : (
                    <Sidebar
                        className="page__sidebar"
                        minWidthPx={200}
                        onResize={(w) => setSidebarWidth(w)}
                    >
                        <Sidebar.Content>
                            <QuakeList />
                        </Sidebar.Content>
                    </Sidebar>
                )

            }


        </div>
    )
}
