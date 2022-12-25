
import { useEffect, useState } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { useRef } from 'react';

const CreateBuilding = (props) => {
    return (
        <Form>
                    <FloatingLabel label="Building Name">
                        <Form.Control type="text" placeholder="Enter Building" ref={buildingref} />
                    </FloatingLabel>
                    <FloatingLabel label="Building Code">
                        <Form.Control type="text" placeholder="Enter Code" ref={coderef} />
                    </FloatingLabel>
                    <FloatingLabel label="Number of Floors">
                        <Form.Control type="number" placeholder="Enter Floors" ref={floorsref} />
                    </FloatingLabel>
                    <Button variant="primary" type="submit" onClick={(e) => addBuilding(e)}>
                        Submit
                    </Button>
        </Form>
    );
}

export default DoorCloser
