import { QuakeFetcher, QuakeRequestSpec } from "./quakeFetcher"

it('into the future, < 1mo', () => {
    const current = {
        min: reqWindowToMs(-1),
        max: reqWindowToMs(0),
    }

    const requested = {
        min: reqWindowToMs(-1),
        max: reqWindowToMs(0.5),
    }

    const requests = QuakeFetcher.createRequests(current, requested)
                                 .map(r => mapRequestTimesToTimeWindow(r))

    expect(requests.length).toBe(1)
    expect(requests[0].timeRange.min).toBe(0)
    expect(requests[0].timeRange.max).toBe(0.5)
})

it('into the future, > 1mo', () => {
    const current = {
        min: reqWindowToMs(-1),
        max: reqWindowToMs(0),
    }

    const requested = {
        min: reqWindowToMs(-1),
        max: reqWindowToMs(1.5),
    }

    const requests = QuakeFetcher.createRequests(current, requested)
                                 .map(r => mapRequestTimesToTimeWindow(r))

    expect(requests.length).toBe(2)
    expect(requests[0].timeRange.min).toBe(0)
    expect(requests[0].timeRange.max).toBe(1)
    expect(requests[1].timeRange.min).toBe(1)
    expect(requests[1].timeRange.max).toBe(1.5)
})

it('into the future, exactly 2 time windows', () => {
    const current = {
        min: reqWindowToMs(-1),
        max: reqWindowToMs(0),
    }

    const requested = {
        min: reqWindowToMs(-1),
        max: reqWindowToMs(2),
    }

    const requests = QuakeFetcher.createRequests(current, requested)
                                 .map(r => mapRequestTimesToTimeWindow(r))

    expect(requests.length).toBe(2)
    expect(requests[0].timeRange.min).toBe(0)
    expect(requests[0].timeRange.max).toBe(1)
    expect(requests[1].timeRange.min).toBe(1)
    expect(requests[1].timeRange.max).toBe(2)
})

it('into the past, < 1mo', () => {
    const current = {
        min: reqWindowToMs(-1),
        max: reqWindowToMs(0),
    }

    const requested = {
        min: reqWindowToMs(-1.5),
        max: reqWindowToMs(0),
    }

    const requests = QuakeFetcher.createRequests(current, requested)
                                 .map(r => mapRequestTimesToTimeWindow(r))

    expect(requests.length).toBe(1)
    expect(requests[0].timeRange.min).toBe(-1.5)
    expect(requests[0].timeRange.max).toBe(-1)
})

it('into the past, > 1mo', () => {
    const current = {
        min: reqWindowToMs(-1),
        max: reqWindowToMs(0),
    }

    const requested = {
        min: reqWindowToMs(-2.5),
        max: reqWindowToMs(0),
    }

    const requests = QuakeFetcher.createRequests(current, requested)
                                 .map(r => mapRequestTimesToTimeWindow(r))

    expect(requests.length).toBe(2)
    expect(requests[0].timeRange.min).toBe(-2)
    expect(requests[0].timeRange.max).toBe(-1)
    expect(requests[1].timeRange.min).toBe(-2.5)
    expect(requests[1].timeRange.max).toBe(-2)
})

it('into the past, exactly 2 time windows', () => {
    const current = {
        min: reqWindowToMs(-1),
        max: reqWindowToMs(0),
    }

    const requested = {
        min: reqWindowToMs(-3),
        max: reqWindowToMs(0),
    }

    const requests = QuakeFetcher.createRequests(current, requested)
                                 .map(r => mapRequestTimesToTimeWindow(r))

    expect(requests.length).toBe(2)
    expect(requests[0].timeRange.min).toBe(-2)
    expect(requests[0].timeRange.max).toBe(-1)
    expect(requests[1].timeRange.min).toBe(-3)
    expect(requests[1].timeRange.max).toBe(-2)
})


//////////////////////

const now = (new Date('2025-06-10')).getTime()

const reqWindowToMs = (timeWindowsFromNow: number) => {
    const timeOffset = timeWindowsFromNow * QuakeFetcher.req_max_time
    return (now + timeOffset)
}

const mapRequestTimesToTimeWindow = (r: QuakeRequestSpec): QuakeRequestSpec => ({
    ...r,
    timeRange: {
        min: (r.timeRange.min - now)/QuakeFetcher.req_max_time,
        max: (r.timeRange.max - now)/QuakeFetcher.req_max_time 
    }
})