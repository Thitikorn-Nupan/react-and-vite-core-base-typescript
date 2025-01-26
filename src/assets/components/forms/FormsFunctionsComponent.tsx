import {FormEvent, useState} from "react";
import * as React from "react";
import {Robot} from "../../entities/robot.ts";

// Clear

const Form1 = () => {
    // *** state hook with function
    // first argument is data default second is setter argument
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    // *** function inside function
    const handleOnClick = () => {
        console.log(email, username)
    }

    return (
        <>
            <div className={"container w-50 mt-4"}>
                <h3 className={"p-2"}>Work With Form Inside Function (name and id on tags doesn't matter) <br/>***
                    Handle Functions on tag input *** Submit by button</h3>
                <form className={"form-control p-2"}>
                    <div className="mb-3">
                        Email
                        {/* all event can use this React.FormEvent<HTMLInputElement> */}
                        <input type="email" className="form-control" placeholder={email}
                               onChange={(event: React.FormEvent<HTMLInputElement>) => setEmail(event.currentTarget.value)}/>
                        <strong className={"text-danger mt-1"}>
                            {email.length <= 5 && "length is not good"}
                        </strong>
                        <strong className={"text-success  mt-1"}>
                            {email.length > 5 && "length is enough"}
                        </strong>
                    </div>
                    <div className="mb-3">
                        Username
                        <input type="text" className="form-control" placeholder={username}
                               onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}/>
                        <strong className={"text-danger mt-1"}>
                            {username.length <= 5 && "length is not good"}
                        </strong>
                        <strong className={"text-success  mt-1"}>
                            {username.length > 5 && `length is enough ${username}`}
                        </strong>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={handleOnClick}>Submit</button>
                </form>
            </div>
        </>
    )
}


const Form2 = () => {

    const [language1, setLanguage1] = useState(false);
    const [language2, setLanguage2] = useState(false);
    const [language3, setLanguage3] = useState(false);

    /*
    // these function for changing language1,2,3
    // ** just switch ** work only true and false
    const handleLanguage1Click = () => {
        // why !
        // if we click we have to change default
        // *** the first way change by ! it means !true = false
        setLanguage1(!language1)
    }

    const handleLanguage2Click = () => {
        setLanguage2(!language2)
    }

    const handleLanguage3Click = () => {
        setLanguage3(!language3)
    }
    */
    // Or another way
    const handleLanguagesClick = (event: React.FormEvent<HTMLInputElement>) => {
        console.log(event.currentTarget.value)
        if (event.currentTarget.value === "Java") {
            console.log("Java")
            setLanguage1(!language1)
        }
        if (event.currentTarget.value === "C,C++") {
            console.log("C,C++")
            setLanguage2(!language2)
        }
        if (event.currentTarget.value === "Php") {
            console.log("Php")
            setLanguage3(!language3)
        }
    }

    const handleCheckClick = () => {
        console.log(language1, language2, language3)
    }
    return (
        <>
            <div className={"container w-50 mt-4"}>
                <form className={"form-control"}>
                    <h3>which language you know about programming ?</h3>
                    <div className="form-check">
                        {/*
                            If we work with checkbox we have to handle for setting each checkbox
                        */}
                        <input className="form-check-input" type="checkbox" value={"Java"}
                               onChange={handleLanguagesClick}
                        />
                        <label className="form-check-label">
                            Java
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value={"C,C++"}
                               onChange={handleLanguagesClick}/>
                        <label className="form-check-label">
                            C,C++
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value={"Php"}
                               onChange={handleLanguagesClick}/>
                        <label className="form-check-label">
                            Php
                        </label>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={handleCheckClick}>Submit</button>
                </form>
            </div>
        </>
    )
}

// ** Multiple inputs , setInputs
// ** Cool !
// Define the type for your object
interface MyObject {
    rid: number;
    codeName: string,
    price: number,
}

const Form3MultipleInputs = () => {

    // robots as array , setRobots work as seem set up each element
    const demoRobots = [
        new Robot(1, 'RX-A-100', 90000000, true),
        new Robot(2, 'GX-R-202', 120000000, true),
        new Robot(3, 'CXT-100', 850000000, true)
    ]

    const [robots, setRobots] = useState(demoRobots) // if you need to initial pass on useState(<data>) if not pass on useState([])
    const [active, setActive] = useState(false)
    const [selectIndex, setSelectIndex] = useState(-1)

    // ** Way to set keys , values
    // ** This way is good for input That's not changed
    // ** you have to set type of inputs useState<Type>({<for array>})
    const [inputs, setInputs] = useState<MyObject>({codeName: "", price: 0, rid: 0})

    // ** now i can access inputs.codeName , price , rid

    // ** OnChange()
    const handleLoadEachInputToInputsArray = (event: FormEvent<HTMLInputElement>) => {

        const name = event.currentTarget.name; // name it means we get name attribute on input tag
        console.log(`name attribute is ${name}`)
        const value = event.currentTarget.value; // value hols as value
        console.log(`value of name attribute is ${value}`)

        // work follow order input
        // ** Three Dots (…) Operator
        // **  (...) allows an iterable such as an array expression or string to be expanded in places
        // **  where zero or more arguments (for function calls) or elements (for array literals) are expected,
        setInputs(values => ({
                ...values,
                // set dynamic key , value
                [name]: value
            })
        )
    }

    //  Good way **  There are many ways to do this, but the easiest one is to use the array spread syntax
    // ** OnClick()
    const handleOnClick = () => {
        setRobots( // ** Replace the state
            [ // with a new array
                ...robots, // that contains all the old items
                new Robot(inputs.rid, inputs.codeName, inputs.price, active) // and data to robots
            ]
        );
        console.log(robots)
    }

    const handleActiveCheck = () => {
        // just switch value after do event
        setActive(!active)
    }

    const handleOnClickRow = (index: number) => {
        setSelectIndex(index)
    }

    const handleStyleOnClickRow = (index: number, selectedIndex: number) => {
        if (index === selectedIndex) {
            return "table-dark"
        }
        return "";
    }

    return (
        <>
            <div className={"container w-50 mt-4"}>
                <h3 className={"p-2"}>Work With Form Inside Function *** Multiple Inputs <br/>
                    *** We have to set name attribute on name attribute tag as the same default you work with htm ***
                </h3>
                <form className={"form-control p-2"}>
                    <div className="mb-3">
                        Rid
                        <input type="number" className="form-control" name="rid"
                               onChange={handleLoadEachInputToInputsArray}/>
                    </div>
                    <div className="mb-3">
                        Code Name
                        <input type="text" className="form-control" name="codeName"
                               onChange={handleLoadEachInputToInputsArray}
                        />
                    </div>
                    <div className="mb-3">
                        Price
                        <input type="number" className="form-control" name="price"
                               onChange={handleLoadEachInputToInputsArray}/>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" onChange={handleActiveCheck}/>
                        <label className="form-check-label">
                            Active
                        </label>
                    </div>

                    <button type="button" className="btn btn-primary" onClick={handleOnClick}>Submit</button>
                </form>
            </div>

            <div>
                <table className="table mt-3 w-50" style={{margin: "0 auto", "cursor": "pointer"}}>
                    <thead className="table-dark">
                    <tr>
                        <th>Id</th>
                        <th>Code Name</th>
                        <th>Price</th>
                        <th>Active</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        robots.map((robot, index) => (
                            <tr key={robot.rid}
                                className={handleStyleOnClickRow(index, selectIndex)} // dynamic style
                                onClick={() => handleOnClickRow(index)}>
                                <th>{robot.rid}</th>
                                <td>{robot.codeName}</td>
                                <td>{robot.price}</td>
                                <td>
                                    {robot.active && "true"}
                                    {!robot.active && "false"}
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </>
    )

}


interface Props {
    // key : value that you have to pass
    logMessage: (message: string) => string,  // wat to pass : () => "test"
    frameworkDefault: string
}

// *** it works like const Form4setSateByHooks = (props) => {} in js
// *** you have to set type of props
const Form4setSateByHooks = ({logMessage, frameworkDefault}: Props) => {

    /**
     *** Hooks will not work in React class components.
     Hooks can only be called inside React function components.
     Hooks can only be called at the top level of a component.
     Hooks cannot be conditional
     */

    console.log(logMessage) // () => "test"
    const [framework, setFramework] = useState(frameworkDefault)

    return (
        <>
            <div className={"container w-50 mt-4"}>
                <form className={"form-control"}>
                    <h3>{framework} is our favorite framework</h3>
                    <h3>*** React Hooks helps for setting event *** set event on tags ***</h3>
                    <div className="form-check">
                        {/*
                            If we work with checkbox we have to handle for setting each checkbox
                        */}
                        <input className="form-check-input" type="radio" name={"framework"} value={"Angular"}
                               onClick={() => setFramework("Angular")}/>
                        <label className="form-check-label">
                            Angular
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={"framework"}
                               value={"Spring & Spring Boot"}
                            // *** call event.target.value to get value attribute
                               onClick={(event: React.MouseEvent<HTMLInputElement>) => setFramework(event.currentTarget.value)}
                        />
                        <label className="form-check-label">
                            Spring & Spring Boot
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={"framework"} value={"React"}
                            // *** call event.target.value to get value attribute
                               onClick={(event: React.MouseEvent<HTMLInputElement>) => setFramework(event.currentTarget.value)}
                        />
                        <label className="form-check-label">
                            React
                        </label>
                    </div>
                </form>
            </div>
        </>
    )
}


/*interface Car {
    brand: string,
    model: string,
    price:number,
    yearBuild: number,
    color: string
}*/
/*interface MyObject {
    brand: string,
    model: string,
    price:number,
    yearBuild: number,
    color: string
}*/


// Hard way
const Form5setStateAsObject = () => {

    const [car, setCar] = useState({
        brand: "",
        model: "",
        year: 0,
        color: ""
    })

    // *** way to set each props if props is object
    const handleChangeBrand = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event.currentTarget?.name)
        setCar(previousState => ({
            ...previousState, brand: event.target?.value
        }))
    }
    const handleChangeModel = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.currentTarget?.value)
        setCar(previousState => ({
            ...previousState, model: event.target?.value
        }))
    }
    const handleChangeYear = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target?.value)
        // @ts-ignore
        setCar(previousState => ({
            ...previousState, year: event.target?.value
        }))
    }
    const handleChangeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target?.value)
        setCar(previousState => ({
            ...previousState, color: event.target?.value
        }))
    }

    const handleOnClick = () => {
        console.log(car)
    }

    return (
        <>
            <div className={"container w-50 mt-4"}>
                <form className={"form-control p-2"}>
                    <h3 className={"p-2"}>*** The Way to Updating Objects and Arrays in State</h3>
                    <div className="mb-3">
                        Brand
                        <input type="text" className="form-control" name="brand" onChange={handleChangeBrand}/>
                    </div>
                    <div className="mb-3">
                        Model
                        <input type="text" className="form-control" name="model" onChange={handleChangeModel}/>
                    </div>
                    <div className="mb-3">
                        Year
                        <input type="number" className="form-control" name="year" onChange={handleChangeYear}/>
                    </div>
                    <div className="mb-3">
                        Color
                        <input type="text" className="form-control" name="color" onChange={handleChangeColor}/>
                    </div>
                    {
                        // one line condition
                        (car.brand !== "" && car.model !== "" && car.color !== "") && <h2 className={"alert alert-primary"}>{car.brand} {car.model} {car.year} {car.color}</h2>
                    }
                    <button type="button" className="btn btn-primary" onClick={handleOnClick}>Submit</button>
                </form>
            </div>
        </>
    )
}

// *** Hard way but reduce code
const Form6setStateAsObjectDynamicInputs = () => {

    const [car, setCar] = useState({
        brand: "",
        model: "",
        year: 0,
        color: ""
        // in ts if we don't set we won access each attribute
    })

    // *** way to set each props of object
    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        // ** why target attribute work???
        let name = event.target?.name;
        let value = event.target?.value;
        console.log(name, value);
        setCar(previousState =>
            ({
                ...previousState, [name]: value
            })
        )
    }

    const handleOnClick = () => {
        console.log(car)
    }

    return (
        <>
            <div className={"container w-50 mt-4"}>
                <form className={"form-control p-2"}>
                    <h3 className={"p-2"}>*** The Way to Updating Objects and Arrays in State ** Dynamic set each
                        name,value</h3>
                    <div className="mb-3">
                        Brand
                        <input type="text" className="form-control" name="brand" onChange={handleChangeInput}/>
                    </div>
                    <div className="mb-3">
                        Model
                        <input type="text" className="form-control" name="model" onChange={handleChangeInput}/>
                    </div>
                    <div className="mb-3">
                        Year
                        <input type="number" className="form-control" name="year" onChange={handleChangeInput}/>
                    </div>
                    <div className="mb-3">
                        Color
                        <input type="text" className="form-control" name="color" onChange={handleChangeInput}/>
                    </div>

                    {(car.brand !== "" && car.model !== "" && car.color !== "") &&
                        <h2 className={"alert alert-primary"}>{car.brand} {car.model} {car.year} {car.color}</h2>}

                    <button type="button" className="btn btn-primary" onClick={handleOnClick}>Submit</button>
                </form>
            </div>
        </>
    )
}

// *** export multiples functions
export {
    Form1,
    Form2,
    Form3MultipleInputs,
    Form4setSateByHooks,
    Form5setStateAsObject,
    Form6setStateAsObjectDynamicInputs
}