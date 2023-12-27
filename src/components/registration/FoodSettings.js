
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const FoodSettings = React.memo((props) => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <>
            <Form className="input-form" onSubmit={onSubmit}>
                <div className="col-md-6 offset-md-3">
                    <Form.Group controlId="email">
                        <Form.Label>email</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            placeholder="Enter your email"
                            autoComplete="off"
                        // ref={register({
                        //   required: 'First name is required.',
                        //   pattern: {
                        //     value: /^[a-zA-Z]+$/,
                        //     message: 'First name should contain only characters.'
                        //   }
                        // })}
                        // className={`${errors.email ? 'input-error' : ''}`}
                        />
                        {/* {errors.email && (
              <p className="errorMsg">{errors.email.message}</p>
            )} */}
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </>
    )
});


export default FoodSettings;