import {Component} from "react";


type People = {
    id: number,
    name: string,
    profession: string,
    accomplishment: string,
    imageId: string
}

export class ListsAndKeys extends Component {

    private readonly people1: string[] = [
        'Creola Katherine Johnson: mathematician',
        'Mario José Molina-Pasquel Henríquez: chemist',
        'Mohammad Abdus Salam: physicist',
        'Percy Lavon Julian: chemist',
        'Subrahmanyan Chandrasekhar: astrophysicist'
    ];

    private people2: People[] = [{
        id: 0,
        name: 'Creola Katherine Johnson',
        profession: 'mathematician',
        accomplishment: 'spaceflight calculations',
        imageId: 'MK3eW3A'
    }, {
        id: 1,
        name: 'Mario José Molina-Pasquel Henríquez',
        profession: 'chemist',
        accomplishment: 'discovery of Arctic ozone hole',
        imageId: 'mynHUSa'
    }, {
        id: 2,
        name: 'Mohammad Abdus Salam',
        profession: 'physicist',
        accomplishment: 'electromagnetism theory',
        imageId: 'bE7W1ji'
    }, {
        id: 3,
        name: 'Percy Lavon Julian',
        profession: 'chemist',
        accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
        imageId: 'IOjWm71'
    }, {
        id: 4,
        name: 'Subrahmanyan Chandrasekhar',
        profession: 'astrophysicist',
        accomplishment: 'white dwarf star mass calculations',
        imageId: 'lrWQx8l'
    }]

    private getImageUrl(imageId: string): string {
        return (
            'https://i.imgur.com/' +
            imageId +
            's.jpg'
        );
    }

    listOfPeople2() {
        const chemists: People[] = this.people2
        /*.filter((person: People) =>
            person.profession === 'chemist'
        );
        */
        const listItems = chemists.map(person =>
            <li className={"pb-3 sm:pb-4"} key={person.id}>
                {/*
                Keys must be unique among siblings. However, it’s okay to use the same keys for JSX nodes in different arrays.
                Keys must not change or that defeats their purpose! Don’t generate them while rendering.

                Imagine that files on your desktop didn’t have names. Instead, you’d refer to them by their order —
                the first file, the second file, and so on. You could get used to it, but once you delete a file,
                it would get confusing. The second file would become the first file, the third file would be the second file, and so on.
                */}
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src={this.getImageUrl(person.imageId)}
                             alt="Neil image"/>
                    </div>
                    <div className="flex-1 min-w-0 mt-6">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-black">
                            {person.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {person.accomplishment}

                        </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-black">
                        {person.profession}
                    </div>
                </div>
            </li>
        );
        return (
            <>
                <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700" style={{margin: "0 auto"}}>
                    {listItems}
                </ul>
            </>
        )
    }


    listOfPeople() {
        const listItems = this.people1.map(person => <li className={"list-group-item"}>{person}</li>);
        return <ul className="list-group">{listItems}</ul>
    }

    listOfPeople3() {
        return (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Picture
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Accomplishment
                        </th>
                        <th scope="col" className="px-6 py-3">
                            profession
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.people2.map( (person: People) => {
                        return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={person.id}>
                            <th scope="row">
                                <img className="w-8 h-8 rounded-full ml-3.5" src={this.getImageUrl(person.imageId)}
                                     alt="Neil image"/>
                            </th>
                            <td className="px-6 py-4">
                                {person.name}
                            </td>
                            <td className="px-6 py-4">
                                {person.accomplishment}
                            </td>
                            <td className="px-6 py-4">
                                {person.profession}
                            </td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </div>

        )
    }


    render() {
        return (
            <>
                <div className="container" style={{"maxWidth": "700px", margin: "0 auto"}}>
                    {
                        //  this.listOfPeople()
                        // you'll have this error Warning: Each child in a list should have a unique “key” prop.
                    }
                    {
                        this.listOfPeople2()
                    }

                    {this.listOfPeople3()}

                </div>
            </>
        )
    }
}