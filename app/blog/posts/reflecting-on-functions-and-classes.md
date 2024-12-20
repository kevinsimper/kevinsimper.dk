# Reflecting on Functions and Classes

When developing software, decisions often come down to trade-offs between simplicity, readability, and maintainability. One recurring choice is whether to use a function or a class for a task. While both have their place, I often lean toward functions for many scenarios. Here’s why they can be a great option.

## Why Choose Functions?

### Fewer Side Effects

Functions tend to be straightforward: they take inputs, produce outputs, and avoid hidden states. This simplicity makes them easier to reason about and debug. If something breaks, you don’t have to untangle a web of interdependent attributes to locate the issue.

When testing, pure functions shine. They’re predictable: give them valid inputs, and they’ll always produce the same outputs. This predictability simplifies both writing and maintaining tests.

### Explicit Data Flow

Functions make dependencies explicit: you can see at a glance what data goes in and what comes out. This is particularly helpful in larger projects where team members rely on clear communication between system components. A function’s signature is its contract, whereas a class often requires extra documentation to explain its state management.

### Granularity and Reusability

Functions encourage single-purpose design. A granular function is easy to test and reuse across different parts of a codebase. This isolation is harder to achieve in methods that rely on shared class state.

For instance, consider a timestamp validation function. It’s quick to write, easy to test, and reusable. In contrast, embedding that logic inside a class method can make it harder to isolate and reuse elsewhere.

### Less Setup

Functions require minimal setup. Unlike classes, which often need attributes initialized and dependencies mocked, functions work right out of the box with the arguments they receive.

This ease of setup extends to reading and understanding code. A function’s behavior is defined by its parameters and return value, while a class requires understanding how methods interact with internal state and how it’s instantiated.

## When to Use Classes

This isn’t to say classes don’t have their place. When dealing with complex systems that benefit from encapsulation or polymorphism, classes are invaluable. They’re particularly useful when managing state or implementing object-oriented patterns.

### When to Use Classes

1. **Handling File Objects:** Classes are particularly useful when managing resources that need explicit cleanup, such as file objects. A class can ensure the file is properly closed by encapsulating the logic in methods and a destructor.
2. **Managing Websockets or Sockets:** Classes can handle the lifecycle of a socket or websocket, maintaining state and ensuring proper connection management.
3. **Building a Web Server:** Encapsulation provided by classes is beneficial for maintaining server state, routing logic, and configuration.
4. **Handling Financial Models:** Although a functional approach is often sufficient, classes can help group related operations on monetary values, such as currency conversion or transaction validation, while keeping data encapsulated.

That said, in many cases, state is stored externally in systems like a PostgreSQL database, which often reduces the need for class-based designs.