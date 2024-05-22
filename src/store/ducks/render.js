// Action Types
export const Types = {
    SET_QUAKES: 'SET_QUAKES',
};

// Action creators
export const setQuakes = (quakes = []) => {
    return {
        type: Types.SET_QUAKES,
        payload: quakes,
    }
};

// Reducer
const initialState = {
    quakes: [],
}

export default (state = initialState, action) => {
    switch(action.type) {
        case Types.SET_QUAKES:
            const quakes = action.payload || []
            return {
                ...state,
                quakes: quakes.map((q) => prepareQuakeForRender(q)),
            };
        default:
            return state;
    }
}

const prepareQuakeForRender = (quake) => {
    return ({
        pos_x: (quake.latitude - 62) * 50,
        pos_z: (quake.longitude + 11) * 50,
        pos_y: - quake.depth * 10,
        radius: ((quake.magnitude+1)**1.5),
        magnitude: quake.magnitude,
    })
}
