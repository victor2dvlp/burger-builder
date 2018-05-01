import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const orderList = Object.keys(props.ingredients).map(ingKey => {
        return (
            <li key={ingKey}>
                <span style={{textTransform: 'capitalize'}}>{ingKey}</span>: {props.ingredients[ingKey]}
            </li>
        );
    });
    return (
       <Aux>
           <h3>Your order</h3>
           <p>a delicious burger with following ingredients: </p>
           <ul>
               {orderList}
           </ul>
           <p><strong>Total price: ${props.price}</strong></p>
           <p>Continue to Checkout?</p>
           <Button btnType="Danger" clicked={props.cancelPurchase}>Cancel</Button>
           <Button btnType="Success" clicked={props.continuePurchase}>Continue</Button>
       </Aux>
    );
};

export default orderSummary;