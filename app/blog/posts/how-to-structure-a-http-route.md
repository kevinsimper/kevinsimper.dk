# How to structure a http route

I want to go over in this post how to structure a http route so that it becomes maintainable. Everything small is maintainable and everything starts out simple, but the real value comes when things are changed and adapter to become smarter and quicker for the users. So making a program easy to change is more important than easy to write the first time.

A good example of a complicated route is signup. A good signup consists of:

- validating the users input
- checking if the user exists
- creating the user

Quick estimate that would be 50 lines of code. Let us try to make it here:

```typescript
app.post('/signup', async (req, res) => {
  const { email, password } = req.body

  if (email.indexOf('@') === -1 && password.length < 8) {
    return res.json({
      error: 'Not correct email or too short password',
    })
  }

  const existing = await prisma.user.findOne({
    where: {
      email: email,
    },
  })

  if (existing) {
    return res.json({
      error: 'User already exists',
    })
  }

  const created = await prisma.user.create({
    data: {
      email,
      password,
    },
  })

  return res.json({
    success: 'Your user was created!',
  })
})
```

It was only 32 lines of code. It was not that bad and looking at it, it looks easy to maintain.

Now we have to extend it, we have to check their voucher code. Let us add it:

```typescript
app.post('/signup', async (req, res) => {
  const { email, password, voucher } = req.body

  if(email.indexOf('@') === -1 && password.length < 8 && voucher.length > 0) {
    return res.json({
      error: 'Not correct email or too short password'
    })
  }

  const existing = await prisma.user.findOne({
    where: {
      email: email
    }
  })

  if(existing) {
    return res.json({
      error: 'User already exists'
    })
  }

  const voucherExist = await prisma.voucher.findOne({
    where: {
      voucher: voucher
    }
  })

  if(!voucherExist) {
    return res.json({
      message: 'Voucher code was incorrect'
    })
  }

  const created = await prisma.user.create({
    data: {
      email,
      password
    }
  })

  const credits = await prisma.credits.create({
    data: {
      amount: voucher.amount
      userId: created.id
    }
  })

  return res.json({
    success: 'Your user was created!'
  })
})
```

Now we handle that the user can provide a voucher code during signup. Success we shipped two tickets now, customers can signup and customers can have voucher code during signup.

The code is now 51 lines of code. There is a few things that is beginning to show. The voucher feature was intertwingled into the existing code. The code has now another error code also, if the customer has typed a incorrect voucher code we don't want to create the customer, but give the customer the change to correct it.

Another problem is we do not have any tests. Testing this code is a bit hard because it is inside a Express.js route wrapper. Testing is also difficult because it depends on a mocked `request` and `response` object, which are both large objects with many functions attached.

We now return a different structure if the voucher does not exist. Is it a bug or is it feature, the next person looking at this can not be entirely sure.

So what to do from here?

## Refactoring

Refactoring is a natural part of writing a program, it is not bad that you have to refactor your program, you did not do anything wrong, it is just the natural progression of your program. It is just important to state.

There is a few best practices we can do, it would be something we could do without even looking at the program first. There is an inheiret structure to the program, let us try to break the route from before apart.

### Validate input

```typescript
const { email, password, voucher } = req.body

if (email.indexOf('@') === -1 && password.length < 8 && voucher.length > 0) {
  return res.json({
    error: 'Not correct email or too short password',
  })
}
```

Here we validate the the data coming in is in the right shape. When we look at it in isolation we can maybe even see more things we could validate about the data to improve the quality.

### Business logic

```
await prisma.user.findOne(...)
await prisma.voucher.findOne(...)
await prisma.user.create(...)
await prisma.credit.create(...)
```

I minimized it a bit here, but the business logic is the side-effects/outcomes of our program, the thing that gives value.

So a natural part of our program after validating the input into our program is the business logic.

### Error handling

```typescript
if (existing) {
  return res.json({
    error: 'User already exists',
  })
}

if (!voucherExist) {
  return res.json({
    message: 'Voucher code was incorrect',
  })
}
```

The third part is the error handling, so much of programming is ensuring programs works without errors. Like even if most customers would never try to signup twice because they know they have a customer already, the code needs to be there because if not it would descructive effects if the same customer exist twice.

---

So a http route will at least always consist of three parts

1. validating input
2. business logic
3. error handling

## Lets us try

Let us try to refactor the program with those 3 steps in mind

```typescript
function validate(req, res) {
  const { email, password, voucher } = req.body

  if(email.indexOf('@') === -1 && password.length < 8 && voucher.length > 0) {
    return res.json({
      error: 'Not correct email or too short password'
    })
  }
}

function createUser(res, { email, password, voucher }}) {
  const existing = await prisma.user.findOne({
    where: {
      email: email
    }
  })

  const voucherExist = await prisma.voucher.findOne({
    where: {
      voucher: voucher
    }
  })


  const created = await prisma.user.create({
    data: {
      email,
      password
    }
  })

  const credits = await prisma.credits.create({
    data: {
      amount: voucher.amount
      userId: created.id
    }
  })

  return created
}

function handleError() {
    if(existing) {
    return res.json({
      error: 'User already exists'
    })
  }
  if(!voucherExist) {
    return res.json({
      error: 'Voucher code was incorrect'
    })
  }
}

app.post('/signup', async (req, res) => {
  const validated = validate(req, res)

  const createUser = await createUser(res, validated)

  const handleError = handleError(createUser)

  return res.json({
    success: 'Your user was created!'
  })
})
```

Now the signup route is very short, it is easy to follow the functions and have an idea what is going on inside the functions.

However if you see the code, it would not work properly, `validate` is both expected to return the users validated input and handle its own errors with return a HTTP response.

The `req` and `res` object should not be passed around. When you do that you allow sideeffects in smaller functions and the next person reading it can have a hard time overlooking the sideeffects. If you avoid passing the `req` and `res` only to the functions that needs them, you can have a much smaller knowledge surface.

So let us try only handling `res` calls inside the http handler.

```typescript
function validate(req) {
  const { email, password, voucher } = req.body

  if (email.indexOf('@') === -1 && password.length < 8 && voucher.length > 0) {
    return {
      type: 'error',
      message: 'Not correct email or too short password',
    }
  }

  return {
    type: 'success',
    email,
    password,
    voucher,
  }
}

async function createUser({ email, password, voucher }) {
  const existing = await prisma.user.findOne({
    where: {
      email: email,
    },
  })
  if (existing) {
    return {
      type: 'error',
      message: 'User already exists',
    }
  }

  const voucherExist = await prisma.voucher.findOne({
    where: {
      voucher: voucher,
    },
  })

  if (!voucherExist) {
    return {
      type: 'error',
      message: 'Voucher code was incorrect',
    }
  }

  const created = await prisma.user.create({
    data: {
      email,
      password,
    },
  })

  const credits = await prisma.credits.create({
    data: {
      amount: voucher.amount,
      userId: created.id,
    },
  })

  return {
    type: 'success',
    user: created,
  }
}

app.post('/signup', async (req, res) => {
  const validated = validate(req, res)
  if (validated.type === 'error') {
    return res.json({
      error: validated.message,
    })
  }

  const createUser = await createUser({
    email: validated.email,
    password: validated.password,
    voucher: validated.voucher,
  })

  if (createUser.type === 'error') {
    return res.json({
      error: createUser.message,
    })
  }

  return res.json({
    success: 'Your user was created!',
  })
})
```

You can see now every function now returns a small object indicating what kind of response comes back. There is different formats for that, one pattern is for example ts-results which I have written more about here, [Writing better typescript with explicit return values](/posts/writing-better-typescript-with-explicit-return-values)

You can see the 3. "error handling" was removed again. That would be the next part to refactor, but in this case it would not make the code simpler to read. It would however be an important function to refactor out since the output format can grow quickly in complexity. Like what format does the frontend expect, what if it is a success, what if it is an error, should the frontend be told in detail which field was incorrect?

You can see in our code we do not differentiate which field the customer had wrong, so the frontend UI would have a hard time helping the user other than just showing the error message.

Now the "complicated" voucher code can even be refactored out into its own function, still being part of the middle step, but now the middlestep can be advanced.

1. validate customer input
2. business logic
   1. check user
   2. check voucher
3. handle errors

```typescript
async function checkVoucher(voucher) {
  const voucherExist = await prisma.voucher.findOne({
    where: {
      voucher: voucher,
    },
  })

  if (!voucherExist) {
    return {
      type: 'error',
      message: 'Voucher code was incorrect',
    }
  }

  return {
    type: 'success',
    voucher: voucherExist,
  }
}

async function createCredits(amount, userId) {
  const credits = await prisma.credits.create({
    data: {
      amount: amount,
      userId: userId,
    },
  })

  return {
    type: 'success',
    credits,
  }
}

async function createUser({ email, password, voucher }) {
  const existing = await prisma.user.findOne({
    where: {
      email: email,
    },
  })
  if (existing) {
    return {
      type: 'error',
      message: 'User already exists',
    }
  }

  const voucherExist = await checkVoucher(voucher)
  if (voucherExist.type === 'error') {
    return {
      type: 'error',
      message: voucherExist.message,
    }
  }

  const created = await prisma.user.create({
    data: {
      email,
      password,
    },
  })

  const credits = await createCredits(voucherExist.voucher.amount, created.id)

  return {
    type: 'success',
    user: created,
  }
}
```

These two new functions `checkVoucher` and `createCredits` now have a clearer ownership and are ready to be extended by the next person. It is also more clear what values are used and which are not, `createCredits` does not have access to all the variables in the function, only the things needed.

Next step would be to move the code into different files, so from a file called just

```
/routes/
  signup.js
```

to

```
routes/
  signup/
    index.js // has the http route
    validate.js
    create.js
```

# Conclusion

We had the original http route with customer creation and voucher code. It could have easily existed as it was, it was only 51 lines of code. We however saw that it was not perfect and had potentially be extended further, also the return values was inconsistent. We refactored it into functions that could be tested. We broke the code up into first 3 logical parts so we did not have to consider what the right abstraction would be. After that refactoring we broke it further down which again allowed us to put the code into different files.

I hope that gave you an idea for how to structure your program. The intention is not to split it into atoms, but not splitting up makes it harder for the next person and as we talked about, a program is more worth when it is changed and adapted.
