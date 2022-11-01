
import { useEffect, useState } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button, FloatingLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { useRef } from 'react';

const DoorStrike = (props) => {
    const [select, setSelected] = useState(() => "Select strike");
    const [update, setUpdate] = useState(true)
    const [optionList, setOptionList] = useState([])
    const strikeref = useRef(null);


    const fetchData = () => {
        axios
            .get('http://127.0.0.1:8000/api/lockshop/doorstrike', {
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
        .get('http://127.0.0.1:8000/api/lockshop/doorstrike', {
            params: {
                "id": props.strike_id
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
        let strikeName = strikeref.current.value
        
        axios.post('http://127.0.0.1:8000/api/lockshop/doorstrike', {
            "type": strikeName,
        }).then(response => {
            strikeref.current.value = "";
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
        console.log('optionList:', optionList)
    }, [optionList])
    return (
        <>
            <FloatingLabel label="Strike">
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

export default DoorStrike
