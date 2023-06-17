const initialState = { "langShortName": "en", "lang":"English" };
export default function langReducer(state = initialState, action) {
    switch (action.type) {
        case "CHANGETOHEBREW":
            return {"langShortName": "he", "lang":"Hebrew"  };
        case "CHANGETOENGLISH":
            return { "langShortName": "en", "lang":"English" };
    }
    return state;

}
