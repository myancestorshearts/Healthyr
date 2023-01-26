import ReactDOM from "react-dom"
import React from "react"
import AccountDashboard from "./account-dashboard"
//import Client from 'shopify-buy';
//import {ApolloProvider} from '@shopify/react-graphql';
//import {  ApolloClient,  InMemoryCache,  createHttpLink,} from '@apollo/client';
import InitializePrototypes from "../../../../common/prototypes";
InitializePrototypes();

const rootEl = document.getElementById("react-account-dashboard")

/*
const client = new ApolloClient({    
    link: new createHttpLink({
      fetch: userLoggedInFetch(app),
      credentials: "include",
      headers: {
        "Content-Type": "application/graphql",
      },
    }),
    cache: new InMemoryCache(),
 });
*/

rootEl && ReactDOM.render(
		<AccountDashboard
		/>
    ,rootEl)