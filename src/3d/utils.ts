export const WORLD_RADIUS = 100
export const QUAKE_MAX_DEPTH_KM = 500;
export const QUAKE_LAYER_DEPTH = 10;

export const coordsToCartesian = (p) => {
    const lon = p[0] * Math.PI/180
    const lat = p[1] * Math.PI/180
    const r = p[2]

    return [
        r * Math.cos(lat) * Math.cos(lon),
        r * Math.cos(lat) * Math.sin(lon),
        r * Math.sin(lat),
    ]
}