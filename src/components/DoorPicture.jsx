
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Dropdown from 'react-bootstrap/Dropdown';
// import { Button, FloatingLabel } from 'react-bootstrap';
// import Form from 'react-bootstrap/Form'
// import { useRef } from 'react';

const DoorPicture = (props) => {


    return (
        <>
            <div id="container">
                <img width='500' height='200' src={`data:image/jpeg;base64,${props.picture}`}/>
            </div>
        </>
    );
}

export default DoorPicture
