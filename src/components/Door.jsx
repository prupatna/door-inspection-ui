import { useEffect, useState } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { useRef } from 'react';
import {FloatingLabel } from 'react-bootstrap';
import '../HomePage.css'


const Door = (props) =>{
    const [select, setSelected] = useState(() => "Door");
    const [update, setUpdate] = useState(true)
    const [optionList, setOptionList] = useState([])
    const doorsId = useRef(null);

    const fetchDataId = (door_id) => {
        console.log ("request came param is", door_id)
        axios
            .get('http://127.0.0.1:5000/api/lockshop/door', {
                params: {
                    "building_id": props.building_value,
                    "floor_no": props.floor_value,
                    "door_no": door_id
                }
            })
            .then((response) => {
                const { data } = response;
                console.log ("new response is", response)
                if (response.status === 200) {
                    props.setAttributesActive (data.result.door_data)
                    
                } else {
                    setOptionList(['test'])
                }
            })
            .catch((error) => console.log(error));
    };

    const fetchData = () => {
        axios
            .get('http://127.0.0.1:5000/api/lockshop/door', {
                params: {
                    "building_id": props.building_value,
                    "floor_no": props.floor_value
                }
            })
            .then((response) => {
                const { data } = response;
                if (response.status === 200) {
                    setOptionList(prev => {
                        return [...data.result.door_data]  /*Change Value*/
                    })
                } else {
                    setOptionList(['test'])
                }
            })
            .catch((error) => console.log(error));
    };

    const handleChange = (event) => {
        console.log ("door changed", event.target.value, optionList);
        let newlist = optionList
        for (let id in newlist) {
            if (optionList[id]["door_name"] === event.target.value) {
                console.log ("updating attributes props")
                fetchDataId (optionList[id]["door_no"])
                props.setAttributesActive (optionList[id])
            }
        }
    }

    useEffect(() => {
        fetchData();
        setUpdate (false);
    }, [update, props.floor_value, props.building_value])

    const addDoor = (e) => {
        e.preventDefault()
        let doorId = doorsId.current.value
        console.log(doorId)
        axios.post('http://127.0.0.1:5000/api/lockshop/door', {
            "data": {"floor_no": props.floor_value,
            "building_id": props.building_value,
            "door_name": doorId,
            "compliance_id": 1, "fire_rating_id": 1, "category_id": 1, "frame_id": 1,
            "size": "size", "type_id": 1, "vision_lite": false, "transom_id": 1, "side_lite": false, 
            "hinge_id": 1, "sweep_id": 1, "hinge_size": "100", "continous_hinge_id": 1, "pivot_id": 1, 
            "auto_dr_btm_id": 1, "power_transfer_id": 1, "auto_operator_id":1, "closer_id" : 1,
            "lockset_id": 1, "astragal_id" : 1, "electric_lockset_id": 1, "ao_wall_plate_id" : 1,
            "coordinator_id" : 1, "cylinder_id": 1, "strike_id": 1, "flush_bolt_id": 1,
            "exit_device_id": 1, "seal_id": 1, "stop_id": 1, "threshold_id": 1,
            "mag_holder_id" : 1, "electric_exit_device": false,
            "mullion": false, "trim_id": 1, "delay_egress_id": 1
        }
        }).then(response => {
            doorsId.current.value = "";
            setSelected ("")
            setUpdate(true)
        })
    }

    return (
        <>
        <div >
            <div className='row'>
                <div className='left-panel box'>
                        <FloatingLabel label="Door">
                            <Form.Select placeholder='Select Door' onChange={handleChange}>
                                {
                                (optionList !== undefined) ?
                                    optionList.map((item) => (
                                        <option key={item.door_no} value={item.door_name}>
                                            {item.door_name}
                                        </option>
                                    )):<></>
                                }
                            </Form.Select>
                        </FloatingLabel>
                </div>
                <div className='right-panel box'>
                    <Form>
                        <Form.Control type="text" placeholder="Create New Door" ref={doorsId} />
                        <Button variant="primary" type="submit" onClick={(e) => addDoor(e)}>
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
        </>
    );
}

export default Door;