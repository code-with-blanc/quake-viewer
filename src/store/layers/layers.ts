import { create } from "zustand";
import { fetchWorld } from "../../api/fetchLayers";
import { GeoJson } from "../../model/geojson";

export interface LayersState {
    layers: Array<CountriesLayer>
    fetchLayers: () => Promise<void>
}

export interface CountriesLayer {
    layerId: 'countries',
    countries: Array<{
        geo_shape: GeoJson
    }>
}

export const useLayersStore = create<LayersState>((set) => ({
    layers: [],
    fetchLayers: async () => {
        const world = await fetchWorld()
        if(world !== null) {
            set({ layers: [world] })
        }
    }
}))
