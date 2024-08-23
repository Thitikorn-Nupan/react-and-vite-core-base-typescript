import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export function LogicAndEventsJs() {

    const [option, setOption] = useState();

    const myStyle = {
        margin: "0 auto",
    }

    useEffect(() => {
        setOption(0)
    }, [])


    const changeOptionAfterClick = (event) => {
        setOption(Number(event.target.value));
    }

    let component = null

    switch (option) {
        case 1:
            console.log("case 1")
            component = <IncrementAndDecrementInteger number={10}/>
            break;
        case 2:
            component = <ReadAndReadsDataList/>
            break;
        case 3:
            // this.#component = <ReadAndReadsDataList/>
            break;
        default:
            break
    }

    return (

        <>
            <div className={"container mt-4"}>
                {/* we pass javascript object thu {} */}
                <div className={"card w-75"} style={myStyle}>
                    <h2 className={"card-header"}>Each component is inside child class</h2>
                    <div className={"card-body"}>
                        <div className="form-check">
                            <input className="form-check-input"
                                   type="radio"
                                   name="option"
                                   value="1"
                                   onChange={changeOptionAfterClick}

                            />
                            <label className="form-check-label">
                                Increment & Decrement Integer
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input"
                                   type="radio"
                                   name="option"
                                   value="2"
                                   onChange={changeOptionAfterClick}
                            />
                            <label className="form-check-label">
                                Read & Reads Data List
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input"
                                   type="radio"
                                   name="option"
                                   value="3"
                                   onChange={changeOptionAfterClick}
                            />
                            <label className="form-check-label">
                                To Do..
                            </label>
                        </div>
                    </div>
                </div>
                {component}
            </div>
        </>
    )
}


function IncrementAndDecrementInteger(props) {

    const [number, setNumber] = useState();


    // ** useEffect() works after component render , update
    // ** Some effects require cleanup to reduce memory leaks.
    useEffect(() => {
        // ** useEffect(,[]) works after component render only
        // ** it works as componentDidMount()
        setNumber(props.number)

        // ฟังก์ชัน clean-up
        return () => {
            // โค้ดที่จะทำงานเมื่อ component ถูกทำลาย เช่น การยกเลิก subscription, การลบ event listener
            console.log('IncrementAndDecrementInteger is unmounted.');
        };
    }, []);

    const incrementStateNumberAfterClick = () => {
        setNumber(number + 1);
    }

    const decrementStateNumberAfterClick = () => {
        setNumber(number - 1);
    }

    return (
        <>
            <div className="card mt-3 w-50" style={{margin: "0 auto"}}>
                <h5 className="card-header">Work with onclick</h5>
                <div className="card-body">
                    {/* props.<> can not change */}
                    <h5 className="card-title">Number is {number}</h5>
                    <button className="btn btn-success" onClick={incrementStateNumberAfterClick}>increment</button>
                    <button className="btn btn-warning m-lg-2" onClick={decrementStateNumberAfterClick}>decrement
                    </button>
                </div>
            </div>
        </>
    )
}

function ReadAndReadsDataList() {
    const [selectIndex, setSelectIndex] = useState(0);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        const usersResponse = await fetch("https://fakestoreapi.com/users?limit=5");
        return await usersResponse.json();
    }


    useEffect( () => {
        fetchUsers().then(result => setUsers(result))
        return () => {
            // โค้ดที่จะทำงานเมื่อ component ถูกทำลาย เช่น การยกเลิก subscription, การลบ event listener
            console.log('ReadAndReadsDataList is unmounted.');
        };
    }, [])

    const handleOnRowClick = (id) => {
        setSelectIndex(id)
    }

    const handleStyle = (id) => {
        if (selectIndex === id) {
            return "table table-dark"
        }
        return ""
    }

    const handleDelete = (id) => {
        // users.splice(users.indexOf(selectIndex), 1)
        setUsers(users.filter(user => user.id !== id))
    }

    return (
        <>
            <div>
                <table className="table mt-3 w-100" style={{margin: "0 auto"}}>
                    <thead className="table table-secondary">
                    <tr>
                        <th>Id</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Options</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users.map(
                            (user) => (
                                // if I called by this.handle2OnRowClick ** student will be undefined
                                <tr key={user.id}
                                    onClick={() => handleOnRowClick(user.id)}
                                    className={handleStyle(user.id)}>
                                    <td>{user.id}</td>
                                    <td>{user.email}</td>
                                    <td>{user.username}</td>
                                    <td>{user.password}</td>
                                    <td>
                                        <button className={"btn btn-warning"}>edit
                                        </button>
                                        <button className={"btn btn-danger m-lg-2"}
                                                onClick={() => handleDelete(user.id)}
                                        >delete
                                        </button>
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