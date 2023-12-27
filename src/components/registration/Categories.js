import { useEffect, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

function Categories(props) {
    const { categoriesLst, currentMeal, close, save } = { ...props }
    const handleCheckboxChange = (e) => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const checked = []
        const currentCBName = e.target.name.substring(0, e.target.name.indexOf("_"))
        checkboxes.forEach((cb) => {
            cb.disabled = false
            const CBName = cb.name.substring(0, cb.name.indexOf("_"))
            if (currentCBName == CBName && cb.checked) {
                checked.push(cb);
            }
        });
        if (checked.length == 1) {
            console.log(checked[0].disabled);
            checked[0].disabled = true;
        }
    }

    useEffect(() => {
        handleCheckboxChange({ target: { name: `${currentMeal.name}_` } });
      }, []);


    return (
        <Modal show={true} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>{`${currentMeal["en"]} categories`}</Modal.Title>
            </Modal.Header>
            {/* {console.log(`${currentMeal} Modal`)} */}
            <Modal.Body>
                {
                    Object.keys(categoriesLst).map((id) => (
                        <div key={`${currentMeal.name}_cat_${id}`} >
                            <Form.Check
                                name={`${currentMeal.name}_cat_${id}`}
                                type='checkbox'
                                label={categoriesLst[id]}
                                defaultChecked={currentMeal["categories"].includes(Number(id))}
                                onChange={handleCheckboxChange}
                            />
                        </div>
                    ))
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => save(currentMeal.name)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}


export default Categories