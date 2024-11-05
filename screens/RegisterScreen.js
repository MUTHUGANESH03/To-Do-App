import React, { useState } from "react";
import { Text, TextInput, View, Button, TouchableOpacity, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import auth from '../services/firebaseAuth'

export default function RegisterScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, SetError] = useState('');


  const handleRegister = () => {
    SetError('');
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate('ToDoApp')
        
    })
    .catch((error) => {
      SetError(error.message)
    })
  };
  const goToLogin = () => {
    navigation.navigate('login')
  }

  const handleLogin = () => {
    console.log("Navigate to login"); // Handle the navigation to login screen
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, fontWeight: "bold"}}>Register</Text>
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
      <Button title="Register" onPress={handleRegister} />
      {error && <Text style={{color: "red"}}>{error}</Text>}
      <TouchableOpacity onPress={handleLogin}>
        <Text onPress ={goToLogin} style={{marginVertical: 10}}>Already have an account? Login here</Text>
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
