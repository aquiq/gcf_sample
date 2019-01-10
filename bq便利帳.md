


### bq コマンドでファイルをロードする
bq --location=[LOCATION] load --source_format=[FORMAT] [DATASET].[TABLE] [PATH_TO_SOURCE] [SCHEMA]

### bq コマンドでCSVファイルをロードする

```
bq --location=US load --source_format=CSV test.table1 gs://sandbox-uenoyama2

```

### bq コマンドでクエリー実行する
bq --location=[LOCATION] load --source_format=[FORMAT] [DATASET].[TABLE] [PATH_TO_SOURCE] [SCHEMA]

