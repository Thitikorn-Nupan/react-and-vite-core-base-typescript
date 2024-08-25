import {Component} from "react";
import {liff} from "@line/liff";
import covertClassToFunction from "./covertClassToFunction.jsx";

class LoginJs extends Component {

    componentDidMount() {
        // the value of liff.id is null until you run liff.init().
        liff.init({liffId: process.env.LIFF_ID}).then(() => console.log('initial liff id'))
    }


    handleLogin = (event) => {
        // You can use liff.ready even before the initialization of the LIFF app by liff.init() has finished.
        liff.ready.then(
            () => {
                // do something you want when liff.init finishes
                liff.login()
            })
    }

    render() {
        return (
            <>
                <div className={"container text-center"}>
                    <button className={"btn btn-success mt-4"} onClick={this.handleLogin}>Line Login</button>
                </div>
            </>
        )
    }

}

export default covertClassToFunction(LoginJs)