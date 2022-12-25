
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, FloatingLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { useRef } from 'react';

const DoorFrontImage = (props) => {
    const [currentFile, setCurrentFile] = useState(undefined);
    const [imageInfos, setImageInfos] = useState([]);


    // const fetchData = () => {
    //     axios
    //         .get('http://127.0.0.1:5000/api/lockshop/frontimage', {
    //         })
    //         .then((response) => {
    //             const { data } = response;
    //             if (response.status === 200) {
    //                 setOptionList(prev => {
    //                     return [...data.result.data]
    //                 }
    //                 )
    //             } else {
    //                 setOptionList(['test'])
    //             }
    //         })
    //         .catch((error) => console.log(error));
    // };

    // const fetchDataId = () => {
    //     axios
    //     .get('http://127.0.0.1:5000/api/lockshop/frontimage', {
    //         params: {
    //             "id": props.frontimage_id
    //         }
    //     })
    //     .then((response) => {
    //         const { data } = response;
    //         if (response.status === 200) {
    //             setSelected (data.result.data.type)
    //         } else {
    //             setSelected ("None")
    //         }
    //     })
    //     .catch((error) => console.log(error));
    // };

    // useEffect(() => {
    //     // fetchData();
    //     fetchDataId ();
    //     if (update === true) {
    //         fetchData();
    //         setUpdate(false);
    //     }
    // })

    // const addFrontImage = (e) => {
    //     e.preventDefault()
    //     let hingeName = frontimageref.current.value
        
    //     axios.post('http://127.0.0.1:5000/api/lockshop/frontimage', {
    //         "type": hingeName,
    //     }).then(response => {
    //         frontimageref.current.value = "";
    //         setUpdate(true)
    //     })

    // }

    const handleChange = (event) => {
        setCurrentFile(event.target.files[0]);
        console.log("event target", event.target.files[0])
    }

    return (
        <>
            {
            /* <FloatingLabel label="FrontImage">
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
            </FloatingLabel> */
                <div>
                    <input type="file" name="frontimage" onChange={handleChange} />
                </div>
            }

        </>
    );
}

export default DoorFrontImage
