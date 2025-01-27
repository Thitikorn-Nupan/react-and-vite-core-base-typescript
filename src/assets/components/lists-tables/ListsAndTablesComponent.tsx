import {Component} from "react";
import {Student} from "../../entities/student.ts";

type Props = {
    students: Student[] | null
}
type State = {
    styleRow1 : string,
    styleRow2 : string,
    styleRow3 : string,
    selectedIndex : number | null
}

export class ListsAndTablesComponent extends Component<Props, State> {

    private students : Student[]

    constructor(props: Props) {
        super(props);
        this.students = []
        this.students.push(new Student(1, "Peter Parker", 26))
        this.students.push(new Student(2, "Mark Ryder", 25))
        this.students.push(new Student(3, "Json Slider", 23))
        this.state = {
            styleRow1: "",
            styleRow2: "",
            styleRow3: "",
            selectedIndex : null
        }
    }

    // ** Table1 no loop
    // ** Bad logic
    private handle1OnRowClick = (student : Student) => {
        console.log(student.sid, student.fullname, student.age)
        if (student.sid === 1) {
            this.setState({
                styleRow1: 'table-dark'
            })
        }
        if (student.sid !== 1) {
            this.setState({
                styleRow1: ''
            })
        }
        if (student.sid === 2) {
            this.setState({
                styleRow2: 'table-dark'
            })
        }
        if (student.sid !== 2) {
            this.setState({
                styleRow2: ''
            })
        }
        if (student.sid === 3) {
            this.setState({
                styleRow3: 'table-dark'
            })
        }
        if (student.sid !== 3) {
            this.setState({
                styleRow3: ''
            })
        }
    }

    private table1StudentsNoLoop() {
        return (
            <>
                <div>
                    <h3 style={{marginLeft: "320px"}}>** No Loop</h3>
                    <table className="table mt-3 w-50" style={{margin: "0 auto"}}>
                        <thead className="table-dark">
                        <tr>
                            <th>Id</th>
                            <th>Fullname</th>
                            <th>Age</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/*
                             all tag can have event
                             Note if you pass arg on handle function
                             You have to use as function void (no return)
                             () => this.<function>(<args>)
                        */}


                        <tr style={{"cursor":"pointer"}} className={this.state.styleRow1} onClick={() => this.handle1OnRowClick(this.students[0])}>
                            <td>{this.students[0].sid}</td>
                            <td>{this.students[0].fullname}</td>
                            <td>{this.students[0].age}</td>
                        </tr>
                        <tr style={{"cursor":"pointer"}} className={this.state.styleRow2} onClick={() => this.handle1OnRowClick(this.students[1])}>
                            <td>{this.students[1].sid}</td>
                            <td>{this.students[1].fullname}</td>
                            <td>{this.students[1].age}</td>
                        </tr>
                        <tr style={{"cursor":"pointer"}} className={this.state.styleRow3} onClick={() => this.handle1OnRowClick(this.students[2])}>
                            <td>{this.students[2].sid}</td>
                            <td>{this.students[2].fullname}</td>
                            <td>{this.students[2].age}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </>
        )
    }





    // ** Table2
    private handle2OnRowClick = (student : Student) => {
        // console.log(student.sid, student.fullname, student.age)
        this.setState({
            // selectedIndex holds id for condition it's real time
            selectedIndex: student.sid,
        })
    }

    private table2StudentsWithLoop() {
        return (
            <>
                <div>
                    <h3 style={{marginLeft: "320px"}}>** With Loop</h3>
                    <table className="table mt-3 w-50" style={{margin: "0 auto"}}>
                        <thead className="table-dark">
                        <tr>
                            <th>Id</th>
                            <th>Fullname</th>
                            <th>Age</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.students?.map(
                                (student : Student) => (
                                    // if I called by this.handle2OnRowClick ** student will be undefined
                                    <tr
                                        style={{"cursor":"pointer"}}
                                        className={this.state.selectedIndex === student.sid ? 'table-dark' : ''}
                                        key={student.sid}
                                        // event below effects to dynamic condition ** this.state.selectedIndex === student.sid ? 'table table-dark' : ''
                                        onClick={() => this.handle2OnRowClick(student)}
                                    >
                                        <td>{student.sid}</td>
                                        <td>{student.fullname}</td>
                                        <td>{student.age}</td>
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
        return (
            <>
                <div className={"container mt-4"}>
                    {this.table1StudentsNoLoop()}
                    {this.table2StudentsWithLoop()}
                </div>
            </>
        )
    }
}