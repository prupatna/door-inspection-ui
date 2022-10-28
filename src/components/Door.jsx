import { useEffect } from "react";



const Door = (props) =>{
    const [select, setSelected] = useState(() => "Door");
    const [update, setUpdate] = useState(true)
    const [optionList, setOptionList] = useState([])
    const doorsId = useRef(null);


    useEffect(() => {
        // fetchData();
        if (update === true) {
            fetchData();
            setUpdate(false);
        }
    }, [update])


    useEffect(() => {
        console.log('optionList:', optionList)
    }, [optionList])


    const fetchData = () => {
        axios
            .get('http://127.0.0.1:5000/api/lockshop/door', {
                headers: {
                    "building_id": props.building_value,
                    "floor_no": props.floor_value
                }
            })
            .then((response) => {
                const { data } = response;
                console.log('reponse= ', response);
                if (response.status === 200) {
                    setOptionList(prev => {
                        return [...data.result.floor_data]  /*Change Value*/
                    })
                } else {
                    setOptionList(['test'])
                }
            })
            .catch((error) => console.log(error));
    };


    const addDoor = (e) => {
        e.preventDefault()
        let doorsId = parseInt(doorsId.current.value)
        console.log(floorId)
        axios.post('http://127.0.0.1:5000/api/lockshop/door', {
            "floor_no": props.floor_value,
            "building_id": props.building_value,
            "door_id": doorsId
        }).then(response => {
            doorsId.current.value = "";
            setUpdate(true)
        })

    }

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
                            <Dropdown.Item key={item.d} value={item.floor_no} onClick={(e) => {
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
                    <Form.Control type="number" placeholder="Enter Door" ref={doorsId} />
                    <Button variant="primary" type="submit" onClick={(e) => addDoor(e)}>
                        Submit
                    </Button>
                </Form>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default Door;