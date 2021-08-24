import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'

const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id

    //location.search gives whatever there is after that question mark, e.g., if initially quantity is 1, 
    //then it gives ?qty=1 bcz that's how it is present there in params.
    //Now if we split this ?qty=1 from '=', it would give us array ['?qty', '1']; ie, 1 is present at index 1.
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    console.log(cartItems)

    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])
    
    return <div>Cart</div>
}

export default CartScreen
