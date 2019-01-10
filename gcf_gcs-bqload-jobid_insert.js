exports.ToBigQuery = (event, callback) => {
    console.log(JSON.stringify(event.data));
    console.log(JSON.stringify(event.data.attributes));

    const BigQuery = require('@google-cloud/bigquery');
    const Storage = require('@google-cloud/storage');

    const projectId = 'sandbox-XXXXXXXX';
    const datasetId = 'XXXX';
    const tableId = 'XXXXXX';
    const bucketName = 'gs://sandbox-XXXXXXXX';
    const filename = 'XXXXXX.csv';

    const bigquery = new BigQuery({
        projectId: projectId
    });

    const storage = Storage({
        projectId: projectId
    });

    const metadata = {
        allowJaggedRows: false,
        skipLeadingRows: 0
    };

    let job;

    bigquery
        .dataset(datasetId)
        .table(tableId)
        .load(storage.bucket(bucketName).file(filename))
        .then(results => {
            job = results[0];
            console.log(`Job ${job.id} started.`);
            return job;
        })
        .then(metadata => {
            const errors = metadata.status.errors;
            if (errors && errors.length > 0) {
                throw errors;
            }
        })
        .then(() => {
            console.log(`Job ${job.id} completed.`);
		    const tableId2 = 'job_id_table';
    		const rows = [{job_id: `${job.id}`}];

		    // Creates the new dataset
     		bigquery
        		.dataset(datasetId)
        		.table(tableId2)
        		.insert(rows)
        		.then(results => {
		            console.log(`Job ${job.id} Inserted.`);
              		return;
            	})
            	.catch(err => {
            		console.error('ERROR:', err);
            	});
      
        })
        .catch(err => {
            console.error('ERROR:', err);
        });

    callback();
};
