import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    componentWillUpdate() {
      console.log('[OrderSummary] WillUpdate');
    };
    render() {
        const orderList = Object.keys(this.props.ingredients).map(ingKey => {
            return (
                <li key={ingKey}>
                    <span style={{textTransform: 'capitalize'}}>{ingKey}</span>: {this.props.ingredients[ingKey]}
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
                <p><strong>Total price: ${this.props.price}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.cancelPurchase}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.continuePurchase}>Continue</Button>
            </Aux>
        );

    };
}

export default OrderSummary;