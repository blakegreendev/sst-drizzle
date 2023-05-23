import { migrate as mig } from 'drizzle-orm/node-postgres/migrator';
import { drizzle } from 'drizzle-orm/aws-data-api/pg';
import { RDSDataClient } from '@aws-sdk/client-rds-data';
import { fromIni } from '@aws-sdk/credential-providers';

const rdsClient = new RDSDataClient({
    credentials: fromIni({ profile: process.env['PROFILE'] }),
    region: 'us-east-1',
});

export const db = drizzle(rdsClient, {
    database: process.env['DATABASE']!,
    secretArn: process.env['SECRET_ARN']!,
    resourceArn: process.env['RESOURCE_ARN']!,
});
export const migrate = async (path: string) => {
    return mig(db, { migrationsFolder: path });
};

export * as SQL from './index';