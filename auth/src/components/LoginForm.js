import React, {Component} from 'react';
import {Text} from 'react-native';
import {Button, Card, CardSection, Input, Spinner} from './common'
import firebase from 'firebase';

class LoginForm extends Component {
    
    state = {email:'', 
            password:'',
            error:'',
            loading:false};

    onButtonPress() {

        const { email, password } = this.state; 

        this.setState({error:'', loading:true});

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {
                    firebase.auth().createUserWithEmailAndPassword(email, password)
                        .then(this.onLoginSuccess.bind(this))
                        .catch(this.onLoginFail.bind(this));
            });
    }

    onLoginFail(){
        this.setState({
            loading:false,
            error:'Authentication Failed'
        })
    }

    onLoginSuccess(){

        this.setState({
            email:'',
            password:'',
            loading:false,
            error:''
        });

    }

    renderButton(){

        if (this.state.loading){
            console.log('loading');
            return <Spinner size='small' />
        }
        console.log('loading2');

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
            Log In
            </Button>
        );
    }

    render(){
        return(
            <Card>
                <CardSection>
                    <Input 
                        label="Email"
                        //not passing secureTextEntry means that 
                        //this prop is undefined ergo false
                        value={this.state.email}
                        placeholder={'example@server.com'}
                        onChangeText={email => this.setState({email})}
                    />
                </CardSection>
                
                <CardSection>
                    <Input 
                        label="Password"
                        //Just secureTextEntry means that this prop is true
                        secureTextEntry
                        value={this.state.password}
                        placeholder={'password'}
                        onChangeText={password => this.setState({password})}
                    />
                </CardSection>
                
                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}

                </CardSection>

            </Card>

        );
    }

}

const styles = {

    errorTextStyle:{
        fontSize:20,
        alignSelf:'center',
        color: 'red',
        marginTop:10,
    }

}

export default LoginForm;