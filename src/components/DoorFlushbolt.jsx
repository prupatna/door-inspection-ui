
import { useEffect, useState } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button, FloatingLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { useRef } from 'react';

const DoorFlushbolt = (props) => {
    const [select, setSelected] = useState(() => "Select flushbolt");
    const [update, setUpdate] = useState(true)
    const [optionList, setOptionList] = useState([])
    const flushboltref = useRef(null);


    const fetchData = () => {
        axios
            .get('http://127.0.0.1:8000/api/lockshop/doorflushbolt', {
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
        .get('http://127.0.0.1:8000/api/lockshop/doorflushbolt', {
            params: {
                "id": props.flushbolt_id
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
        let flushboltName = flushboltref.current.value
        
        axios.post('http://127.0.0.1:8000/api/lockshop/doorflushbolt', {
            "type": flushboltName,
        }).then(response => {
            flushboltref.current.value = "";
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
    useEffect(() => {
        //console.log('optionList:', optionList)
    }, [optionList])
    return (
        <>
            <FloatingLabel label="Flush Bolt">
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

export default DoorFlushbolt
