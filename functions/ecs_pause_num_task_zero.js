exports = async function (arg) {
    const AWS = require('aws-sdk');

    const AWS_CONFIG = await context.functions.execute('aws_getConfig')

    // Create ECS service object
    const ecs = new AWS.ECS(AWS_CONFIG);

    // Specify the cluster and task definition ARN
    const cluster = context.values.get('ecs-cluster-name');
    const taskDefinition = context.values.get('ecs-task-defination-arn');

    // Retrieve the current task desired count
    ecs.describeServices({
        cluster,
        services: [taskDefinition]
    }, (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log(data);

        // Making the desired count to 0
        const newTaskCount = 0;

        // Update the task count
        ecs.updateService({
            cluster,
            service: taskDefinition,
            desiredCount: newTaskCount
        }, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Task count updated successfully!');
        });
    });
};