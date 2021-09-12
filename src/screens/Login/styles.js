import { ColorPropType, ImageBackgroundBase, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center'
    },
    view: {
        flex: 1,
        padding: 30,
        justifyContent: 'space-around'
    },
    title: {
        fontSize: 36,
    },
    inputView: {
        borderBottomWidth: 1,
        borderBottomColor: '#d1d1d1',
        flexDirection: 'row',
        paddingVertical: 8,
        justifyContent: 'space-between',
        marginBottom: 20
    },
    inputEmail: {
        marginHorizontal: 10,
        width: '90%',
        height: 25
    },
    inputPassword: {
        width: '78%',
        height: 25
    },
    submitButton: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#23fcbe',
        marginBottom: 25
    },
    facebookButton: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d1d1d1',
        marginBottom: 15
    },
    googleButton: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d1d1d1'
    },
    buttonFGText: {
        color: '#ffffff',
        marginLeft: 10
    },
    divider: {
        backgroundColor: '#d1d1d1',
        width: '100%',
        height: 1,
    },
    footerView: {
        height: '8%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    footerCreateAccountView: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    linkToRegister: {
        fontWeight: '700'
    },
    linkToForgotPassword: {
        color: '#4267B2'
    }
})

export { styles }