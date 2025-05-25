import { FunctionComponent, useState } from "react"
import { Drawer as Vaul } from "vaul"

import './drawer.scss'
import { DialogTitle } from "@radix-ui/react-dialog"
import { useLayout } from "@/utils/useLayout"

export const Drawer: FunctionComponent<{
    children: React.ReactNode
}> = ({ children }) => {
    const { dimensions } = useLayout()
    const snapPoints = [dimensions.drawerClosedSnap, 0.8]

    const [snap, setSnap] = useState(snapPoints[0])

    return (
        <Vaul.Root
            snapPoints={snapPoints}
            activeSnapPoint={snap}
            setActiveSnapPoint={(snap) => setSnap(snap ?? snapPoints[0])}
            open={true}
            dismissible={false}
        >
            <Vaul.Content style={{ outline: 'none', position: 'absolute', inset: 0, zIndex: 1000 }}>
                <DialogTitle style={{ display: 'none' }} >Earthquake list</DialogTitle>
                <div className="drawer">
                    <div className="drawer__handle">
                        <Vaul.Handle className="drawer__handle-vaul" />
                    </div>
                    <div className="drawer__content-container">
                        {children}
                    </div>
                </div>
            </Vaul.Content>
        </Vaul.Root>
    )
}
