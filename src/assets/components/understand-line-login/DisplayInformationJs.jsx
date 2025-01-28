import {Component} from "react";
import covertClassToFunction from "./covertClassToFunction.jsx";
import {liff} from "@line/liff";
import {jwtDecode} from "jwt-decode";


export class DisplayInformationJs extends Component {

    fakeStoreApi = "https://fakestoreapi.com/users?limit=5"

    constructor(props) {
        super(props);
        this.state = {
            enablePage: false, // just a trick!
            jwtPayload: {
                iat: "", // issued at time
                exp: "",
                email: "",
            },
            profile: {
                name: "",
                statusMessage: "",
                pictureUrl: ""
            },
            users: []
        }

    }

    handleInitialUsers = async () => {
        const users = await fetch(this.fakeStoreApi);
        const resultUser = await users.json();
        this.setState({
                users: resultUser,
            }
        )
    }

    handleInitialProfileAndJwtPayload = async () => {
        await liff.ready.then(async () => {
            const profile = await liff.getProfile()
            const token = liff.getIDToken()
            console.log('liff.getIDToken() ', token)
            const decodeToken = jwtDecode(token); // ** decode jwt and you can get payload
            console.log('jwtDecode(token) ', decodeToken)
            this.setState({
                enablePage: true,
                profile: {
                    name: profile.displayName,
                    statusMessage: profile.statusMessage,
                    pictureUrl: profile.pictureUrl
                },
                jwtPayload: {
                    iat: new Date(decodeToken['iat'] * 1000).toLocaleString("en-US", {timeZone: "Asia/Bangkok"}),
                    exp: new Date(decodeToken['exp'] * 1000).toLocaleString("en-US", {timeZone: "Asia/Bangkok"}),
                    email: decodeToken['email']
                }
            })
        }); // end liff.ready
    }

    componentDidMount = async () => {
        await liff.init({liffId: process.env.LIFF_ID}).then(async () => {
            console.log('initial liff id')
            // if user is not logged in and try to get page liff.ready.. won work!!
            try {
                await this.handleInitialProfileAndJwtPayload();
                await this.handleInitialUsers();

            } catch (error) {
                // Error: LiffId is not found , And this error it shows you
                console.log(error)
                this.props.navigate('/line-login')
            }
        })
    }

    handleLogout = () => {
        liff.logout()
        this.props.navigate('/line-login')
    }

    loadingComponent () {
        return (
            <div className={"container text-center mt-4"}>
                <div className="spinner-border  text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }



    cartInformation() {
        return (
            <>
                <div className={"container text-center mt-4"}>
                    <div className="card w-75" style={{"margin": "0 auto"}}>
                        <img src={this.state.profile.pictureUrl} className="card-img-top p-lg-3" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">Name : {this.state.profile.name}</h5>
                            <h6 className="card-title">Status Message : {this.state.profile.statusMessage}</h6>

                            <p className="card-text">
                                ***** Detail Of Jwt Payload *****
                                <br></br>
                                Iat (Issue At Time) : <b>{this.state.jwtPayload.iat}</b>
                                <br></br>
                                Exp (Expiration Time): <b>{this.state.jwtPayload.exp}</b>
                                <br></br>
                                Email (Line Account) : <b>{this.state.jwtPayload.email}</b>
                            </p>
                            <a className="btn btn-danger" onClick={this.handleLogout}>Logout</a>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">You can do anything until {this.state.jwtPayload.exp}</small>
                        </div>
                    </div>
                </div>

            </>
        )
    }


    _editUser(id) {
        this.props.navigate(`/users/edit?id=${id}`);
    }

    usersTable() {
        return (
            <>
                <div>
                    <table className="table mt-3 w-75" style={{margin: "0 auto"}}>
                        <thead className=" table-secondary">
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
                            this.state.users?.map(
                                (user) => (
                                    // if I called by this.handle2OnRowClick ** student will be undefined
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.email}</td>
                                        <td>{user.username}</td>
                                        <td>{user.password}</td>
                                        <td>
                                            <button className={"btn btn-warning"} onClick={() => this._editUser(user.id)} >edit</button>
                                            <button className={"btn btn-danger"}>delete</button>
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

    render() {
        let component,subComponent
        if (this.state.enablePage) {
            component = this.cartInformation()
            subComponent = this.usersTable()
        } else {
            component = this.loadingComponent()
            subComponent = null
        }
        return (
            <>
                <div>
                    {/*
                        Solution 1
                        Inline If-Else with Conditional Operator
                        condition ? true : false.
                        {this.state.enablePage ? this.cartInformation() : this.loadingCart()}
                     */}

                    {/* Solution 2 */}
                    {component}
                    {this.state.users.length === 0 ? this.loadingComponent() : subComponent}
                </div>
            </>
        )
    }
}

export default covertClassToFunction(DisplayInformationJs)