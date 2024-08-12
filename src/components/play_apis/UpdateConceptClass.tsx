import {ChangeEvent, Component} from "react";

type Props = {}
type State = {
    title: string | null,
    price: number | null,
    description: string | null,
    image: string | null,
    category: string | null,
}

export class UpdateConceptClass extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        // ** way to declare array of state
        this.state = {
            title: null,
            price: null,
            description: null,
            image: null,
            category: null,
            // names : [], // stores name of input
            // values : [], // stores value of input
        }
    }

    // handle function can specify async function
    handleRequestPutMethod = async (id: number) => {
        console.log(this.state.title, this.state.price);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: "PUT",
            body: JSON.stringify(
                {
                    title: this.state.title,
                    price: this.state.price,
                    description: this.state.description,
                    image: this.state.image,
                    category: this.state.category
                }
            )
        })
        // console.log(response) // Response {type: 'cors', url: 'https://fakestoreapi.com/products', redirected: false, status: 200, ok: true, …}
        const json = await response.json() // it will return you an object with a new id as {id: 21}
        alert(`The id ${json.id} updated`)
    }


    handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        // **
        // const name = event.target.name; // name it means we get name attribute on input tag
        // console.log(`name attribute is ${name}`)
        const value = event.target.value; // value hols as value

        // ** way to set array of state
        this.setState({
            title: value
        })

    }

    handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
        // **
        // const name = event.target.name; // name it means we get name attribute on input tag
        // console.log(`name attribute is ${name}`)
        const value = event.target.value; // value hols as value

        // ** way to set array of state
        this.setState({
            price: Number(value)
        })

    }

    handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        // **
        // const name = event.target.name; // name it means we get name attribute on input tag
        // console.log(`name attribute is ${name}`)
        const value = event.target.value; // value hols as value

        // ** way to set array of state
        this.setState({
            description: value
        })

    }

    handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        // **
        // const name = event.target.name; // name it means we get name attribute on input tag
        // console.log(`name attribute is ${name}`)
        const value = event.target.value; // value hols as value

        // ** way to set array of state
        this.setState({
            image: value
        })

    }


    handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
        // **
        // const name = event.target.name; // name it means we get name attribute on input tag
        // console.log(`name attribute is ${name}`)
        const value = event.target.value; // value hols as value

        // ** way to set array of state
        this.setState({
            category: value
        })

    }

    render() {
        return (
            <div className="mt-4 w-100">
                <form className={"form-control p-2"}>
                    <div className="mb-3">
                        Title
                        <input type="text" className="form-control" name="title"
                               onChange={this.handleTitleChange}/>
                    </div>
                    <div className="mb-3">
                        Price
                        <input type="number" className="form-control" name="price"
                               onChange={this.handlePriceChange}/>
                    </div>
                    <div className="mb-3">
                        Description
                        <input type="text" className="form-control" name="description"
                               onChange={this.handleDescriptionChange}/>
                    </div>
                    <div className="mb-3">
                        Image Url
                        <input type="text" className="form-control" name="image"
                               onChange={this.handleImageChange}/>
                    </div>
                    <div className="mb-3">
                        Category
                        <input type="text" className="form-control" name="category"
                               onChange={this.handleCategoryChange}/>
                    </div>
                    <button type="button" className="btn btn-primary"
                            onClick={() => this.handleRequestPutMethod(7)}>Submit
                    </button>
                </form>
            </div>
        )
    }
}