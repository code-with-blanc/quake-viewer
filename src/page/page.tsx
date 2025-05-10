import SidePaneLayout from "@/ui/layout/sidePane/sidePane"
import OverLayLayout from "@/ui/layout/overlay/overlay"
import SceneOverlay from "./scene-overlay"
import Scene from "@/3d"
import QuakeList from "./quakeList"

export const Page = () => {
    return (
        <SidePaneLayout
            sidePaneContent={
                <QuakeList />
            }
            mainContent={
                <OverLayLayout
                    baseContent={<Scene />}
                    overlayContent={<SceneOverlay />}
                />
            }
        />
    )
}
