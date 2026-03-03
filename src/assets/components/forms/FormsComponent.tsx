import {ChangeEvent, Component} from "react";
import * as React from "react";

/**
 we have to set type of props in .ts file (this is difference between js and ts)
 if you need to use props & state you have to declare as a type
 and use type on Component<MyProps , MyState>
*/
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
    componentWillUnmount() {
        console.log("FormsComponent class is unmounted.");
    }

    // ** Form1
    private handleOnEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        // const target = event.target; // ** return tag
        // const value = target.value; // ** return value
        console.log(`email : ${event.target.value}`);
    }
    private handleOnUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(`username : ${event.target.value}`);
    }
    private handleOnButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        // can not get each inputs // ** <button type="button" class="btn btn-primary">Submit</button>
        console.log(event.target)
    }

    private form1WithHandleOnChange() {
        return (
            // write multiple tag inside <> tag p , a , dev , input , ...  </>
            <>
                <form className={"form-control p-2"}>
                <h3 className={"alert alert-primary"}>React Work With Form Basic *** Handle Functions *** Submit by button</h3>
                    <div className="mb-3">
                        Email
                        <input type="email" className="form-control" name="email" onChange={this.handleOnEmailChange}/>
                    </div>
                    <div className="mb-3">
                        Username
                        <input type="text" className="form-control" name="username" onChange={this.handleOnUsernameChange}/>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.handleOnButtonClick}>Submit</button>
                </form>
            </>
        )
    }



    //** Form2
    protected email: string = ""
    protected username: string = ""

    // *** focus return type FormEvent<HTMLInputElement> **  ChangeEvent<HTMLInputElement> or FormEvent<HTMLInputElement> work both
    // *** all event can use this React.FormEvent<HTMLInputElement> ??
    private handleOnEmailChangeForm2 = (event: React.FormEvent<HTMLInputElement>) => {
        // in FormEvent use currentTarget instead target
        if (event.currentTarget.value.length >= 10) {
            this.email = event.currentTarget.value;
        }else {
            console.log('should more than 10 characters');
        }
    }
    private handleOnUsernameChangeForm2 = (event: React.FormEvent<HTMLInputElement>) => {
        if (event.currentTarget.value.length >= 5) {
            this.username = event.currentTarget.value;
        } else {
            console.log('should more than 5 characters');
        }
    }
    private handleOnButtonClickForm2 = () => {
        console.log(this.email, this.username);
    }

    private form2WithHandleOnChangeSetToAttributeClass() {
        return (
            // write multiple tag inside <> tag p , a , dev , input , ...  </>
            <>
                <form className={"form-control p-2"}>
                    <h3 className={"alert alert-primary"}>React Work With Form *** Handle Functions Set to Attributes *** Submit by button</h3>
                    <div className="mb-3">
                        Email
                        <input type="email" className="form-control" name="email" onChange={this.handleOnEmailChangeForm2}/>
                    </div>
                    <div className="mb-3">
                        Username
                        <input type="text" className="form-control" name="username" onChange={this.handleOnUsernameChangeForm2}/>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.handleOnButtonClickForm2}>Submit</button>
                </form>
            </>
        )
    }




    //** Form3,4
    constructor(props: MyProps) {
        super(props);
        this.state = {
            email: '',
            username: '',
            enableChildComponent : false
        }
    }

    protected handleOnEmailChangeForm3 = (event: React.FormEvent<HTMLInputElement>) => {
        let email : string = "";
        if (event.currentTarget.value.length >= 10) {
            email = event.currentTarget.value;
        }
        this.setState({email: email})
    }
    protected handleOnUsernameChangeForm3 = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({username: event.currentTarget.value,})
    }
    protected handleOnButtonClickForm3 = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault() // block go to another path
        console.log(this.state.email, this.state.username)
    }

    protected form3WithHandleOnChangeAndStateHook() {
        return (
            // if you use onSubmit on tag form attributes all tags as required will work (you can check by click submit)
            <>
                <form className={"form-control p-2"} onSubmit={this.handleOnButtonClickForm3}>
                    <h3 className={"alert alert-primary"}>React Work With Form *** Handle Functions And State Hook *** Submit by form</h3>
                    <div className="mb-3">
                        Email
                        <input type="email"
                               className="form-control"
                               name="email"
                               placeholder={this.state.email}
                               onChange={this.handleOnEmailChangeForm3}
                               required={true}/>
                        <span className={(this.state.email.length <= 10) ? 'text-danger' : 'text-primary'}>{
                            (this.state.email.length <= 10) ? 'incorrect' : 'correct'
                        }
                        </span>
                    </div>
                    <div className="mb-3">
                        Username
                        <input type="text"
                               className="form-control"
                               name="username"
                               placeholder={this.state.username}
                               onChange={this.handleOnUsernameChangeForm3}
                               required={true}/>
                        <span className={(this.state.username.length <= 5) ? 'text-danger' : 'text-primary'}>{
                            (this.state.username.length <= 10) ? 'incorrect' : 'correct'
                        }
                        </span>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </>
        )
    }



    // ** Form4
    private handleOnCheckboxChange4 = () => {
        // just switch value after check box change
        this.setState({enableChildComponent: !this.state.enableChildComponent,})
    }

    private form4WithHandleOnChangeAndChildComponent = () => {
        let formChildComponent = null
        // Work with condition
        if (this.state.enableChildComponent) {
            formChildComponent = <FormChild a={-50} b={-50} />
        }
        return (
            <div className="form-check form-switch m-lg-2">
                <input className="form-check-input"
                       type="checkbox"
                       style={{"cursor": "pointer"}}
                       checked={this.state.enableChildComponent}
                       onChange={this.handleOnCheckboxChange4}/>
                <label className="form-check-label">Open Child Component</label>
                {formChildComponent ? formChildComponent : null}
            </div>
        )
    }


    render() {
        return (
            <div className={"container"}>
                <div className={"card mt-4"}>
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
        );
    }
}



type MyProps2 = {
    a: number,
    b: number
}
type MyState2 = {
    a: number,
    b: number,
    styles: object
}
class FormChild extends Component<MyProps2, MyState2> {

    constructor(props: MyProps2) {
        super(props);
        this.state = {
            a: props.a,
            b: props.b,
            styles: {
                width: "auto",
                marginLeft: "-40px"
            }
        }
    }

    // *** LifeCycle of Component
    // The next phase in the lifecycle is when a component is removed from the DOM, or unmounting as React likes to call it.
    // unmounted (n. ถอดออก)
    componentWillUnmount() {
        console.log("FormChild component is unmounted.")
    }

    private alertPlusNumberByProps = () => {
        return (
            <div className="alert alert-danger mt-3"
                 style={this.state.styles}>
                {this.props.a} + {this.props.b} = {parseInt(String(this.props.a)) + parseInt(String(this.props.b))}
            </div>
        )
    }

    render() {
        return (this.alertPlusNumberByProps())
    }
}