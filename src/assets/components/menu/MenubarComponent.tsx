import {Component} from "react";
import {Link, Outlet} from "react-router-dom";

type MyProps = {}
type MyState = {
    enableDropdown: boolean
}

export class MenubarComponent extends Component<MyProps, MyState> {

    private readonly routeLinks : {label:string,to:string}[] = [
        {label : 'Alerts Message With Class' , to: '/alerts-with-classes'},
        {label : 'Forms Inside Class' , to: '/forms-with-classes'},
        {label : 'Forms Inside Function' , to: '/forms-with-functions'},
        {label : 'Lists/Tables Inside Class' , to: '/lists-with-classes'},
        {label : 'Apply With Events' , to: '/apply-events'},
        {label : 'Apply Js With Events' , to: '/apply-events-js'},
        {label : 'Lists/Tables Inside Class' , to: '/apply-api'},
        {label : 'Apply With Api' , to: '/apply-api'},
        {label : 'Apply Js With Api' , to: '/apply-api-js'},
        {label : 'Line Login' , to: '/line-login'},
        {label : 'Ref Of Hook' , to: '/ref-of-hook'},
        {label : 'Ref Of Hook Add Styles' , to: '/ref-of-hook-add-styles'},
    ]

    constructor(props: MyProps) {
        super(props);
        this.state = {
            enableDropdown: true
        }
    }

    handleOnButtonClick = () : void => {
        this.setState({
            enableDropdown: !this.state.enableDropdown
        })
    }

    render() : JSX.Element {
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Eighth navbar example">
                    <div className="container" style={{maxWidth: "290px", margin: "0 auto"}}>
                        <Link className="navbar-brand" to={"/"}>
                            <i className="fa-solid fa-house p-2"></i>Project React + Vite Core
                        </Link>
                        {/* dropdown */}
                        <div className="navbar-collapse" id="navbarsExample07">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown"
                                       aria-expanded="false">Topic
                                    </a>
                                    {/* <Link> is used to set the URL and keep track of browsing history. */}
                                    <ul className="dropdown-menu">
                                        <li>
                                            {this.routeLinks.map((route : {label:string,to:string} , index : number) =>
                                                <Link className="dropdown-item" key={index} to={route.to}>
                                                    {route.label}
                                                </Link>
                                            )}
                                        </li>
                                        {/*<li><Link className="dropdown-item" to={"/alerts-with-classes"}>Alerts Message With Class</Link></li>
                                        <li><Link className="dropdown-item" to={"/forms-with-classes"}>Forms Inside Class</Link></li>
                                        <li><Link className="dropdown-item" to={"/forms-with-functions"}>Forms Inside Function</Link></li>
                                        <li><Link className="dropdown-item" to={"/lists-with-classes"}>Lists/Tables Inside Class</Link></li>
                                        <li><Link className="dropdown-item" to={"/apply-events"}>Apply With Events</Link></li>
                                        <li><Link className="dropdown-item" to={"/apply-events-js"}>Apply Js With Events</Link></li>
                                        <li><Link className="dropdown-item" to={"/apply-api"}>Apply With Api</Link></li>
                                        <li><Link className="dropdown-item" to={"/apply-api-js"}>Apply Js With Api</Link></li>
                                        <li><Link className="dropdown-item" to={"/line-login"}>Line Login</Link></li>
                                        <li><Link className="dropdown-item" to={"/ref-of-hook"}>Ref Of Hook</Link></li>
                                        <li><Link className="dropdown-item" to={"/ref-of-hook-add-styles"}>Ref Of Hook Add Styles</Link></li>*/}
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                {/* <nav className="border-gray-200 bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo"/>
                            <span
                                className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                        </a>
                        <button data-collapse-toggle="navbar-hamburger" type="button"
                                onClick={this.handleOnButtonClick}
                                className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                aria-controls="navbar-hamburger" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                            </svg>
                        </button>

                        {this.state.enableDropdown === false && (
                            <div className="mb:hidden w-full" id="navbar-hamburger">
                                <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">

                                    <li>
                                        <a href="#"
                                           className="block py-2 px-3 text-white bg-blue-700 rounded dark:bg-blue-600"
                                           aria-current="page">Home</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Services</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white">Pricing</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Contact</a>
                                    </li>
                                </ul>
                            </div>
                        )}

                    </div>
                </nav>*/}


                {/* all router components render inside Outlet */}
                <Outlet></Outlet>
            </>
        );
    }
}