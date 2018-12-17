# How to sort Kubernetes kubectl get results

When you use the `kubectl` you sometimes want to sort the results based on the AGE column, and kubectl also have a `--sort-by` cli argument, sadly is it a bit more advanced than just saying sort by age. You have to know the JSON value first before you can sort by it, so first you do:

```
$ kubectl get ingress -o=json
```

Now you get all the raw json results that is used to render the results, then you can see there is a `metadata` in all the objects that contains a date timestamp called `creationTimestamp` so now you can do:

```
$ kubectl get ingress --sort-by="metadata.creationTimestamp"
```

A bit complicated but more powerful because now you now how to sort by any column Kubernetes ever will through at you and you also saw the data structure behind the tables.