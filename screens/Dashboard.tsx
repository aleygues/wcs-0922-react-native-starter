import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { IPost } from "../interfaces";
import { UserContext } from "../hooks/user.context";
import { posts } from "../graphql/posts";
import { Button, Text, View } from "react-native";

export function Dashboard() {
  const { user, logout } = useContext(UserContext);
  const { data } = useQuery<{ posts: IPost[] }>(posts);

  return (
    <>
      <Text>Dashboard</Text>
      <Text>Hello {user?.email}!</Text>
      <Text>Last posts</Text>
      {data &&
        data.posts.map((post) => (
          <View>
            <Text>{post.content}</Text>
            <Text>By {post.createdBy?.email}</Text>
            <Text>Comments</Text>
            {post.comments.length === 0 ? (
              <Text>No comment</Text>
            ) : (
              post.comments.map((comment) => (
                <View>
                  <Text>
                    {comment.comment}, {comment.createdAt} by{" "}
                    {comment.createdBy?.email}
                  </Text>
                </View>
              ))
            )}
          </View>
        ))}
      <Button onPress={logout} title="Signout" />
    </>
  );
}
