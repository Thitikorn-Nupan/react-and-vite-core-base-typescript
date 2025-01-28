import {useRef, useState} from "react";
import * as React from "react";
// CSS in React **
// The most basic way is to just use vanilla CSS in React with CSS files.
// ** now i can call .* (all attributes) in css
import "../../../styles/RefOfHookAndStyles.css"
// CSS Modules in React ** Second way ** note you have to set name as *.module.css
import styles from "../../../styles/RefOfHookAndStyles2.module.css"


// Clear
type Data = {
    firstname: string,
    lastname: string,
    email: string,
}

const formInput = () => {

    const [firstname, setFirstname] = useState('Firstname...');
    const [lastname, setLastname] = useState('Lastname...');
    const [email, setEmail] = useState('XXX@gmail.com');

    const dataDemo : Data = {
            firstname : "John",
            lastname : "John",
            email : "John@hotmail.com"
        }

    const [data,setData] = useState(dataDemo)

    const handleOnFirstnameChange=(event : React.ChangeEvent<HTMLInputElement>)=> {
        setFirstname(event.target.value);
    }
    const handleLastnameOnChange=(event : React.ChangeEvent<HTMLInputElement>)=> {
        setLastname(event.target.value);
    }
    const handleOnEmailChange=(event : React.ChangeEvent<HTMLInputElement>)=> {
        setEmail(event.target.value);
    }

    const handleOnButtonClick = (event: React.MouseEvent<HTMLFormElement>) => {
        event.preventDefault()
        setData({
            firstname : firstname,
            lastname : lastname,
            email : email,
        })
        console.log(data)
    }


    const ref : React.MutableRefObject<any> = useRef(); // ** Now ref can access firstname , lastname , email

    return (
        <form className={"form-control mt-4"}  onSubmit={handleOnButtonClick}>
            Firstname : <input className={"form-control"} type="text" value={firstname} onChange={handleOnFirstnameChange}/>
            Lastname : <input className={"form-control"} type="text" value={lastname} onChange={handleLastnameOnChange}/>
            Email : <input className={"form-control"} type="email" value={email} onChange={handleOnEmailChange}/>
            <div>
                {/* way to use ref ** work like two way in angular*/}
                <strong ref={ref}>Firstname : {firstname}</strong>
                <br/>
                <strong ref={ref}>Lastname : {lastname}</strong>
                <br/>
                <strong ref={ref}>Email : {email}</strong>
                <br/>
                <strong className={styles.dataText} ref={ref}>Data : {data.firstname} , {data.lastname} , {data.email}</strong>
            </div>
            {/* button attribute is from RefOfHookAndStyles */}
            <button type="submit" className={"button"}>click</button>
        </form>
    )
}


const RefOfHookAndStyles = () => {
    return (
        // one tag does not need <> </>
            <div className={"container"}>
                {formInput()}
            </div>
    )
}

export {
    RefOfHookAndStyles
}