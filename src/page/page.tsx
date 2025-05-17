import SidePaneLayout from "@/ui/layout/sidePane/sidePane"
import OverLayLayout from "@/ui/layout/overlay/overlay"
import SceneOverlay from "./scene-overlay"
import Scene from "@/3d"
import QuakeList from "./quakeList"
import { Sidebar } from "@/ui/layout/sidebar/sidebar"

export const Page = () => {
    return (
        <Sidebar minWidthPx={200}>
            <Sidebar.Content>
                <div style={{ border: 'solid blue 1px', height: '100%' }}>Content!</div>
            </Sidebar.Content>
        </Sidebar>
        // <SidePaneLayout
        //     sidePaneContent={
        //         <div>quakes</div>
        //         // <QuakeList />
        //     }
        //     mainContent={
        //         <div>ue</div>
        //         // <OverLayLayout
        //         //     baseContent={<Scene />}
        //         //     overlayContent={<SceneOverlay />}
        //         // />
        //     }
        // />
    )
}
