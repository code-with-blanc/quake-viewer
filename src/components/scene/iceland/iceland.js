import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchIcelandCoordinates } from '../../../store/render/render'
import { Path } from 'three'


export default function Iceland() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchIcelandCoordinates())
    }, [dispatch])
    const coordinates = useSelector((state) => state.render.icelandCoordinates)

    return (
        <>{
            coordinates.map((c, i) => 
                <CoordinatesGroup key={i} coordinates={c[0]} />
            )
        }</>
    )
}

const CoordinatesGroup = ({ coordinates }) => {
    const bufferGeometryRef = useRef()

    useLayoutEffect(() => {
        const path = new Path()
        coordinates.forEach((coord, i) => {
            if(i === 0) {
                path.moveTo(coord[0], coord[1])
            } else {
                path.lineTo(coord[0], coord[1])
            }
        });
        const points = path.getPoints();    

        bufferGeometryRef?.current?.setFromPoints(points)
    }, [coordinates])

    return (
        <line rotation={[-Math.PI/2, 0, 0]}>
            <bufferGeometry attach="geometry" ref={bufferGeometryRef} />
            <lineBasicMaterial color={0xff0000} linewidth={2} />
        </line>
    )
}
