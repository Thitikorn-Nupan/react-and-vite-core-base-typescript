import {Component} from "react";
// *** clear
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
    styles : object,
    classesName1 : string,
    classesName2 : string,
    classesName3 : string
}

export class AlertMessageComponent extends Component<MyProps,MyState> {

    private readonly sayHiMessages : string[] = ["Nice to meet you","Greeting","What are you doing?"];

    constructor(props : MyProps) {
        super(props);
        this.state = {
            message : props.message,
            // ** for setting css on attributes style
            styles : {
                fontSize: "20px",
                fontWeight: "bold"
            },
            classesName1 : "alert alert-warning mt-3",
            classesName2 : "alert alert-primary mt-3",
            classesName3 : "alert alert-dark mt-3",
        }
    }

    componentDidMount() {
        console.log('AlertMessageComponent did mount')
    }

    private sayHi1 () {
        // ** JSX write inside return ( html tag ) ** by default it can not be multiple tags
        return (
            // *** in react we write style inside style={{ <attributes css>:<value> }}
            <p className="alert alert-success mt-3" style={{fontSize: "20px", fontWeight: "bold"}}>
                How are you?
            </p>
        )
    }

    private sayHi2() {
        // ** or set styles / classes as variables
        return <p className={this.state.classesName1} style={this.state.styles}>
            {this.state.message}
        </p>
    }

    // *** sayHi3 and 4 are same but 4 get array from props
    private sayHi3() {
        return (
            this.sayHiMessages.map(
                (message : string) => (
                <p key={message} className={this.state.classesName2} style={this.state.styles}>
                    {message}
                </p>
            ))
        )
    }

    private sayHi4() {
        return (
            // *** set messages of props on <AlertMessageComponent messages={} />
            this.props.messages.map(
                (message : string) => (
                    <p key={message} className={this.state.classesName3} style={this.state.styles}>
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