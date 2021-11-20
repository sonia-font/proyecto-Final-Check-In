import { store } from 'react-notifications-component'

/**
 * Create and add a new notification to show on the screen
 * @param {string} title Title to be showed in the notification
 * @param {string} message Message to be showed in the notification
 * @param {string} type Type must be one of (success, danger, info, default or warning)
 */
const showNotification = (title, message, type, time) => {
    store.addNotification({
        title,
        message,
        type,
        insert: 'bottom',
        container: 'bottom-right',
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
        dismiss: {
            duration: time,
            onScreen: true
        }
    })
}

export const showAlertNotification = (title = null, message, type = 'info', time = 3000) =>
    showNotification(title, message, type, time)
