import {Component} from "react";

export class DeleteConceptClass extends Component {

    handleRequestDeleteMethod = async (id: number) => {
        // console.log(this.state.values[0],this.state.values[1])
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: "DELETE",
        })
        // console.log(response) // Response {type: 'cors', url: 'https://fakestoreapi.com/products', redirected: false, status: 200, ok: true, …}
        const json = await response.json() // it will return you an object with a new id as {id: 21}
        alert(`The id ${json.id} deleted`)
    }

    render() {
        return (
            <div className="mt-4 w-100">
                <table className="table mt-3 w-75" style={{margin: "0 auto"}}>
                    <thead className="table table-secondary">
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Category</th>
                        <th>Option</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>test product</td>
                        <td> 13.5</td>
                        <td> lorem ipsum set</td>
                        <td><img width={"60px"} src={"https://i.pravatar.cc"}/></td>
                        <td> electronic</td>
                        <td>
                            <button className={"btn btn-warning"}
                                    onClick={() => this.handleRequestDeleteMethod(7)}>Delete
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}