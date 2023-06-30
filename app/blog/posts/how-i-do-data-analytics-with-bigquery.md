# How I do data analytics with BigQuery

I use BigQuery at GreenMobility for all our reports. All our reporting on our finance, to data analytics how how our vehicles is used, to calculating user segments and LTV (Life Time Value). I have also used it for two years for generating our version of Spotify Wrapped.

BigQuery is phenominal because all queries only takes seconds. It is nearly impossible to make a slow query and you do not need to care about indexes or if you query does a full table scan. For example the query for generating GreenMobility Wrapped takes only 15 seconds and it queries 7 tables and a year of data.

BigQuery SQL compared to Postgres SQL is close, but they are different enough that switching between them is a inconvenience. BigQuery for example does not do implicit conversion, it is more type strong and can not compare Dates to Timestamps for example.

I also searched for a long time for a tool where other people in the company could query our bigquery datawarehouse. I tried getting into Looker which Google aquired, but the start price is steep for a small company. We tried Grafana early on, but hosting Grafana ourselves was a hurdle. Hosted Grafana.com launched to my delight in 2022 with a connection to BigQuery and we have used that for Graphing since. We are using the Grafana.com API to sync dashboards JSON documents and Terraform for controlling user permissions in code.

I still do a lot of individual reports where I save the output for display in Excel where I have to share the report internally in the company. I save it in Onedrive and share it with the relevant person together with the query in a txt file. Most reports are just one-offs and very dependent on time and context. For more serious data processing we use Dataform which Google also aquired. It has worked really well for maturing our finance reporting.

There is still something to look for with BigQuery, the best interface I have found is still the BigQuery Explorer, the editor has autocomplete and it is able to quickly show errors. I haven't tried a lot of services because there is a big trust threshold as any tool essentially will have access to all your data.

We started importing data in GreenMobility with streaming inserts, but we have switched reading incrementally from our Cloud SQL Postgres database. That has been faster and easier to manage.

BigQuery will be my goto for data reports for years to come!