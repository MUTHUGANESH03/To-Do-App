import React, { useEffect, useState } from "react";
import { Text, TextInput, View, Button, TouchableOpacity, StyleSheet } from "react-native";
import { signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
import auth from '../services/firebaseAuth'

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, SetError] = useState('');

  const checkIfLoggedIn = () => {
    onAuthStateChanged(auth,(user) => {
        if(user) {
          navigation.navigate('ToDoApp')
        }

    })

  }
  useEffect(() => {
    checkIfLoggedIn()
  })


  const handleLogin = () => {
    SetError('');
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
        navigation.navigate('ToDoApp')
        
    })
    .catch((error) => {
      SetError(error.message)
    })
  };
  const goToRegister =() => {
    navigation.navigate('Register')
  }

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, fontWeight: "bold"}}>Login</Text>
      <TextInput
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.TextInput}
        value={email}
      />
      <TextInput
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={styles.TextInput}
        value={password}
      />
      <Button title="Login" onPress={handleLogin} />
      {error && <Text style={{color: "red"}}>{error}</Text>}
      <TouchableOpacity onPress={handleLogin}>
        <Text onPress={goToRegister} style={{marginVertical: 10}}>Create an account? Register here</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
    TextInput: {
        borderWidth: 1, 
            borderColor: "grey", 
            width: 250,
            marginVertical: 10,
            paddingHorizontal: 8,

    }
})
