var graph = require("@microsoft/microsoft-graph-client");
//console.log(graph);

function getAuthenticatedClient(accessToken) {
    const client = graph.Client.init({
        authProvider: (done) => {
            done(null, accessToken);
            //console.log(accessToken + 'Please return me a ')
        },
        
    });

    return client;
}

export async function getUserDetails(accessToken) {
    const client = getAuthenticatedClient(accessToken);
    //const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const user = await client.api("/me").get();
//console.log(user + 'help!!!!!')
    return user;
}