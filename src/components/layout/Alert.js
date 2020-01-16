import React, {useContext} from 'react';
import AlertContext from '../../context/alert/alertContext';

/*
 * simple alert component to show basic errors
 */
export const Alerts = () => {
    const alertContext = useContext(AlertContext);

    return (
        alertContext.alerts.length > 0 && alertContext.alerts.map(
            alert => (
                <div className={`alert alert-${alert.type}`} role='alert'>
                    <i className='material-icons'>info</i> {alert.msg}
                </div>
            )
        )
    );
};