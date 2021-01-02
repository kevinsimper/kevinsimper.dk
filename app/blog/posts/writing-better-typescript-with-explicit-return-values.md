# Writing better typescript with explicit return values

Typescript is simple, you can define what types (number, string, array, object) a function takes as input and what it returns as output.

You have a function called getCar which takes an id and returns a Car object. This can typescript check without having to run the code. It is pretty smart.

However, the problem is the real world is not always as predictable and our getCar function can fail in many ways. It could be that our car does not exist or that the database connection is broken. The case is that we told the typescript compiler that our function always returns a Car.

Now we have two ways to handle this. We can either use Errors, so if the vehicle, for example, does not exist we can “throw new Error(‘Car does not exist’)”. This solves it that the typescript compiler can verify that the function still returns a Car because an Error is not a return value.
The other solution is to expand our return value so that it can return a car if it exists but return another value if the function does not succeed. That value could be null to exemplify that there is no car. Now the function has the return value of “Car | null”. Now we can check the value of the function if it is equal to null first and then now that the function did not succeed.

### Neither solutions are good!

The first solution goes around the typescript compiler so it is not documented what errors a function can return. The second solution very poorly explains what went wrong, no other information is passed other than it is not a Car.

## The solution is detailed return values.

We could return an object that would fit all our use-cases. We need an easy way to test if a function failed and that is done with a boolean.

```typescript
{ hasError: boolean, car?: Car, error: string }
```

You can see that the car has a question mark, that is because it can be optional because in an error event Car is not there. The problem is that now the typescript compiler can help us to ensure it is defined when there is no error!

## Rust inspired library to the rescue

The programming language Rust has this pattern called Result, Err, and Ok. You defined that the getCar function returns a `Result<Car, string>` and inside the function, it will use the two helper functions to return a Car with `Ok(Car)` or an error with `Err(‘Car does not exist’)`
Now when you use the function getCar it returns the result. When you do `if (result.ok) {}` the typescript compiler will now that `result.val` is equal Car when inside those brackets. It is known by Left, Right pattern where the value is left and error are right.

This is much better! Now both success and error states can be type-checked. We can improve further by defining that the error is an enum 

```typescript
enum GetCarErrors { NOT_FOUND = "NOT_FOUND", DB_ERROR = "DB_ERROR" }
```

Now typescript will ensure that the error can only be one of the enum values and the person calling the function can easily see what they can potentially receive. There is also no need to use `try {} catch() {}` which simplifies the code as the errors are explicit.

This pattern is implemented nicely with ts-results https://github.com/vultix/ts-result