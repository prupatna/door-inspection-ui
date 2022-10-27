
import { useEffect, useState } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { useRef } from 'react';
// import Floor from './Floors';
const Building = (props) => {
    const [select, setSelected] = useState(() => "Building");
    const [update, setUpdate] = useState(true)
    const [optionList, setOptionList] = useState([])
    const [floor, setFloor] = useState(() => false)
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
                console.log('reponse= ', response);
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
    }, [update])

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

    const handleChange = (bName) => {

        // if (floor === true) {
            console.log(bName)
            // setFloor(false)
        // }

    }
    useEffect(() => {
        console.log('optionList:', optionList)
    }, [optionList])
    return (
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
                            <Dropdown.Item key={item.id} value={item.name} onClick={(e) => {
                                setSelected(item.name)
                                // setFloor(true)
                                handleChange(item.name)
                            }} >
                                {item.name}
                            </Dropdown.Item>
                        ))
                        :
                        <></>
                }
                <Dropdown.Divider />
                <Form>
                    <Form.Control type="text" placeholder="Enter Building" ref={buildingref} />
                    <Form.Control type="text" placeholder="Enter Code" ref={coderef} />
                    <Form.Control type="number" placeholder="Enter Floors" ref={floorsref} />
                    <Button variant="primary" type="submit" onClick={(e) => addBuilding(e)}>
                        Submit
                    </Button>
                </Form>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default Building
