import { create, StoreApi } from 'zustand'
import { QuakeFetcher } from '../../api/quakeFetcher';
import { Quake } from '../../model/quake';
import { TimeRange } from '@/model/timeRange';

//////// types

export interface QuakesState {
    quakes: Quake[],
    timeRange: TimeRange,
    visibleTimeRange: TimeRange,

    setTimeRange: SetTimeRange,
    setVisibleTimeRange: SetVisibleTimeRange,
    fetchInitialQuakes: () => void,
}

type SetState = StoreApi<QuakesState>['setState']

type SetTimeRange = (min: number, max: number) => void 
type SetVisibleTimeRange = (min: number, max: number) => void

//////// store

export const useQuakes = create<QuakesState>((set, state) => {
    const oneMonthAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).getTime()

    return ({
        quakes: [],
        timeRange: {
            min: oneMonthAgo,
            max: Date.now(),
         },
        visibleTimeRange: { 
            min: oneMonthAgo, 
            max: Date.now(),
         },

        setTimeRange: create_setTimeRange(set, state),
        setVisibleTimeRange: create_setVisibleTimeRange(set),
        fetchInitialQuakes: () => {
            // min is after max because if we get unlucky and the 
            // now() ms changes between the two calls this will
            // create only one request (range inside req_max_time)
            const max = Date.now()
            const min = Date.now() - 3*QuakeFetcher.req_max_time

            state().setTimeRange(min, max)
        },
    })
})


//////// store setters

function create_setTimeRange(set: SetState, state: () => QuakesState): SetTimeRange {
    return async (min, max) => {
        try {
            const currentTime = {
                min: state().quakes.at(0)?.time ?? Date.now(),
                max: state().quakes.at(-1)?.time ?? Date.now()
            }

            const requests = QuakeFetcher.createRequests(currentTime, { min, max })

            requests.forEach(async (r) => {
                const quakes = await QuakeFetcher.fetchQuakes(r)

                if(r.placement === 'after') {
                    const timeRange = {
                        min: currentTime.min, 
                        max: r.timeRange.max, 
                    }

                    set({
                        quakes: [...state().quakes, ...quakes],
                        timeRange,
                        visibleTimeRange: timeRange,
                    })
                }

                if(r.placement === 'before') {
                    const timeRange = {
                        min: r.timeRange.min,
                        max: currentTime.max, 
                    }

                    set({
                        quakes: [...quakes, ...state().quakes],
                        timeRange,
                        visibleTimeRange: timeRange,
                    })
                }
            })
        } finally {
            // guarantee quakes array order
            set(state => {
                state.quakes.sort(q => -q.time)  // sort in place
                
                return {
                    quakes: [...state.quakes]   // notify store by creating a copy
                    
                }
            })
        }
    }
}

function create_setVisibleTimeRange(set: SetState): SetVisibleTimeRange {
    return (min, max) => {
        set({ visibleTimeRange: { min, max } })
    }
}
