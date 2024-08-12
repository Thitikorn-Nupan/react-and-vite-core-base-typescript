import {ChangeEvent, Component} from "react";
import * as React from "react";


// and remember if you initial state,props you have to use it
type MyProps = {
    email: string,
    username: string,
}
type MyState = {
    email: string,
    username: string,
    enableChildComponent: boolean
}


export class FormsComponent extends Component<MyProps, MyState> {
    //** Form1
    form1WithHandleOnChange() {
        return (
            <>
                <h3 className={"p-2"}>React Work With Form Basic *** Handle Functions</h3>
                <form className={"form-control p-2"}>
                    <div className="mb-3">
                        Email
                        <input type="email" className="form-control" name="email" onChange={this.handleOnEmailChange}/>
                    </div>
                    <div className="mb-3">
                        Username
                        <input type="text" className="form-control" name="username"
                               onChange={this.handleOnUsernameChange}/>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.handleOnButtonClick}>Submit</button>
                </form>
            </>
        )
    }

    // *** <What Event You Work><HTMLInputElement>
    handleOnEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        // const target = event.target; // ** return tag
        // const value = target.value; // ** return value
        console.log(`email : ${event.target.value}`);
    }
    handleOnUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(`username : ${event.target.value}`);
    }
    handleOnButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        /* can not get each inputs */
        console.log(event.target) // <button type="button" class="btn btn-primary">Submit</button>
    }
    //** Form1


    //** Form2
    protected email: string = ""
    protected username: string = ""

    form2WithHandleOnChangeSetToAttributeClass() {
        return (
            <>
                <h3 className={"p-2"}>React Work With Form *** Handle Functions Set to Attributes</h3>
                <form className={"form-control p-2"}>
                    <div className="mb-3">
                        Email
                        <input type="email" className="form-control" name="email"
                               onChange={this.handleOnEmailChangeForm2}/>
                    </div>
                    <div className="mb-3">
                        Username
                        <input type="text" className="form-control" name="username"
                               onChange={this.handleOnUsernameChangeForm2}/>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.handleOnButtonClickForm2}>Submit
                    </button>
                </form>
            </>
        )
    }

    // *** focus return type FormEvent<HTMLInputElement>
    handleOnEmailChangeForm2 = (event: React.FormEvent<HTMLInputElement>) => {
        // in ts use currentTarget instead target
        if (event.currentTarget.value.length >= 10) {
            this.email = event.currentTarget.value;
        }
    }
    handleOnUsernameChangeForm2 = (event: React.FormEvent<HTMLInputElement>) => {
        // in ts use currentTarget instead target
        if (event.currentTarget.value.length >= 5) {
            this.username = event.currentTarget.value;
        }
    }
    handleOnButtonClickForm2 = () => {
        console.log(this.email, this.username);
    }
    //** Form2


    //** Form3,4
    constructor(props: MyProps) {
        super(props);
        this.state = {
            email: '',
            username: '',
            enableChildComponent : false
        }
    }

    form3WithHandleOnChangeAndStateHook() {
        return (
            <>
                <h3 className={"p-2"}>React Work With Form *** Handle Functions And State Hook</h3>
                <form className={"form-control p-2"}>
                    <div className="mb-3">
                        Email
                        <input type="email" className="form-control" name="email" placeholder={this.state.email}
                               onChange={this.handleOnEmailChangeForm3}/>
                        <span className={"text-danger"}>{
                            this.state.email.length >= 10 &&
                            this.state.email
                        }
                        </span>
                    </div>
                    <div className="mb-3">
                        Username
                        <input type="text" className="form-control" name="username" placeholder={this.state.username}
                               onChange={this.handleOnUsernameChangeForm3}/>
                        <span className={"text-danger"}>{
                            this.state.username.length >= 5 &&
                            this.state.username
                        }
                        </span>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.handleOnButtonClickForm3}>Submit
                    </button>
                </form>
            </>
        )
    }

    handleOnEmailChangeForm3 = (event: React.FormEvent<HTMLInputElement>) => {
        let email : string = "";
        if (event.currentTarget.value.length >= 10) {
            email = event.currentTarget.value;
        }
        this.setState({
            email: email,
        })
    }
    handleOnUsernameChangeForm3 = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            username: event.currentTarget.value,
        })
    }
    handleOnButtonClickForm3 = () => {
        console.log(this.state.email, this.state.username)
    }



    //** Form4
    form4WithHandleOnChangeAndChildComponent = () => {
        let formChildComponent = null
        // Work with condition
        if (this.state.enableChildComponent) {
            formChildComponent = <FormChild a={5} b={5} />
        }
        return (
            <>
                <div className="form-check form-switch m-lg-2">
                    <input className="form-check-input"
                           type="checkbox"
                           checked={this.state.enableChildComponent}
                           onChange={this.handleOnCheckboxChange4}/>
                    <label className="form-check-label">Open Child Component</label>
                    {formChildComponent}
                </div>
            </>
        )
    }
    handleOnCheckboxChange4 = () => {
        // just switch value after check box change
        this.setState({
            enableChildComponent: !this.state.enableChildComponent,
        })
    }
    //** Form4


    render() {
        return (
            <>
                <div className={"container mt-4"}>
                    <div className={"card"}>
                        {this.form1WithHandleOnChange()}
                    </div>

                    <div className={"card mt-2"}>
                        {this.form2WithHandleOnChangeSetToAttributeClass()}
                    </div>

                    <div className={"card mt-2"}>
                        {this.form3WithHandleOnChangeAndStateHook()}
                    </div>

                    <div className={"card mt-2"}>
                        {this.form4WithHandleOnChangeAndChildComponent()}
                    </div>
                </div>
            </>
        );
    }
}

type MyProps2 = {
    a : number,
    b : number
}
type MyState2 = {
        a : number,
        b : number
}

class FormChild extends Component<MyProps2,MyState2> {

    constructor(props : MyProps2) {
        super(props);
        this.state = {
            a : props.a,
            b : props.b
        }
    }

    // LifeCycle of Component
    // The next phase in the lifecycle is when a component is removed from the DOM, or unmounting as React likes to call it.
    // unmounted (n. ถอดออก)
    componentWillUnmount() {
        alert("FormChild component is unmounted.");
    }

    alertPlusNumberByProps = () => {
        return (
            <div className="alert alert-danger mt-3" style={{
                width: "auto",
                marginLeft: "-40px"
            }}>{this.props.a} + {this.props.b} = {parseInt(String(this.props.a)) + parseInt(String(this.props.b))}
            </div>
        )
    }

    render() {
        return this.alertPlusNumberByProps()
    }
}