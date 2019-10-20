# How to Bazel pass environment variables

When you build with bazel you sometimes want to pass a environment variable that changes something, it can be the name of the output or a config inside the app.

A good example could be passing a SHA during a build.

Bazel has a lot of CLI arguments which makes it very difficult to easily find what you are looking for.

There is a few instances where you want to do it:

## During bazel build

You can pass environment variables with "--action_env", an example is here

```bash
bazel build //:myproject --action_env=MYENV=myvalue
```

You can test it easily by making a new project like this:

```python
genrule(
  name = "myproject",
  cmd = "printenv > $@",
  outs = ["envs.txt"]
)
```

## During bazel test

You can use `--test_env` and those will be available during bazel test.

```bash
bazel test //:mytest --test_env=MYENV=myvalue
```

```python
genrule(
  name = "myproject",
  cmd = "echo printenv > $@",
  outs = ["envs.sh"],
  executable = True
)

sh_test(
  name = "mytest",
  srcs = ["envs.sh"],
  data = [":myproject"],
)
```

And you can see the logs even if the test passes with ` --test_output=all`

So it looks like

```bash
bazel test --test_output=all //:mytest --test_env=MYENV=myvalue
```

## During bazel run

Here you can prepend the environment variable when you run the rule.

```python
genrule(
  name = "myproject",
  cmd = "echo printenv > $@",
  outs = ["envs.sh"],
  executable = True
)
```

```
MYRUN=value bazel run //:myproject
```

## Conclusion

It is not easy to find out how to pass information during build, test and run with bazel, but that is on purpose. When you allow external values it can make the build inconsistent and fragile so think about what you introduce, but don't worry so much if you are just getting started!