import { urlMenu } from "../endpoints";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import dictionary from "./dictionary";
import { json } from "react-router-dom";
export default function Menu() {
    const lang = (useSelector(state => state.langReducer)).langShortName;
    const userDetails = useSelector(state => state.userReducer)
    let menu = {};
    for (const key of dictionary.dayWeeks["en"]) {
        menu[key] = ""
    }
    if (userDetails.menu != null || userDetails.menu != "") {
        menu = JSON.parse(userDetails.menu)
    }
    const [objMenu, setObjMenu] = useState({ ...menu });
    
    const createMenu = () => {
        console.log(objMenu, typeof (objMenu))
        fetch(`${urlMenu}get-menu/${userDetails.code}`, { method: 'POST' })
            .then(response => response.json())
            .then(data => { setObjMenu(data); console.log(data) })
            .catch(error => console.error(error));
    };

    const saveMenu = () => {
        fetch(`${urlMenu}save/${userDetails.code}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objMenu)// objMenu 
        })
            .then(response => response.json())
            .then(res => { console.log(res) })
            .catch(error => console.error(error));
    }
    const [day, setDay] = useState({ index: 0, day: dictionary.dayWeeks.en[0] });
    const getDayData = (i) => {
        let cIndex = day.index;
        setDay({ index: i, day: dictionary.dayWeeks.en[i] });
    };
    return (
        <div id="menuPage">
            <Button disabled={day.index == (Object.keys(objMenu).length - 1)} onClick={() => getDayData(day.index + 1)}>next</Button>
            <Button disabled={day.index == 0} onClick={() => getDayData(day.index - 1)}>pre</Button>
            <Button onClick={createMenu}>create menu</Button>
            {/* {Object.keys(objMenu).map(day => (
                <div key={day}> */}
            <h2>{dictionary.dayWeeks[lang][day.index]}</h2>
            <div className="day">
                {Object.keys(objMenu[day.day]).map(meal => (
                    <div key={meal} className="meal">
                        <h3>{meal}</h3>
                        <div className="food">
                            {Object.keys(objMenu[day.day][meal]['Food']).map(id => (
                                <div key={id}>
                                    {lang == "en" ? <p key={id}>{objMenu[day.day][meal]['Food'][id]}</p> :
                                        <p key={id}>{objMenu[day.day][meal]['he_food'][id]}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <Button onClick={saveMenu}>{dictionary.save[lang]}</Button>
            {/* </div>
            ))} */}
        </div>
    )
}