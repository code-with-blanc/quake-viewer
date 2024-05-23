
export const selectQuakesForRendering = (quakes) => {
    return quakes.map((q) => prepareQuakeForRender(q))
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
