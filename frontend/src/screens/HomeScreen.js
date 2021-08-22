import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';

const HomeScreen = () => {

    // useState hook from react- It is to use state in functional components because traditionally with class
    // based components, you would define your state in constructor. Well, with functions, we obviously don't
    // have a constructor, so we use the useState. And the way we do that is we set a set of brackets to useState
    // and in these brackets we pass two things- what we want to call this piece of state which is products, 
    // and then what we want to call the function to manipulate or change the state, which we'll call setProducts.
    // And then whatever we want to set as a default for products we pass in here, which is going to be an empty
    // array.
    const [products, setProducts] = useState([]);

    // useEffect hook- to make a request to our backend, bcz what useEffect does is we define it and it takes
    // in an arrow function and whatever we put in here is going to run as soon as the component loads. As 
    // soon as this HomeScreen loads. that's going to fire off. Now that's where we want to make our request 
    // bcz we want these products as soon as the component loads.

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('/api/products')

            setProducts(data)
        }
        fetchProducts()
    }, []);

    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product) => (
                    <Col key={product._id} sm = {12} md = {6} lg ={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>  
        </>
    )
}

export default HomeScreen
