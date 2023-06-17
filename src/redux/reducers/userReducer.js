const initialState = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    gender: 0,
    weight: 0,
    height: 0,
    age: 0,
    activityLevel: 0,
    menu: "",
    code: 0,
};

export default function userReducer(state = initialState, action) {
    const details = action.payload;
    switch (action.type) {
        case "ENTERDETAILSFORDIET":
            const updatedState = {...state }; // create a copy of the old object
            const newState = action.payload;
            for (const [key, value] of Object.entries(newState)) {
                if (state.hasOwnProperty(key)) {
                    updatedState[key] = value;
                }
            }
            console.log("yes")
            return updatedState
    }


    return state;

}
