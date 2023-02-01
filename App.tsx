import "react-native-gesture-handler";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserProvider } from "./hooks/user.context";
import Router from "./Router";
import { NavigationContainer } from "@react-navigation/native";

const httpLink = createHttpLink({
  uri: "http://10.0.2.2:5000",
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await AsyncStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <UserProvider>
          <Router />
        </UserProvider>
      </NavigationContainer>
    </ApolloProvider>
  );
}

export default App;
