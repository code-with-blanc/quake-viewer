import { create } from 'zustand'
import { fetchQuakes } from '../../api/fetchQuakes';
import { Quake } from '../../model/quake';
import { TimelineState, useTimelineStore } from '../timeline/timeline';

interface QuakeState {
    state: 'LOADING' | 'LOADED' | 'ERROR';
    quakes: Quake[];
}

// TODO: actually split timeline store in a range-only slice
let lastMinTime : null | number = null
let lastMaxTime : null | number = null

async function onTimelineChanged(set, timelineState: TimelineState) {
    const { minRangeDate: min, maxRangeDate: max } = timelineState;
    
    if(min.getTime() === lastMinTime && max.getTime() === lastMaxTime) {
        return
    }
    lastMinTime = min.getTime()
    lastMaxTime = max.getTime()

    try {
        set({ state: 'LOADING' });

        const quakes = await fetchQuakes(min, max);
        
        set({ quakes, state: 'LOADED' });
    } catch {
        set({ state: 'ERROR' });
    }
}

export const useQuakesStore = create<QuakeState>((set) => {
    onTimelineChanged(set, useTimelineStore.getState())
    useTimelineStore.subscribe((timelineState) => {
        onTimelineChanged(set, timelineState)
    })

    return ({
        state: 'LOADING',
        quakes: [],
    })
})

