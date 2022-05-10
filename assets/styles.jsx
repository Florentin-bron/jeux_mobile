import { StyleSheet, StatusBar } from "react-native"

export const styles =  StyleSheet.create({
    footer: {
        backgroundColor: 'grey',
        padding: '1%',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
    },
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight
    },
    containerGame: {
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: '#79e84f'
    },
    header: {
        backgroundColor: 'grey',
        padding: '1%',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
    },
    content: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
})