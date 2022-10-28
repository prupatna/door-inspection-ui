import { useState } from 'react';
import Building from "./Buildings";
import Floor from "./Floors";
import Door from './Door';
const Format = (props) => {
    const [floor, setFloor] = useState("")
    const [door,setDoor] = useState("")

    const handleFloorCallback = (floorData) => {
        setFloor(floorData)
    }
    const handleDoorCallback = (doorData) =>{
        setDoor(doorData)
    }

    return(
        <>
        <Building setFloorActive = {handleFloorCallback}/>
        {
            (floor !== "") ?
            <Floor value = {floor} setDoorActive = {handleDoorCallback}/> :
            <></>
        }
        {
            
            (door !== "") ? 
            <Door building_value = {floor} floor_value = {door}/> :
            <></>

        }
        
        </>
    );

}

export default Format