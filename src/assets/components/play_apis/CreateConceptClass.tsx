import {Component} from "react";
import * as React from "react";

// Clear
type Props = {

}
type State = {
    names: string[],
    values: string[],
}
export class CreateConceptClass extends Component<Props,State> {
    constructor(props:Props) {
        super(props);
        // ** way to declare array of state
        this.state = {
            names : [], // stores name of input
            values : [], // stores value of input
        }
    }

    componentDidMount() {

    }

    // ** Bad way
    // this method work after double-click on input
    private handleEachInputToInputsArray = (event: React.FormEvent<HTMLInputElement>) => {
        // **
        const name = event.currentTarget?.name; // ** name it means we get name attribute on input tag
        // console.log(`name attribute is ${name}`)
        const value = event.currentTarget?.value; // ** value hols as value

        /*
            if (name === "title") {
                this.setState({
                    title : event.target.value,
                })
            }
            else if (name === "price") {
                this.setState({
                    price : event.target.value,
                })
            }
            else if (name === "description") {
                this.setState({
                    description : event.target.value,
                })
            }
            else if (name === "image") {
                this.setState({
                    image : event.target.value,
                })
            }
            else if (name === "category") {
                this.setState({
                    category: event.target.value,
                })
            }
        */
        console.log(name, value);
        // ** way to set array of state
        this.setState(preState => ({
                // way to set each element of array names , values
                //    : [...key , value]
                names : [...preState.names, name] , //
                values : [...preState.values, value] ,
            }
        ))


    }

    private handleRequestPostMethod = async (event:React.FormEvent<HTMLFormElement>) => {

        event.preventDefault() // stop going another page

        // console.log(this.state.names) // ['title', 'price', 'description', 'image', 'category']
        // console.log(this.state.values) // ['Java', '350', 'Test', 'Test', 'Book']

        const response = await fetch('https://fakestoreapi.com/products', {
            method: "POST",
            body: JSON.stringify(
                {
                    title: this.state.values[0],
                    price: this.state.values[1],
                    description: this.state.values[2],
                    image: this.state.values[3],
                    category: this.state.values[4]
                }
            )
        })
        const json = await response.json() // it will return you an object with a new id as {id: 21}
        alert(`The new id is ${json.id}`)
    }

    render() {
        return (
            <div className="mt-4 w-100">
                <form className={"form-control p-2"} onSubmit={this.handleRequestPostMethod}>
                    <h3>***** Double click after input</h3>
                    <div className="mb-3">
                        Title
                        <input type="text" className="form-control" name="title" onDoubleClick={this.handleEachInputToInputsArray} required={true}/>
                    </div>
                    <div className="mb-3">
                        Price
                        <input type="number" className="form-control" name="price"
                               onDoubleClick={this.handleEachInputToInputsArray} required={true}/>
                    </div>
                    <div className="mb-3">
                        Description
                        <input type="text" className="form-control" name="description"
                               onDoubleClick={this.handleEachInputToInputsArray} required={true}/>
                    </div>
                    <div className="mb-3">
                        Image Url
                        <input type="text" className="form-control" name="image"
                               onDoubleClick={this.handleEachInputToInputsArray} required={true}/>
                    </div>
                    <div className="mb-3">
                        Category
                        <input type="text" className="form-control" name="category"
                               onDoubleClick={this.handleEachInputToInputsArray} required={true}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}