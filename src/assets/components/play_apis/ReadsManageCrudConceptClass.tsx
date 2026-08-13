import {ChangeEvent, Component} from "react";
import {User} from "../../entities/user.ts";
import {Product} from "../../entities/product.ts";
import {CreateConceptClass} from "./CreateConceptClass.tsx";
import {UpdateConceptClass} from "./UpdateConceptClass.tsx";
import {DeleteConceptClass} from "./DeleteConceptClass.tsx";

type State = {
    users: User[],
    products: Product[],
    option: number
}
type Props = {}

export class ReadsManageCrudConceptClass extends Component<Props, State> {

    private readonly fakeStoreApi: string[] = [
        "https://fakestoreapi.com/users?limit=5",
        "https://fakestoreapi.com/products?limit=5"
    ]
    private users: User[] = []
    private products: Product[] = []

    constructor(props: Props) {
        super(props);
        // initial state
        this.state = {
            users: [],
            products: [],
            option: -1
        }
    }

    // it works just once time when component is rendered
    componentDidMount = async () : Promise<void> => {
        const usersFetch = await fetch(this.fakeStoreApi[0]);
        const productsFetch = await fetch(this.fakeStoreApi[1]);
        // convert res to json
        const users = await usersFetch.json();
        const products = await productsFetch.json();
        this.setState({
            users: users,
            products: products
        })
        // if you use .js this method it's not nessessory
        this.setupUsersAndProductsObjects()
    }

    // work
    private setupUsersAndProductsObjects = () : void => {
        for (let i = 0; i < this.state.users?.length; i++) {
            const user = new User(
                this.state.users[i].id,
                this.state.users[i].email,
                this.state.users[i].username,
                this.state.users[i].password
            );
            this.users.push(user);
        }
        for (let i = 0; i < this.state.products?.length; i++) {
            const product = new Product(
                this.state.products[i].id,
                this.state.products[i].title,
                this.state.products[i].price,
                this.state.products[i].description,
                this.state.products[i].image
            );
            this.products.push(product);
        }
    }

    private handleChangeOption = async (event: ChangeEvent<HTMLInputElement>) : Promise<void> => {
        this.setState({option: Number(event.target?.value)})
    }

    private usersTable() : JSX.Element {
        return (
            <div>
                <table className="table mt-3 w-75" style={{margin: "0 auto"}}>
                    <thead className=" table-secondary">
                    <tr>
                        <th>Id</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Password</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.users?.map((user: User) => (
                            // if I called by this.handle2OnRowClick ** student will be undefined
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>{user.username}</td>
                                <td>{user.password}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        )
    }

    private productsTable(): JSX.Element {
        return (
            <div>
                <table className="table mt-3 w-100" style={{margin: "0 auto"}}>
                    <thead className="table-secondary">
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
                        this.products?.map((product: Product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.title}</td>
                                <td>{product.price}</td>
                                <td>{product.description}</td>
                                <td>
                                    <img width={60} src={product.image} alt={"..."}/>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        )
    }

    render() : JSX.Element {
        // console.log(this.state.data); // console.log(this.users,this.products)
        let checkUsersExist, checkProductsExist, checkCreateProductSelect, checkUpdateProductSelect,
            checkDeleteProductSelect// checkProductsExist// , checkProductsExist,checkCreateProductSelect,checkUpdateProductSelect,checkDeleteProductSelect
        switch (this.state.option) {
            case 1:
                checkUsersExist = true
                break;
            case 2:
                checkProductsExist = true
                break;
            case 3:
                checkCreateProductSelect = true
                break;
            case 4:
                checkUpdateProductSelect = true
                break;
            case 5:
                checkDeleteProductSelect = true
                break;
            default:
                break
        }
        return (
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

                    <div className="form-check">
                        <input className="form-check-input"
                               type="radio"
                               name="option"
                               value="3"
                               onChange={this.handleChangeOption}
                        />
                        <label className="form-check-label">
                            Create Product
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input"
                               type="radio"
                               name="option"
                               value="4"
                               onChange={this.handleChangeOption}
                        />
                        <label className="form-check-label">
                            Update Product
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input"
                               type="radio"
                               name="option"
                               value="5"
                               onChange={this.handleChangeOption}
                        />
                        <label className="form-check-label">
                            Delete Product
                        </label>
                    </div>
                </div>
                {checkUsersExist && this.usersTable()}
                {checkProductsExist && this.productsTable()}
                {checkCreateProductSelect && <CreateConceptClass/>}
                {checkUpdateProductSelect && <UpdateConceptClass/>}
                {checkDeleteProductSelect && <DeleteConceptClass/>}
            </div>
        )
    }
}