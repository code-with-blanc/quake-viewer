
export const selectQuakesForRendering = (quakes) => {
    return quakes.map((q) => prepareQuakeForRender(q))
}

const prepareQuakeForRender = (quake) => {
    return ({
        id: quake.id,
        time: quake.time,
        pos_x: (quake.longitude),
        pos_z: -(quake.latitude),
        pos_y: - quake.depth/10,
        radius: (2**(quake.magnitude-3))/100,
        magnitude: quake.magnitude,
    })
}
