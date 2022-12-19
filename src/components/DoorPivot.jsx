
import { useEffect, useState } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button, FloatingLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { useRef } from 'react';

const DoorPivot = (props) => {
    const [select, setSelected] = useState(() => "Select pivot");
    const [update, setUpdate] = useState(true)
    const [optionList, setOptionList] = useState([])
    const pivotref = useRef(null);


    const fetchData = () => {
        axios
            .get('http://127.0.0.1:5000/api/lockshop/doorpivot', {
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
        .get('http://127.0.0.1:5000/api/lockshop/doorpivot', {
            params: {
                "id": props.pivot_id
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
    })

    const addBuilding = (e) => {
        e.preventDefault()
        let pivotName = pivotref.current.value
        
        axios.post('http://127.0.0.1:5000/api/lockshop/doorpivot', {
            "type": pivotName,
        }).then(response => {
            pivotref.current.value = "";
            setUpdate(true)
        })

    }

    const handleChange = (event) => {
        setSelected (event.target.value)
        for (let id in optionList) {
            if (optionList[id]["type"] === event.target.value)
                props.handler (optionList[id]["id"])
        }
    }
    
    return (
        <>
            <FloatingLabel label="Pivot">
                <Form.Select value={select} onChange={handleChange}>
                    {
                    (optionList !== undefined) ?
                        optionList.map((item) => (
                            <option key={item.id} value={item.type}>
                                {item.type}
                            </option>
                        )):<></>
                    }
                </Form.Select>
            </FloatingLabel>
        </>
    );
}

export default DoorPivot
