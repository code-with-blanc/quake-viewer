// Action Types
export const Types = {
    SET_NUM_QUAKES: 'SET_NUM_QUAKES',
};


// Action creators

export const setNumQuakes = (num_quakes = 1) => {
    return {
        type: Types.SET_NUM_QUAKES,
        payload: num_quakes,
    }
};


// Reducer
const initialState = {
    num_quakes: 100,
    quakes: [],
}

export default (state = initialState, action) => {
    switch(action.type) {
        case Types.SET_NUM_QUAKES:
            return {
                ...state,
                num_quakes: action.payload,
                quakes: Array.from(
                    { length: action.payload },
                    () => (generateQuake())
                ),
            };
        default:
            return state;
    }
}

const generateQuake = () => ({
    pos_x: Math.random() * 500,
    pos_z: Math.random() * 500,
    depth: Math.random() * 10,
    magnitude: generateMagnitude(),
    date: generateDate(),
})

const generateMagnitude = () => {
    const mag_selector = Math.random();
    let mag_integer = 0;
    if (mag_selector < 0.5) {
        mag_integer = 0;
    } else if (mag_selector < 0.7) {
        mag_integer = 1;
    } else if (mag_selector < 0.8) {
        mag_integer = 2;
    } else if (mag_selector < 0.9) {
        mag_integer = 3;
    } else {
        mag_integer = 4;
    }

    const mag_decimal = (Math.random() * 100) % 100;
    return mag_integer + mag_decimal/100;
}

const generateDate = () => {
    const startDate = new Date('1980-01-01');
    const endDate = new Date();
    const startTime = startDate.getTime();
    const endTime = endDate.getTime();
    const date = new Date(startTime + Math.random() * (endTime - startTime));
    return date.toISOString();
}
