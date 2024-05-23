// Action Types
export const Types = {
    SET_DATE_RANGE: 'controls/SET_DATE_RANGE',
}

// Action creators
export const setDateRange = (startDate, endDate) => ({
    type: Types.SET_DATE_RANGE,
    payload: {
        startDate: startDate,
        endDate: endDate,
    }
})

// Selectors
export const selectDateRange = (state) => ({
    startDate: state.controls.startDate,
    endDate: state.controls.endDate,
})

// Reducer
const initialState = {
    startDate: Date.parse('2000-01-01 00:01'),
    endDate: Date.now(),
}

export default (state = initialState, action) => {
    switch(action.type) {
        case Types.SET_DATE_RANGE:
            return {
                ...state,
                startDate: action.payload.startDate,
                endDate: action.payload.endDate,
            }
        default:
            return state;
    }
}
