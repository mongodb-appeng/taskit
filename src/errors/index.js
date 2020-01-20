import React, {Component} from 'react';

/*
 * needs testing, can make it crash when we change owner_id directly
 * TODO: Should test and then remove this comment
 */
export default class GlobalError extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            info: '',
            error: ''
        };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({hasError: true, info: errorInfo, error: error});
        console.error(`error: ${error}`);
        console.log(`errorInfo: ${errorInfo}`);
    }

    render() {
        return this.state.hasError ? (
            <div>
                <h3>A global error occurred</h3>
                <p>please check development console</p>
            </div>
        ):
        this.props.children;
    }
}