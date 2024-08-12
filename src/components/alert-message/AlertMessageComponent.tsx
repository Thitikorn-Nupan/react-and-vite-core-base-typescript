import {Component} from "react";

// *** we have to set type of props in .ts file
// *** this is difference js and ts
// ** if you need to use props , state you have to declare as a type
// ** and use type on Component<MyProps , MyState>
type MyProps = {
    message: string,
    messages : string[]
}
type MyState = {
    message: string
}

export class AlertMessageComponent extends Component<MyProps,MyState> {

    private readonly sayHiMessages : string[] = ["Nice to meet you","Greeting","What are you doing?"];

    constructor(props : MyProps) {
        super(props);
        this.state = {
            message : props.message
        }
    }

    componentDidMount() {
        console.log('AlertMessageComponent did mount')
    }

    sayHi1 () {
        // ** JSX write inside return ( html tag ) ** by default it can not be multiple tags
        return (
            // *** in react we write style inside style={{ <attributes css>:<value> }}
            <p className="alert alert-success mt-3" style={{fontSize: "20px", fontWeight: "bold"}}>
                How are you?
            </p>
        )
    }

    sayHi2() {
        return <p className="alert alert-danger mt-3" style={{fontSize: "20px", fontWeight: "bold"}}>
            {this.state.message}
        </p>
    }

    sayHi3() {
        return (
            this.sayHiMessages.map(
                (message : string) => (
                <p key={message}
                   className={"alert alert-dark mt-3"}
                   style={{fontSize: "20px", fontWeight: "bold"}}>
                    {message}
                </p>
            ))
        )
    }

    sayHi4() {
        // *** i set messages of props on <AlertMessageComponent messages={} />
        return (
            this.props.messages.map(
                (message : string) => (
                    <p key={message}
                       className={"alert alert-warning mt-3"}
                       style={{fontSize: "20px", fontWeight: "bold"}}>
                        {message}
                    </p>
                ))
        )
    }



    render() {
        return (
            <>
                <div className={"container w-50"}>
                    {this.sayHi1()}
                    {this.sayHi2()}
                    {this.sayHi3()}
                    {this.sayHi4()}
                </div>
            </>
        );
    }
}