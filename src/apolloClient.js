import {
    ApolloClient
} from 'apollo-client'
import {
    HttpLink
} from 'apollo-link-http'
import {
    InMemoryCache
} from 'apollo-cache-inmemory'

const httpLink = new HttpLink({
    // You should use an absolute URL here
    uri: 'https://api.graph.cool/simple/v1/cjjg0n07x5q1n0139fkwu9lrp'
})

export default new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    connectToDevTools: true
})