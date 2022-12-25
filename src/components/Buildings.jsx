
import { useEffect, useState } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import {FloatingLabel } from 'react-bootstrap';
import { Button } from '@mui/material';
import Form from 'react-bootstrap/Form'
import { useRef } from 'react';

const Building = (props) => {
    const [select, setSelected] = useState(() => "Building");
    const [update, setUpdate] = useState(true)
    const [optionList, setOptionList] = useState([])
    const buildingref = useRef(null);
    const coderef = useRef(null);
    const floorsref = useRef(null);


    const fetchData = () => {
        axios
            .get('http://127.0.0.1:5000/api/lockshop/building', {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
            .then((response) => {
                const { data } = response;
                if (response.status === 200) {
                    setOptionList(prev => {
                        return [...data.result.building_data]
                    })
                } else {
                    setOptionList(['test'])
                }
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        // fetchData();
        if (update === true) {
            fetchData();
            setUpdate(false);
        }
    })

    const addBuilding = (e) => {
        e.preventDefault()
        let buildingName = buildingref.current.value
        // let codeName = coderef.current.value
        let floorNumber = floorsref.current.value

        axios.post('http://127.0.0.1:5000/api/lockshop/building', {
            "name": buildingName,
            "code": buildingName,
            "no_of_floors": floorNumber
        }).then(response => {
            buildingref.current.value = "";
            coderef.current.value = "";
            floorsref.current.value = "";
            setUpdate(true)
        })

    }

    const handleChange = (event) => {
        for (let id in optionList) {
            if (optionList[id]["name"] === event.target.value) {
                props.setFloorActive (optionList[id]["id"])
            }
        }
    }
    
    return (
        <>
            
            <FloatingLabel label="Building">
                <>
                <Form.Select placeholder='SelectBuilding' onChange={handleChange}>
                    {
                    (optionList !== undefined) ?
                        optionList.map((item) => (
                            <option key={item.id} value={item.name}>
                                {item.name}
                            </option>
                        ))
                        :
                        <></>
                    }
                
                </Form.Select>

                {   2 == 3?
                    <Form>
                    <FloatingLabel label="Building Name">
                        <Form.Control type="text" placeholder="Enter Building" ref={buildingref} />
                    </FloatingLabel>
                    <FloatingLabel label="Building Code">
                        <Form.Control type="text" placeholder="Enter Code" ref={coderef} />
                    </FloatingLabel>
                    <FloatingLabel label="Number of Floors">
                        <Form.Control type="number" placeholder="Enter Floors" ref={floorsref} />
                    </FloatingLabel>
                    <Button variant="primary" type="submit" onClick={(e) => addBuilding(e)}>
                        Submit
                    </Button>
                </Form>:<></>
                }
                </>
        </FloatingLabel>
        </>
    );
}

export default Building
