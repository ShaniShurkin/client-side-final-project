import { Form, Button, Modal } from 'react-bootstrap';
function Categories(props) {
    const {categoriesLst, currentMeal, close, save} = {...props}
    return (
        <Modal show={true} onHide={close}> 
            <Modal.Header closeButton>
                <Modal.Title>{`${currentMeal["en"]} categories`}</Modal.Title>
            </Modal.Header>
           {/* {console.log(`${currentMeal} Modal`)} */}
            <Modal.Body>
                {
                    Object.keys(categoriesLst).map((id) => (
                        <div  key={`${currentMeal.name}_cat_${id}`} >
                            <Form.Check
                                name={`${currentMeal.name}_cat_${id}`}
                                type='checkbox'
                                label={categoriesLst[id]}
                                defaultChecked={currentMeal["categories"].includes(Number(id))}
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