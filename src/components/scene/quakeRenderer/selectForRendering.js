
export const selectQuakesForRendering = (quakes) => {
    return quakes.map((q) => prepareQuakeForRender(q))
}

const prepareQuakeForRender = (quake) => {
    return ({
        id: quake.id,
        time: quake.time,
        pos_x: (quake.latitude - 62) * 50,
        pos_z: (quake.longitude + 11) * 50,
        pos_y: - quake.depth * 10,
        radius: (2**(quake.magnitude-3)),
        magnitude: quake.magnitude,
    })
}
