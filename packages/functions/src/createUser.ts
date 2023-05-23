import { ApiHandler } from 'sst/node/api';
import { SQL } from '@sst-drizzle/core/sql/index';
import { users } from '@sst-drizzle/core/sql/schema';

export const handler = ApiHandler(async (_evt) => {
    const response = await SQL.db.insert(users).values({ id: 1, name: 'Andrew' });


    return {
        body: JSON.stringify(response, null, 2),
    };
});