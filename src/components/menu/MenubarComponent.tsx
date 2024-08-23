import {Component} from "react";
import {Link, Outlet} from "react-router-dom";

export class MenubarComponent extends Component {
    render() {
        return (
                <>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Eighth navbar example">
                        <div className="container" style={{maxWidth: "290px", margin: "0 auto"}}>
                            <Link className="navbar-brand" to={"/"}>
                                <i className="fa-solid fa-house p-2"></i>Project React + Vite Core
                            </Link>
                            <div className="collapse navbar-collapse" id="navbarsExample07">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown"
                                           aria-expanded="false">Topic
                                        </a>
                                        <ul className="dropdown-menu">
                                            {/* <Link> is used to set the URL and keep track of browsing history. */}
                                            <li><Link className="dropdown-item" to={"/alerts-with-classes"}>Alerts Message With Class</Link></li>
                                            <li><Link className="dropdown-item" to={"/forms-with-classes"}>Forms Inside Class</Link></li>
                                            <li><Link className="dropdown-item" to={"/forms-with-functions"}>Forms Inside Function</Link></li>
                                            <li><Link className="dropdown-item" to={"/lists-with-classes"}>Lists/Tables Inside Class</Link></li>
                                            <li><Link className="dropdown-item" to={"/apply-events"}>Apply With Events</Link></li>
                                            <li><Link className="dropdown-item" to={"/apply-events-js"}>Apply Js With Events</Link></li>
                                            <li><Link className="dropdown-item" to={"/apply-api"}>Apply With Api</Link></li>
                                            <li><Link className="dropdown-item" to={"/apply-api-js"}>Apply Js With Api</Link></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                    <Outlet/>
                </>
        );
    }
}