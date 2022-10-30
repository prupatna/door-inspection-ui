import { useState } from 'react';
import Building from "./Buildings";
import Floor from "./Floors";
import Door from './Door';
import Compliance from './ComplianceId'
import DoorAstragal from './DoorAstragal';
import DoorStop from './DoorStop';
import DoorMagholder from './DoorMagHolder';
import DoorFlushbolt from './DoorFlushbolt';
import DoorCoordinator from './DoorCoordinator';
import DoorCloser from './DoorCloser';
import DoorCylinder from './DoorCylinder';
import DoorDelayegress from './DoorDelayEgress';
import DoorTrim from './DoorTrim';
import DoorExitdevice from './DoorExitDevice';
import DoorStrike from './DoorStrike';
import DoorElectriclockset from './DoorElectricLockSet';
import DoorLockset from './DoorLockset';
import DoorPivot from './DoorPivot';
import DoorHinge from './DoorHinge';
import DoorContinuoushinge from './DoorContinousHinge';
import DoorTransom from './DoorTransom';
import DoorType from './DoorType';
import DoorFrame from './DoorFrame';
import DoorFirerating from './DoorFireRating';
import DoorCategory from './DoorCategory';
import DoorPowertransfer from './DoorPowerTransfer';
import Button from '@mui/material/Button';
import '../HomePage.css'

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
        <Button variant="contained">Hello World</Button>
        <div className='row'>
            <h3 className='left-panel'>Building</h3>
            <div className='right-panel'>
                <Building setFloorActive = {handleFloorCallback}/>
            </div>
        </div>
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
            <div className='content-container'>
                <div className='row'>
                    <div className='left-panel box'>
                        <Compliance compliance_id = {attributes["compliance_id"]} />
                        <DoorAstragal astragal_id = {attributes["astragal_id"]}/>
                        <DoorStop stop_id = {attributes["stop_id"]}/>
                        <DoorMagholder magholder_id = {attributes["mag_holder_id"]}/>
                        <DoorFlushbolt flushbolt_id = {attributes["flush_bolt_id"]}/>
                        <DoorCoordinator coordinator_id = {attributes["coordinator_id"]}/>
                        <DoorCloser closer_id = {attributes["closer_id"]}/>
                        <DoorCylinder cylinder_id = {attributes["cylinder_id"]}/>
                        <DoorDelayegress delayegress_id = {attributes["delay_egress_id"]}/>
                        <DoorTrim trim_id = {attributes["trim_id"]}/>
                        <DoorExitdevice exitdevice_id = {attributes["exit_device_id"]}/>
                        <DoorStrike strike_id = {attributes["strike_id"]}/>
                    </div>
                    <div className='right-panel box'>
                        <DoorElectriclockset electriclockset_id = {attributes["electric_lockset_id"]}/>
                        <DoorLockset lockset_id = {attributes["lockset_id"]}/>
                        <DoorPivot pivot_id = {attributes["pivot_id"]}/>
                        <DoorHinge hinge_id = {attributes["hinge_id"]}/>
                        <DoorContinuoushinge continuoushinge_id = {attributes["continous_hinge_id"]}/>
                        <DoorTransom transom_id = {attributes["transom_id"]}/>
                        <DoorType type_id = {attributes["type_id"]}/>
                        <DoorFrame frame_id = {attributes["frame_id"]}/>
                        <DoorFirerating firerating_id = {attributes["fire_rating_id"]}/>
                        <DoorCategory category_id = {attributes["category_id"]}/>
                        <DoorPowertransfer powertransfer_id = {attributes["power_transfer_id"]}/>
                    </div>
                </div>
            </div>: <></>

        }
        </>
    );

}

export default Format