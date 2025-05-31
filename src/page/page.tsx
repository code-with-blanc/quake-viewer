
import { useState } from "react"
import { useThrottle } from "@uidotdev/usehooks"

import { Sidebar, SIDEBAR_HANDLE_W_PX } from "@/ui/layout/sidebar/sidebar"
import { Drawer } from "@/ui/layout/drawer/drawer"
import { useLayout } from "@/utils/useLayout"
import { QuakeList } from "./quakeList/quakeList"

import { Stack } from "@/ui/layout/stack/stack"
import { Scene } from "@/3d/scene"
import { SceneOverlay } from "./sceneOverlay/sceneOverlay"

import './page.scss'

export const Page = () => {
    const { mobile, dimensions } = useLayout()

    const [_sidebarWidth, setSidebarWidth] = useState(dimensions.sidebarInitialW)
    const sidebarWidth = useThrottle(_sidebarWidth, 100)

    return (
        <div className="page">
            <div
                className="page__scene"
                style={{ 
                    left: mobile ? 0 : sidebarWidth-SIDEBAR_HANDLE_W_PX/2,
                    paddingBottom: mobile ? `calc(0.5 * ${dimensions.drawerClosedSnap})` : 0,
                }}
            >
                <Stack>
                    <Scene />
                    <SceneOverlay />
                </Stack>
            </div>
            {
                mobile ? (
                    <Drawer>
                        <QuakeList />
                    </Drawer>
                ) : (
                    <Sidebar
                        className="page__sidebar"
                        minWidthPx={300}
                        initialWidthPx={dimensions.sidebarInitialW}
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
