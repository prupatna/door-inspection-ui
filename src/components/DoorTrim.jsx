
import { useEffect, useState } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button } from 'react-bootstrap';
import {FloatingLabel} from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { useRef } from 'react';

const DoorTrim= (props) => {
    const [select, setSelected] = useState(() => "Select trim");
    const [update, setUpdate] = useState(true)
    const [optionList, setOptionList] = useState([])
    const trimref = useRef(null);


    const fetchData = () => {
        axios
            .get('http://127.0.0.1:5000/api/lockshop/doortrim', {
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
        .get('http://127.0.0.1:5000/api/lockshop/doortrim', {
            params: {
                "id": props.trim_id
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
    })

    const addBuilding = (e) => {
        e.preventDefault()
        let trimName = trimref.current.value
        
        axios.post('http://127.0.0.1:5000/api/lockshop/doortrim', {
            "name": trimName,
        }).then(response => {
            trimref.current.value = "";
            setUpdate(true)
        })

    }

    const handleChange = (event) => {
        setSelected (event.target.value)
        for (let id in optionList) {
            if (optionList[id]["name"] === event.target.value)
                props.handler (optionList[id]["id"])
        }
    }
    useEffect(() => {
        console.log('optionList:', optionList)
    }, [optionList])
    return (
        <>
            <FloatingLabel label="Trim">
                <Form.Select value={select} onChange={handleChange}>
                    {
                    (optionList !== undefined) ?
                        optionList.map((item) => (
                            <option key={item.id} value={item.name}>
                                {item.name}
                            </option>
                        )):<></>
                    }
                </Form.Select>
            </FloatingLabel>
        </>
    );
}

export default DoorTrim
