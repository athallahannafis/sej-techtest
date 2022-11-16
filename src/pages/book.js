import React from "react";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { Button, Image, Pagination, Spinner } from "react-bootstrap";



export default class BookPage extends React.Component {
    constructor() {
        super();
        this.state={
            books: [],
            page: 0,
            loading: true,
        }
    }

    fetchBook = async() => {
        try {

            /**
             * url to bypass cors policy
             * https://scrappy-php.herokuapp.com/?url=
                https://api.allorigins.win/raw?url=
                https://cors-get-proxy.sirjosh.workers.dev/?url=
                https://secret-ocean-49799.herokuapp.com/
                https://cors.eu.org/
                https://cors-proxy.tk/?url=


                https://fast-dawn-89938.herokuapp.com/
                https://cors-anywhere.herokuapp.com/
                https://proxy.cors.sh/
             */
            this.setState({
                books: [],
                loading: true
            })
            var corsdemo = "https://fast-dawn-89938.herokuapp.com/";
            
            var url = corsdemo + "https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-books?size=7&page="+ this.state.page +"&categoryId=11";
            // var url = "https://jsonplaceholder.typicode.com/users";
    
            var response = await axios.get(url);
            this.setState({
                books: response.data,
                loading: false,
            });
            // console.log(response.data);
        } catch (e) {
            this.setState({
                loading: false,
            });
        }
        
    }

    pagination = (flag) =>{
        if (flag == "Next") {
            this.setState({
                page: this.state.page+1,
            });
            console.log(flag);
        } else {
            if (this.state.page > 0) {
                this.setState({
                    page: this.state.page-1,
                })
            }
            console.log(flag);
        }
        this.fetchBook();
    }

    componentDidMount = () => {
        this.fetchBook();
    }

    render() {
        return (
            <div className="flex min-h-screen flex-col justify-center items-center  py-10 sm:py-12">
                {
                this.state.loading == false ?
               <Table responsive hover striped>
                <thead>
                    <tr>
                        <th>Bookmark</th>
                        <th>Cover</th>
                        <th>Book title</th>
                        <th>Description</th>
                        <th>Authors</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.books.map((value, index) => {
                        return  (
                            <tr key={index}>
                                <td>
                                    
                                </td>
                                <td>
                                    <img width={200} src={value.cover_url}/>
                                </td>
                                <td>{value.title}</td>
                                <td>{value.description}</td>
                                <td>{value.authors}</td>
                            </tr>
                        )
                    })}
                </tbody>
                </Table> : 
                <Spinner animation="border" />
                }
                <div className="my-10"/>
                <Pagination>
                    <Pagination.Prev onClick={() => {this.pagination("Prev")}} />
                    <Pagination.Item>{this.state.page}</Pagination.Item>
                    <Pagination.Next onClick={() => {this.pagination("Next")}} />
                </Pagination>
                <div className="flex flex-row justify-center content-center">
                    {/* <Button onClick={() => {this.pagination("Prev")}} variant="outline-primary">Prev</Button>
                    <div className="w-2"/>
                    <p>{this.state.page}</p>
                    <div className="w-2"/>
                <Button onClick={() => {this.pagination("Next")}} variant="outline-primary">Next</Button> */}
                </div>

            </div>
        );
    }
}
