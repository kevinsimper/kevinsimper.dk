# How to use TypeScript and Jest mocks

I am using [TypeScript](https://www.typescriptlang.org/) on the [GraphQL backend](https://github.com/copenhagenjs/copenhagenjs.dk/tree/master/runs/graphql) and my favorite test runner is [Jest](https://jestjs.io/).

With Jest you can [easily mock other modules](https://jestjs.io/docs/en/mock-functions.html) by doing `jest.mock('./my-file.js')`.

That will turn all functions into Jest mock functions and all objects will have more properties on them like, `mockReturnValueOnce`. This will make it easier to write your tests as you can focus on a small isolated behavior, but not make the code overly verbose.

### Problem with Jest mocks and Typescript

However, the problem is that the TypeScript compiler doesn't know that you have mocked those functions and when it does it type check it will complain that `mockReturnValueOnce` does not exist on that function.

You will have to extend your function so it both have the original types and the type of a Jest Mock function.

### Solution

So we still have to tell jest to mock the file. Then we can import the function we want to call and then we extend it with the jest.MockedFunction.

It is a bit verbose but it looks like this:

```
jest.mock("../models/events");
import { getEvents } from "../models/events";
const mockedGetEvents = getEvents as jest.MockedFunction<
  typeof getEvents
>;
```

Now you can use Jest as you did before without TypeScript 😄