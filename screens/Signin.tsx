import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { signin } from "../graphql/signin";
import { useUser } from "../hooks/user.context";
import { Button, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function Signin() {
  const { login } = useUser();
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("supersecret");
  const [wrongCredentials, setWrongCredentials] = useState(false);

  const { navigate } = useNavigation();

  const [doSigninMutation, { loading, error }] = useMutation(signin);

  async function doSignin() {
    try {
      const { data } = await doSigninMutation({
        variables: {
          email,
          password,
        },
      });
      // data.signin = "uijbsdgbsdogjuvb";
      if (data.signin) {
        login(data.signin);
      } else {
        setWrongCredentials(true);
      }
    } catch {}
  }

  return (
    <View>
      <Text>Signin</Text>
      {wrongCredentials === true && <Text>Wrong credentials</Text>}
      {error && (
        <Text style={{ color: "red" }}>{JSON.stringify(error, null, 4)}</Text>
      )}
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={(text) => setEmail(text)} />
      <Text>Password:</Text>
      <TextInput value={password} onChangeText={(text) => setPassword(text)} />
      <Button disabled={loading} onPress={doSignin} title="Signin"></Button>
      <Button
        disabled={loading}
        onPress={() => navigate("Signup")}
        title="Signup"
      ></Button>
    </View>
  );
}
