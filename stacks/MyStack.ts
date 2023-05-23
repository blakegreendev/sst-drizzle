import { StackContext, Api, RDS } from "sst/constructs";

export function API({ stack }: StackContext) {

  const db = new RDS(stack, "db", {
    engine: "postgresql11.13",
    defaultDatabaseName: "drizzle",
    migrations: "packages/core/migrations",
  });

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [db],
        environment: {
          DATABASE: db.defaultDatabaseName,
          SECRET_ARN: db.secretArn,
          RESOURCE_ARN: db.clusterArn,
        },
        copyFiles: [
          {
            from: 'packages/core/migrations',
            to: 'migrations',
          },
        ],
      }
    },


    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      'GET /migrate': 'packages/functions/src/migrator.handler',
    },
  });
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
