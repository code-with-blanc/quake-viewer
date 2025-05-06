import { create } from "zustand";

export interface TimelineState {
    minRangeDate: Date
    maxRangeDate: Date
    startDate: Date
    endDate: Date

    setMinRangeDate: (date: Date) => void
    setMaxRangeDate: (date: Date) => void
    setSelectedDateRange: (startDate: Date, endDate: Date) => void
}

export const useTimelineStore = create<TimelineState>((set) => ({
    minRangeDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    maxRangeDate: new Date(),
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    endDate: new Date(),

    setMinRangeDate: (date: Date) => {
        set((state) => ({ ...state, minRangeDate: date }))
    },
    setMaxRangeDate: (date: Date) => {
        set((state) => ({ ...state, maxRangeDate: date }))
    },
    setSelectedDateRange: (startDate: Date, endDate: Date) => {
        set((state) => ({ ...state, startDate, endDate }))
    },
}));
