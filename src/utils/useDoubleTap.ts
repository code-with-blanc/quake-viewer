import { useGesture } from "@use-gesture/react"
import { useRef } from "react"


export function useDoubleTap(target: EventTarget, onDoubleTap: () => unknown): void {
  const TIMEOUT_MS = 300
  const ALLOW_MOUSE = false
  const tapHistory = useRef<{ time: number }[]>([{ time: 0 }, { time: TIMEOUT_MS + 1 }])

  return useGesture(
    {
      onDrag: (state) => {
        if(!state.tap) return
        if(
          !ALLOW_MOUSE
          && (state.event instanceof PointerEvent)
          && state.event?.pointerType == 'mouse'
        ) return

        // update tap history
        tapHistory.current.pop()
        tapHistory.current = [ { time: Date.now() }, ...tapHistory.current]

        // detect double tap
        const current = tapHistory.current[0]
        const last = tapHistory.current[1]
        if((current.time - last.time) < TIMEOUT_MS) {
          onDoubleTap()
        }
      },
    },
    {
      target: target,
      eventOptions: { passive: false },
      drag: {
        filterTaps: true,
        pointer: {
          touch: true,
          mouse: false,
        },
        // minimum movement needed while the pointer is down to register as a tap
        tapsThreshold: 0,
      },

    }
  )
}

