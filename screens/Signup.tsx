import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { createUser } from "../graphql/createUser";
import { Button, Text, TextInput } from "react-native";

export function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [doSignupMutation, { data, loading, error }] = useMutation(createUser);

  async function doSignup() {
    try {
      await doSignupMutation({
        variables: {
          data: {
            email,
            password,
          },
        },
      });
      setEmail("");
      setPassword("");
    } catch {}
  }

  return (
    <>
      <Text>Signup</Text>
      {error && (
        <Text style={{ color: "red" }}>{JSON.stringify(error, null, 4)}</Text>
      )}
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={(e) => setEmail(e)} />
      <Text>Password:</Text>
      <TextInput value={password} onChangeText={(e) => setPassword(e)} />
      <Button disabled={loading} onPress={doSignup} title="Signup"></Button>
    </>
  );
}
