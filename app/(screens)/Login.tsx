import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import BackgroundTriangles from '@/components/Scansavy_Prop/BackgroundTriangles';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleGetStarted = async () => {
        // Clear previous errors
        setEmailError('');
        setPasswordError('');

        if (!email) {
            setEmailError('Email is required');
        }
        if (!password) {
            setPasswordError('Password is required');
        }

        if (!email || !password) {
            return; // Stop if there are errors
        }

        try {
            const response = await fetch('http://192.168.0.200:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Save the token or handle login success
                console.log('Login successful:', data);
                // Redirect to the main screen
                router.push('/(screens)/(tabs)');
            } else {
                // Handle login failure
                alert(data.error || 'Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            {/* Animated Background Elements */}
            <BackgroundTriangles />

            {/* Title */}
            <View style={styles.titleContainer}>
                <Text style={styles.titleRow1}>Welcome</Text>
                <Text style={styles.titleRow2}>Back!</Text>
            </View>

            {/* Email Input */}
            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                placeholderTextColor="#B0B0B0"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            {emailError && <Text style={styles.error}>{emailError}</Text>}

            {/* Password Input with Show/Hide */}
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Password"
                    secureTextEntry={!passwordVisible}
                    placeholderTextColor="#B0B0B0"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
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
            {passwordError && <Text style={styles.error}>{passwordError}</Text>}

            {/* Login Button */}
            <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Text></Text>
            <Text>- OR Continue With -</Text>

            {/* Social Login Buttons */}
            <View style={styles.socialContainer}>
                <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
                    <Image source={require('../../assets/google-icon.png')} style={styles.socialIcon} />
                    <Text style={styles.socialText}>Login with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
                    <Image source={require('../../assets/facebook-icon.png')} style={styles.socialIcon} />
                    <Text style={styles.socialText}>Login with Facebook</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.link} onPress={() => router.push('/(screens)/Signup')}>
                Don’t have an account? Sign up
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
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 5,
        fontFamily: 'sans-serif',
    },
    titleRow2: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 5,
        fontFamily: 'sans-serif',
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
        elevation: 3,
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
        elevation: 3,
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
        zIndex: 1,
    },
    error: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
    },
});

export default Login;
