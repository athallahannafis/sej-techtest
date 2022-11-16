import React from "react";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { Button, Image, Pagination, Spinner } from "react-bootstrap";
import { BsStar, BsStarFill, IconName } from "react-icons/bs";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NavigationBar from "../NavigationBar";




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

    refreshAfterMark = () => {
        try {
            var tempBooks = this.state.books;
            this.setState({
                books: [],
            });
           
            this.setState({
                books: tempBooks,
            });
            // console.log(response.data);
        } catch (e) {
            
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

    bookMark = (value) => {
        console.log(typeof(value));
        var check = localStorage.getItem(value.id);
        console.log(check);
        if (check == null) {
            var myObj = {
                "id": value.id,
                "title": value.title,
                "authors": value.authors,
                "cover_url": value.cover_url,
                "description": value.description,
                "audio_length": value.audio_length,
            };
            console.log(typeof(myObj));
            localStorage.setItem(value.id, value);
        } else {
            localStorage.removeItem(value.id);
        }
        this.refreshAfterMark();
    }

    checkMark = (value) => {
        if (localStorage.getItem(value.id) == null) {
            return <BsStar/>
        } else {
            return <BsStarFill/>
        }
        return <BsStarFill/>

    }

    
    componentDidMount = () => {
        
       
        this.fetchBook();
    }

    render() {
        return (
            <div>
                <NavigationBar/>
                <div className="py-12 px-12">
                    {
                    this.state.loading == false ?
                <Table responsive="xl" hover striped>
                    <thead>
                        <tr>
                            <th>Bookmark</th>
                            <th>ID</th>
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
                                    <td className="align-center">
                                        <div onClick={() => this.bookMark(value)}>
                                            {/* <BsStar/>    */}
                                            {this.checkMark(value)}
                                        </div>
                                        
                                    </td>
                                    <td>{value.id}</td>
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
                        <div className="flex  flex-col justify-center items-center content-center py-10 sm:py-12 px-12">
                            <Spinner animation="border" />
                        </div>
                    }
                    <div className="flex  flex-col justify-center items-center content-center py-10 sm:py-12 px-12">

                        <div className="my-10"/>
                        <Pagination>
                            <Pagination.Prev onClick={() => {this.pagination("Prev")}} />
                            <Pagination.Item>{this.state.page}</Pagination.Item>
                            <Pagination.Next onClick={() => {this.pagination("Next")}} />
                        </Pagination>
                        <div className="my-10"/>
                        <div className="flex flex-row justify-center content-center">
                            {/* <Button onClick={() => {this.pagination("Prev")}} variant="outline-primary">Prev</Button>
                            <div className="w-2"/>
                            <p>{this.state.page}</p>
                            <div className="w-2"/>
                        <Button onClick={() => {this.pagination("Next")}} variant="outline-primary">Next</Button> */}
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
