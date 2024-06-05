import axios from 'axios'

const icelandGeoJsonUrl = process.env.PUBLIC_URL + '/assets/iceland.geojson'

export const doFetchIceland = async () => {
    try {
        const res = await axios.get(icelandGeoJsonUrl)
        const geoJson = await res.data
        return geoJson.features[0].geometry.coordinates
    } catch (e) {
        console.log(e)
        return []
    }
}
