
import { useEffect, useState } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { useRef } from 'react';

const DoorAstragal = (props) => {
    const [select, setSelected] = useState(() => "Select Astragal");
    const [update, setUpdate] = useState(true)
    const [optionList, setOptionList] = useState([])
    const astragalref = useRef(null);


    const fetchData = () => {
        axios
            .get('http://127.0.0.1:8000/api/lockshop/doorastragal', {
            })
            .then((response) => {
                const { data } = response;
                if (response.status === 200) {
                    setOptionList(prev => {
                        return [...data.result.data]
                    }
                    )
                } else {
                    setOptionList(['test'])
                }
            })
            .catch((error) => console.log(error));
    };

    const fetchDataId = () => {
        axios
        .get('http://127.0.0.1:8000/api/lockshop/doorastragal', {
            params: {
                "id": props.astragal_id
            }
        })
        .then((response) => {
            const { data } = response;
            if (response.status === 200) {
                setSelected (data.result.data.type)
            } else {
                setSelected ("None")
            }
        })
        .catch((error) => console.log(error));
    };

    useEffect(() => {
        // fetchData();
        fetchDataId ();
        if (update === true) {
            fetchData();
            setUpdate(false);
        }
    }, [update])

    const addBuilding = (e) => {
        e.preventDefault()
        let astragalName = astragalref.current.value
        
        axios.post('http://127.0.0.1:8000/api/lockshop/doorastragal', {
            "type": astragalName,
        }).then(response => {
            astragalref.current.value = "";
            setUpdate(true)
        })

    }

    const handleChange = (bId) => {

        // if (floor === true) {
        //props.setFloorActive(bId)
        // setFloor(false)
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
                            <Dropdown.Item key={item.id} value={item.type} onClick={(e) => {
                                setSelected(item.type)
                                // setFloor(true)
                                handleChange(item.id)
                            }} >
                                {item.type}
                            </Dropdown.Item>
                        ))
                        :
                        <></>
                }
                <Dropdown.Divider />
                <Form>
                </Form>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default DoorAstragal
