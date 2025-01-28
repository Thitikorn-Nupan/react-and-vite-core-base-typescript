import {Component} from "react";
// import {covertClassToFunction} from "./covertClassToFunction.jsx";



class ReadsConceptJsClass extends Component {

    fakeStoreApi = [
        "https://fakestoreapi.com/users?limit=5",
        "https://fakestoreapi.com/products?limit=5",
        "https://fakestoreapi.com/users"
    ]

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            products: [],
            option: -1
        }
    }

    // it works just once time when component is render
    componentDidMount = async () => {
        console.log('componentDidMount() is initial (Data fetched)')
        const users = await fetch(this.fakeStoreApi[0]);
        const products = await fetch(this.fakeStoreApi[1]);
        const resultUser = await users.json();
        const resultProducts = await products.json();

        this.setState({
                users: resultUser,
                products: resultProducts
            }
        )


    }


    usersTable() {
        console.log(this.state.users)
        return (
            <>
                <div>
                    <table className="table mt-3 w-100" style={{margin: "0 auto"}}>
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
                                            <button className={"btn btn-warning"}
                                                    onClick={() => this._editUser(user.id)}>edit
                                            </button>
                                            <button className={"btn btn-danger"}
                                                    onClick={() => this._deleteUser(user.id)}>delete
                                            </button>
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


    _editUser(id) {
        this.props.navigate(`/users/edit?id=${id}`);
    }

    _deleteUser = async (id) => {
        await fetch(this.fakeStoreApi[2] + `/${id}`, {
            method: "DELETE"
        }).then(res => {
            if (res.status === 200) {
                alert('deleted successfully')
            }
        })

    }

    productsTable() {
        console.log(this.state.products)
        return (
            <>
                <div>
                    <table className="table mt-3 w-100" style={{margin: "0 auto"}}>
                        <thead className=" table-secondary">
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Image</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.products?.map(
                                (product) => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.title}</td>
                                        <td>{product.price}</td>
                                        <td>{product.description}</td>
                                        <td>
                                            <img width={60} src={product.image}/>
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

    handleChangeOption = async (event) => {
        this.setState({
            option: Number(event.target?.value)
        })
    }

    render() {
        // console.log(this.state.data);
        // console.log(this.users,this.products)
        let checkUsersExist, checkProductsExist // ,checkCreateProductSelect,checkUpdateProductSelect,checkDeleteProductSelect// checkProductsExist// , checkProductsExist,checkCreateProductSelect,checkUpdateProductSelect,checkDeleteProductSelect
        switch (this.state.option) {
            case 1:
                checkUsersExist = true
                break;
            case 2:
                checkProductsExist = true
                break;
        }


        return (
            <>
                <div className={"container mt-4 w-50"}>
                    <div className={"container w-25"} style={{marginLeft: "200px"}}>
                        <div className="form-check">
                            <input className="form-check-input"
                                   type="radio"
                                   name="option"
                                   value="1"
                                   onChange={this.handleChangeOption}
                            />
                            <label className="form-check-label">
                                Reads Users
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input"
                                   type="radio"
                                   name="option"
                                   value="2"
                                   onChange={this.handleChangeOption}
                            />
                            <label className="form-check-label">
                                Reads Products
                            </label>
                        </div>

                    </div>
                    {checkUsersExist && this.usersTable()}
                    {checkProductsExist && this.productsTable()}
                    {/*{checkCreateProductSelect && <CreateConceptClass/>}
                    {checkUpdateProductSelect && <UpdateConceptClass/>}
                    {checkDeleteProductSelect && <DeleteConceptClass />}*/}
                </div>
            </>
        )
    }

}

// export default covertClassToFunction(ReadsConceptJsClass)