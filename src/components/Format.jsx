import { useState } from 'react';
import Building from "./Buildings";
import Floor from "./Floors";
import Door from './Door';
import Compliance from './ComplianceId'
import DoorAstragal from './DoorAstragal';
import DoorStop from './DoorStop';
import DoorMagholder from './DoorMagHolder';
import DoorFlushbolt from './DoorFlushbolt';

const Format = (props) => {


    const [floor, setFloor] = useState("")
    const [door,setDoor] = useState("")
    const[complianceId, setcomplianceId] = useState("")
    const[attributesBool, setAttributesBool] = useState ("")
    const [attributes, setAttributes] = useState({"floor_no": 0,
    "building_id": 1,
    "door_name": 4,
    "compliance_id": 1, "fire_rating_id": 1, "category_id": 1, "frame_id": 1,
    "size": "size", "type_id": 1, "vision_lite": false, "transom_id": 1, "side_lite": false, 
    "hinge_id": 1, "sweep_id": 1, "hinge_size": "100", "continous_hinge_id": 1, "pivot_id": 1, 
    "auto_dr_btm_id": 1, "power_transfer_id": 1, "auto_operator_id":1, "closer_id" : 1,
    "lockset_id": 1, "astragal_id" : 1, "electric_lockset_id": 1, "ao_wall_plate_id" : 1,
    "coordinator_id" : 1, "cylinder_id": 1, "strike_id": 1, "flush_bolt_id": 1,
    "exit_device_id": 1, "seal_id": 1, "stop_id": 1, "threshold_id": 1,
    "mag_holder_id" : 1, "electric_exit_device": false,
    "mullion": false, "trim_id": 1, "delay_egress_id": 1})

    var newObject;

    const handleFloorCallback = (floorData) => {
        setFloor(floorData)
    }
    const handleDoorCallback = (doorData) =>{
        setDoor(doorData)
    }

    const handleAttributesCallback = (attributesData) => {        
        setAttributesBool("Hello")
        console.log (attributes)
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
            <Door building_value = {floor} floor_value = {door} setAttributesActive = {handleAttributesCallback}/> :
            <></>
        }
        {
            (attributesBool !== "")?
            //<Compliance compliance_id = {attributes["compliance_id"]} /> &&
            //<DoorAstragal astragal_id = {attributes["astragal_id"]}/>: <></>
            //<DoorStop stop_id = {attributes["stop_id"]}/>: <></>
            ///<DoorMagholder magholder_id = {attributes["mag_holder_id"]}/>: <></>
            <DoorFlushbolt flushbolt_id = {attributes["flush_bolt_id"]}/>: <></>
        }
        </>
    );

}

export default Format