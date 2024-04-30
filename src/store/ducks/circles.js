// Action Types

export const Types = {
    SET_CIRCLES: 'SET_CIRCLES',
    SET_RADIUS: 'SET_RADIUS',
};

// Reducer

const initialState = {
    circles: 3,
    radius: 20,
}

export default (state = initialState, action) => {
    switch(action.type) {
        case Types.SET_CIRCLES:
            return {
                ...state,
                circles: action.payload
            };
        case Types.SET_RADIUS:
            return {
                ...state,
                radius: action.payload
            };
        default:
            return state;
    }
}

// Action creators

export const setCircles = (num_circles = 0) => {
    return {
        type: Types.SET_CIRCLES,
        payload: num_circles,
    }
};

export const setRadius = (radius = 0) => {
    return {
        type: Types.SET_RADIUS,
        payload: radius,
    }
}
