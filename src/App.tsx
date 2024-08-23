import {BrowserRouter, Routes, Route} from "react-router-dom";
// import './App.css'
import {MenubarComponent} from "./components/menu/MenubarComponent.tsx";
import {AlertMessageComponent} from "./components/alert-message/AlertMessageComponent.tsx";
import {FormsComponent} from "./components/forms/FormsComponent.tsx";
import {ListsAndTablesComponent} from "./components/lists-tables/ListsAndTablesComponent.tsx";
import {Student} from "./entities/student.ts";
import {
    Form1,
    Form2,
    Form3MultipleInputs,
    Form4setSateByHooks,
    Form5setStateAsObject, Form6setStateAsObjectDynamicInputs
} from "./components/forms/FormsFunctionsComponent.tsx";
import {LogicAndEvents} from "./components/play_events/LogicAndEvents.tsx";
import {ReadsConceptClass} from "./components/play_apis/ReadsConceptClass.tsx";
// js files work after you allow it on tsconfig.app.json file
// *** and we export by default no nned to {}
import ReadsConceptJsClass  from "./components/play_apis_js/ReadsConceptJsClass"
import UpdateConceptJsClass from "./components/play_apis_js/UpdateConceptJsClass";
import {LogicAndEventsJs} from "./components/play_events/LogicAndEventsJs";

/*Use .ts files:
For general TypeScript code that doesn’t involve JSX syntax, such as utility functions, business logic or library code.
Use .tsx files:
For writing React components or any TypeScript code that includes JSX syntax, such as building user interfaces in React.js applications.*/
function App() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                {/* path main "/" */}
                <Route path={"/"} element={<MenubarComponent/>}>
                    {/* *** sub path main "/todo1,2,3" (still render on path main) */}
                    <Route path={"alerts-with-classes"} element={<AlertMessageComponent message={"Hello, Form MyProps"} messages={["Greeting","What are you doing?"]} />}/>
                    <Route path={"forms-with-classes"} element={<FormsComponent email={""} username={""}/>}/>
                    <Route path={"forms-with-functions"} element={
                        <>
                            <Form1/>
                            <Form2/>
                            <Form3MultipleInputs/>
                            <Form4setSateByHooks  logMessage={() => "test"} frameworkDefault={"React"} />
                            <Form5setStateAsObject/>
                            <Form6setStateAsObjectDynamicInputs/>
                        </>
                    }/>
                    <Route path={"lists-with-classes"} element={
                        <ListsAndTablesComponent students={[new Student(1, "Peter Parker", 26),new Student(2, "Alex Ryder", 26),new Student(3, "Kevin Owner", 25)]}/>
                    }/>
                    <Route path={"apply-events"} element={ <LogicAndEvents/> }/>
                    <Route path={"apply-events-js"} element={ <LogicAndEventsJs /> }/>
                    <Route path={"apply-api"} element={
                        <ReadsConceptClass />
                    } />

                    <Route path={"apply-api-js"} element={
                        <ReadsConceptJsClass />
                    } />
                    {/* param as ?key=<value>*/}
                    <Route path={"users/edit"} element={
                        <UpdateConceptJsClass />
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
