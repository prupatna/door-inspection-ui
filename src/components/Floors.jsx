import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { useRef } from 'react';
import axios from 'axios';


const Floor = (props) => {
    const [select, setSelected] = useState(() => "Floor");
    const [update, setUpdate] = useState(true)
    const [optionList, setOptionList] = useState([])
    const floorsId = useRef(null);
    const [floor, setFloor] = useState (props.value)

    useEffect(() => {
        // fetchData();
        fetchData();
    }, [props.value])

    useEffect (() => {
        fetchData ();
    }, [update])

    useEffect(() => {
        console.log('optionList:', optionList)
    }, [optionList])

    const handleChange = (dId) => {
        props.setDoorActive(dId)
    }

    const fetchData = () => {
        axios
            .get('http://127.0.0.1:8000/api/lockshop/floor', {
                params: {
                    "building_id": props.value
                }
            })
            .then((response) => {
                const { data } = response;
                console.log('reponse= ', props.value);
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
            setUpdate(true);
        })
    }


    return (
        <>
        <h1></h1>
        <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic"  >
                {select}
            </Dropdown.Toggle>
            <Dropdown.Menu
                disabled={false}
            >
                {
                    (optionList !== undefined) ?
                        optionList.map((item) => (
                            <Dropdown.Item key={item.floor_no} value={item.floor_no} onClick={(e) => {
                                setSelected(item.floor_no)
                                handleChange(item.floor_no)
                            }} >
                                {item.floor_no}
                            </Dropdown.Item>
                        ))
                        :
                        <></>
                }
                <Dropdown.Divider />
                <Form>
                    <Form.Control type="number" placeholder="Enter Floors" ref={floorsId} />
                    <Button variant="primary" type="submit" onClick={(e) => addFloor(e)}>
                        Submit
                    </Button>
                </Form>
            </Dropdown.Menu>
        </Dropdown>
        </>
    );
}

export default Floor;