import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'

const HomeScreen = ({ match }) => {

    // useState hook from react- It is to use state in functional components because traditionally with class
    // based components, you would define your state in constructor. Well, with functions, we obviously don't
    // have a constructor, so we use the useState. And the way we do that is we set a set of brackets to useState
    // and in these brackets we pass two things- what we want to call this piece of state which is products, 
    // and then what we want to call the function to manipulate or change the state, which we'll call setProducts.
    // And then whatever we want to set as a default for products we pass in here, which is going to be an empty
    // array.
    //Well, useState is not used here. It has been removed when redux state was being brought into this Homescreen.

    // useEffect hook- to make a request to our backend, bcz what useEffect does is we define it and it takes
    // in an arrow function and whatever we put in here is going to run as soon as the component loads. As 
    // soon as this HomeScreen loads. that's going to fire off. Now that's where we want to make our request 
    // bcz we want these products as soon as the component loads.

    const keyword = match.params.keyword

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber]);

    return (
        <>
            <Meta />
            {!keyword ? <ProductCarousel /> : (
                <Link to='/' className='btn btn-light'>
                    Go Back
                </Link>
            )}
            <h1>Latest Products</h1>
            {loading ? <Loader /> : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate
                        pages={pages}
                        page={page}
                        keyword={keyword ? keyword : ''}
                    />
                </>
            )}

        </>
    )
}

export default HomeScreen
