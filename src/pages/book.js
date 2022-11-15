import React from "react";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { Image } from "react-bootstrap";



export default class BookPage extends React.Component {
    constructor() {
        super();
        this.state={
            books: [],
        }
    }

    fetchBook = async() => {
        /// bypass cors policy, request temporary cors bypass in https://cors-anywhere.herokuapp.com/corsdemo
        /// and then request bypass
        var corsdemo = "https://cors-anywhere.herokuapp.com/";
        var url = corsdemo + "https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-books?page=0&categoryId=11";
        // var url = "https://jsonplaceholder.typicode.com/users";

        var response = await axios.get(url);
        this.setState({
            books: response.data
        });
        console.log(response.data);

        for (let i = 0; i < this.state.books.length; i++) {
            console.log(this.state.books[i].title);
        }
    }

    componentDidMount = () => {
        this.fetchBook();
    }

    render() {
        return (
            <div className="flex min-h-screen flex-col justify-center items-center  py-10 sm:py-12">
               <Table responsive striped>
                <thead>
                    <tr>
                        <th>Cover</th>
                        <th>Book title</th>
                        <th>Description</th>
                        {/* <th>Authors</th> */}
                    </tr>
                </thead>
                <tbody>
                    {this.state.books.map((value, index) => {
                        return  (
                            <tr key={index}>
                                <td>
                                    <img src={value.cover_url}/>
                                </td>
                                <td>{value.title}</td>
                                <td>{value.description}</td>

                            </tr>
                        )
                    })}
                </tbody>
                </Table>
            </div>
        );
    }
}
