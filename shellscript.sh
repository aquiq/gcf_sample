#!/bin/bash

JOB_ID=`bq query --use_legacy_sql=false --format=json "select * from test.job_id_table limit 1" |jq -r '.[].job_id'`

JOB_STATUS=`bq show -j --format=json ${JOB_ID} | jq -r '.status.state'`

RTN=
if [ $JOB_STATUS="DONE" ]; then
    RTN=`bq query --use_legacy_sql=false "insert into test.table2(fld1) values('${JOB_STATUS}')"`
    echo "OK"
else
    echo "NG"
fi
