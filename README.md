# hamjs-rpc-server
NodeJS Framework to Create RPC Server 

As you know about [RPC](https://en.wikipedia.org/wiki/Remote_procedure_call),
this is way to communicate between applications. Here, you got a very cool RPC
server framework for NodeJS.

## How cool is this?
1. Zero dependencies, only use NodeJS native module.
2. (i will define it next day, maybe :v)

## How to use?
### Installation
First, create your NodeJs project using `npm init` command.
Then run command below inside that project.

```npm i https://github.com/hadihammurabi/hamjs-rpc-server```

### Creating RPC Server
To starting your RPC server, you have to create a file that
calling the listen method from this RPC framework. You can
follow example below.

```js
// importing the framework
const rpc = require('@hamjs/rpc-server');

// run RPC server on port 8080
rpc.listen(8080, () => {
  console.log('RPC server is running...');
});
```

### Creating a Procedure
Before a procedure called, you have to define it.
To do this, see the example below.

```js
rpc.def('sum', ({ a, b }) => {
  return a + b;
});
```

### Calling the Procedure
To call a procedure, you have to install client library for this framework.
You can see client provided list below.
1. [NodeJS](https://github.com/hadihammurabi/hamjs-rpc-client-node)

Or, you don't need to install any client, you can send HTTP request to the server
with rules below.
1. HTTP request to RPC server address (eg. http://localhost:8080)
2. Using **POST** request method
3. Put body like this:
```json
{
  "call": "procedureName",
  "parameters": {
    "param1": "hello",
    "param2": "HamJS RPC"
  }
}
```

## Contributing
I hope everyone will contribute to this project, but i am not sure :v

If you want to contribute, fork and give me a pull request!
