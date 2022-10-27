import { useState } from 'react';
import Building from "./Buildings";
import Floor from "./Floors";
const Format = (props) => {
    const [floor, setFloor] = useState("")

    const handleFloorCallback = (floorData) => {
        setFloor(floorData)
    }

    return(
        <>
        <Building setFloorActive = {handleFloorCallback}/>
        {
            (floor !== "") ?
            <Floor value = {floor}/> :
            <></>
        }
        
        </>
    );

}

export default Format