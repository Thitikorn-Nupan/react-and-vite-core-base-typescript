import {Component} from "react";
import covertClassToFunction from "./covertClassToFunction.jsx";



class UpdateConceptJsClass extends Component {

    fakeStoreApi  = "https://fakestoreapi.com/users"

    constructor(props) {
        super(props);
        // ** way to declare array of state
        this.state = {
            id: 0,
            email: "",
            username: "",
            password: ""
        }
    }

    componentDidMount = async () => {

        console.log('componentDidMount() is initial (Data fetched)')
        // get id as param from url
        const id = Number(this.props.location.search.slice(4))
        const users = await fetch(this.fakeStoreApi+`/${id}`);
        const resultUser = await users.json(); // **

        this.setState({
            id: resultUser.id,
            email: resultUser.email,
            username: resultUser.username,
            password: resultUser.password
        })

    }

    handleInputChange = (event) => {
        if (event.target.name === "email") {
            this.setState({
                email: event.target.value
            })
        } else if (event.target.name === "username") {
            this.setState({
                username: event.target.value
            })
        } else if (event.target.name === "password") {
            this.setState({
                password: event.target.value
            })
        } else if (event.target.name === "id") {
            this.setState({
                id: event.target.value
            })
        }
    }


    // handle function can specify async function
    handleRequestPutMethod = async (event) => {
        event.preventDefault()
        console.log(this.state.id,this.state.email,this.state.password,this.state.username)
        const response = await fetch(this.fakeStoreApi+`/${this.state.id}`, {
            method: "PUT",
            body: JSON.stringify(
                {
                    email:this.state.email,
                    username:this.state.username,
                    password:this.state.password,
                    name:{
                        firstname:'John',
                        lastname:'Doe'
                    },
                    address:{
                        city:'kilcoole',
                        street:'7835 new road',
                        number:3,
                        zipcode:'12926-3874',
                        geolocation:{
                            lat:'-37.3159',
                            long:'81.1496'
                        }
                    },
                    phone:'1-570-236-7033'
                }
            )
        })

        if (response.status === 200) {
            // life cycle of hook (function)
            // this.props.navigate(`/apply-api-js`);
        }
    }




    render() {
        return (
            <div className="container mt-4 w-50" style={{margin: "0 auto"}} onSubmit={this.handleRequestPutMethod}>
                <form className={"form-control p-2 "}>
                    <div className="mb-3">
                        Id
                        <input type="number" className="form-control" name="id" value={this.state.id} onChange={this.handleInputChange} readOnly={true}/>
                    </div>
                    <div className="mb-3">
                        Email
                        <input type="email" className="form-control" name="email" placeholder={this.state.email}
                               onChange={this.handleInputChange}/>
                    </div>
                    <div className="mb-3">
                        Username
                        <input type="text" className="form-control" name="username" placeholder={this.state.username}
                               onChange={this.handleInputChange}/>
                    </div>
                    <div className="mb-3">
                        Password
                        <input type="password" className="form-control" name="password" placeholder={this.state.password} onChange={this.handleInputChange}/>
                    </div>
                    {/* onSubmit work with button type submit */}
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default covertClassToFunction(UpdateConceptJsClass)
