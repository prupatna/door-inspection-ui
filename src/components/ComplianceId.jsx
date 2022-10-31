
import { useEffect, useState } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { useRef } from 'react';

const Compliance = (props) => {
    const [select, setSelected] = useState(() => "Select Compliance");
    const [update, setUpdate] = useState(true)
    const [optionList, setOptionList] = useState([])
    const complianceref = useRef(null);


    const fetchData = () => {
        axios
            .get('http://127.0.0.1:8000/api/lockshop/doorcompliance', {
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
        .get('http://127.0.0.1:8000/api/lockshop/doorcompliance', {
            params: {
                "id": props.compliance_id
            }
        })
        .then((response) => {
            const { data } = response;
            if (response.status === 200) {
                setSelected (data.result.data.name)
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
        let complianceName = complianceref.current.value
        
        axios.post('http://127.0.0.1:8000/api/lockshop/doorcompliance', {
            "name": complianceName,
        }).then(response => {
            complianceref.current.value = "";
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
                            <Dropdown.Item key={item.id} value={item.name} onClick={(e) => {
                                setSelected(item.name)
                                // setFloor(true)
                                handleChange(item.id)
                            }} >
                                {item.name}
                            </Dropdown.Item>
                        ))
                        :
                        <></>
                }
                <Dropdown.Divider />
                <Form>
                    {/* <Form.Control type="text" placeholder="Enter Compliance" ref={complianceref} />
                    <Button variant="primary" type="submit" onClick={(e) => addBuilding(e)}>
                        Submit
                    </Button> */}
                </Form>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default Compliance
