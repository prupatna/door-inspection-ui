
import { useEffect, useState } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { useRef } from 'react';

const DoorFrame= (props) => {
    const [select, setSelected] = useState(() => "Select frame");
    const [update, setUpdate] = useState(true)
    const [optionList, setOptionList] = useState([])
    const frameref = useRef(null);


    const fetchData = () => {
        axios
            .get('http://127.0.0.1:8000/api/lockshop/doorframe', {
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
        .get('http://127.0.0.1:8000/api/lockshop/doorframe', {
            params: {
                "id": props.frame_id
            }
        })
        .then((response) => {
            const { data } = response;
            if (response.status === 200) {
                setSelected (data.result.data.material)
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
        let framematerial = frameref.current.value
        
        axios.post('http://127.0.0.1:8000/api/lockshop/doorframe', {
            "material": framematerial,
        }).then(response => {
            frameref.current.value = "";
            setUpdate(true)
        })

    }

    const handleChange = (bId) => {
        props.handler (bId)
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
                            <Dropdown.Item key={item.id} value={item.material} onClick={(e) => {
                                setSelected(item.material)
                                // setFloor(true)
                                handleChange(item.id)
                            }} >
                                {item.material}
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

export default DoorFrame
