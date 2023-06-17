export function enterDetailsForDiet(details) {
    return {
        type: "ENTERDETAILSFORDIET", 
        payload: { ...details}
        // payload: {
        //     gender: details.gender,
        //     weight: details.weight,
        //     height: details.height,
        //     age: details.age,
        //     activityLevel: details.activityLevel
        // }
    }
}
