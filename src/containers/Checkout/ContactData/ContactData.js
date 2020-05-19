import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault(); //prevent(send the request) reload the form in the page bc we are inside the form and that is default behavior
        // console.log(this.props.ingredients);
        //code below from purchaseContinueHandler () in BurgerBuilder.js
        //post data to server
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients, // this.props.ingredients used in Checkout.js
            price: this.props.price, // to Route in checkout.js
            customer: {
                name: 'Nhan',
                address: {
                    street: 'Vuorikatu 14',
                    zipCode: '65100',
                    country: 'Finland'
                },
                email: 'thiennhan07.2016@gmail.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json' , order) // link where to post data to server
            .then(response =>{
                this.setState({loading: false });
                this.props.history.push('/');

            })
            .catch(error => {
                this.setState({loading: false});
            });

    }
        render() {
            let form = (
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your name"/>
                    <input className={classes.Input} type="email" name="email" placeholder="Your email"/>
                    <input className={classes.Input} type="text" name="street" placeholder="Street"/>
                    <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
            );
            if(this.state.loading) { /*when loading is true (in axios.post), it is uploading data to server, then its state is back to false */
                form = <Spinner />;
            }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form} 
            </div>
        )
    }
}
export default ContactData;