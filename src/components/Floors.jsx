import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { useRef } from 'react';
import {FloatingLabel } from 'react-bootstrap';
import axios from 'axios';
import '../HomePage.css'


const Floor = (props) => {
    const [select, setSelected] = useState(() => "Floor");
    const [update, setUpdate] = useState(true)
    const [optionList, setOptionList] = useState([])
    const floorsId = useRef(null);


    useEffect(() => {  
        fetchData();
        setUpdate (false);
    }, [update, props.value])

    useEffect(() => {
        console.log('optionList for building:', optionList)
    }, [optionList])

    const handleChange = (dId) => {
        props.setDoorActive(dId)
    }

    const fetchData = () => {
        console.log ("fetchiing data of floors");
        axios
            .get('http://127.0.0.1:8000/api/lockshop/floor', {
                params: {
                    "building_id": props.value
                }
            })
            .then((response) => {
                const { data } = response;
                if (response.status === 200) {
                    setOptionList(prev => {
                        return [...data.result.floor_data]
                    })
                } else {
                    setOptionList(['test'])
                }
            })
            .catch((error) => console.log(error));
    };

    const addFloor = (e) => {
        e.preventDefault()
        let buildingId = props.value
        let floorId = parseInt(floorsId.current.value)
        console.log(floorId)
        axios.post('http://127.0.0.1:8000/api/lockshop/floor', {
            "floor_no": floorId,
            "building_id": buildingId
        }).then(response => {
            floorsId.current.value = "";
            setUpdate(true)
        })
    }


    return (
        <>
        <div >
            <div className='row'>
                <div className='left-panel box'>
                    <FloatingLabel label="Floors">
                        <Form.Select placeholder='Select Floor' onChange={handleChange}>
                            {
                            (optionList !== undefined) ?
                                optionList.map((item) => (
                                    <option key={item.floor_no} value={item.floor_no}>
                                        {item.floor_no}
                                    </option>
                                ))
                                :<></>
                            }
                        </Form.Select>
                    </FloatingLabel>
                </div>
                <div className='right-panel box'>
                    <Form>
                        <Form.Control type="number" placeholder="Create New Floor" ref={floorsId} />
                        <Button variant="primary" type="submit" onClick={(e) => addFloor(e)}>
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
        </>
    );
}

export default Floor;