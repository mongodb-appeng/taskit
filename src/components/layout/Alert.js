import React, {useContext} from 'react';
import AlertContext from '../../context/alert/alertContext';

export const Alerts = () => {
    const alertContext = useContext(AlertContext);

    return (
        alertContext.alerts.length > 0 && alertContext.alerts.map(
            alert => (
                <div className={`alert alert-${alert.type}`} role='alert'>
                    <i class='material-icons'>info</i> {alert.msg}
                </div>
            )
        )
    );
}