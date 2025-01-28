import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import BackgroundTriangles from '@/components/Scansavy_Prop/BackgroundTriangles';
import Icon from 'react-native-vector-icons/FontAwesome';

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  // Validation function
// Validation function
const validateForm = () => {
  let isValid = true;

  // Clear previous errors
  setEmailError('');
  setPasswordError('');
  setConfirmPasswordError('');

  // Email validation
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    setEmailError('Please enter a valid email address.');
    isValid = false;
  }

  // Password validation
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|\\:;,.<>?/~`]).{8,}$/;
  if (!password) {
    setPasswordError('Password is required.');
    isValid = false;
  } else if (!passwordRegex.test(password)) {
    setPasswordError('Password must be at least 8 characters long and contain letters, numbers, and special characters.');
    isValid = false;
  }

  // Confirm password validation
  if (password !== confirmPassword) {
    setConfirmPasswordError('Passwords do not match.');
    isValid = false;
  }

  return isValid;
};

  console.log({ name, email, password, confirmPassword });
  // Handle form submission
  const handleSignup = async () => {
    if (validateForm()) {
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match");
        return;
      }

      try {
        console.log('Sending request...'); // Debugging line
        const response = await fetch("http://192.168.0.200:5000/api/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,        // Include name in the request body
            email,
            password,
            confirmPassword,
          }),
        });

        const data = await response.json();
        console.log(data); // Log the server response

        if (response.ok) {
          // Successfully created user
          console.log({ name, email, password, confirmPassword });
          alert("User created successfully!");
          router.push("/(screens)/Login");
        } else {
          // Show an error message from the backend response or default message
          setErrorMessage(data.error || "Error occurred during signup");
        }
      } catch (error) {
        console.error(error);
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };




  return (
    <View style={styles.container}>
      {/* Animated Background Elements */}
      <BackgroundTriangles />

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleRow1}>Create</Text>
        <Text style={styles.titleRow2}>Your Account</Text>
      </View>

      {/* Full Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#B0B0B0"
        value={name}
        onChangeText={setName}  // Set name state when the user types
      />


      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        placeholderTextColor="#B0B0B0"
        value={email}
        onChangeText={setEmail}
      />
      {/* Display email error */}
      {emailError && <Text style={styles.error}>{emailError}</Text>}

      {/* Password Input with Show/Hide */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          placeholderTextColor="#B0B0B0"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setPasswordVisible(!passwordVisible)}
        >
          <Icon
            name={passwordVisible ? 'eye-slash' : 'eye'}
            size={20}
            color="#B0B0B0"
          />
        </TouchableOpacity>
      </View>
      {/* Display password error */}
      {passwordError && <Text style={styles.error}>{passwordError}</Text>}

      {/* Confirm Password Input with Show/Hide */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirm Password"
          secureTextEntry={!confirmPasswordVisible}
          placeholderTextColor="#B0B0B0"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
        >
          <Icon
            name={confirmPasswordVisible ? 'eye-slash' : 'eye'}
            size={20}
            color="#B0B0B0"
          />
        </TouchableOpacity>
      </View>
      {/* Display confirm password error */}
      {confirmPasswordError && <Text style={styles.error}>{confirmPasswordError}</Text>}

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text> </Text>

      {/* Social Login */}
      <Text>- OR Continue With -</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
          <Image source={require('../../assets/google-icon.png')} style={styles.socialIcon} />
          <Text style={styles.socialText}>Sign up with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
          <Image source={require('../../assets/facebook-icon.png')} style={styles.socialIcon} />
          <Text style={styles.socialText}>Sign up with Facebook</Text>
        </TouchableOpacity>
      </View>

      {/* Link to Login Page */}
      <Text style={styles.link} onPress={() => router.push('/(screens)/Login')}>
        Already have an account? Login
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0391FA',
  },
  titleContainer: {
    marginBottom: 40,
    alignItems: 'stretch',
  },
  titleRow1: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#fff',
  },
  titleRow2: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#fff',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#B0B0B0',
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  passwordContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B0B0B0',
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  eyeIcon: {
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  socialContainer: {
    marginTop: 20,
    width: '80%',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: 'center',
  },
  googleButton: {
    backgroundColor: '#DB4437',
  },
  facebookButton: {
    backgroundColor: '#4267B2',
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  socialText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#6200EE',
    marginTop: 15,
    fontSize: 16,
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
});

export default Signup;
