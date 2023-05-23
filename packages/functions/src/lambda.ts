import { SQL } from '@sst-drizzle/core/sql/index';
import { tblcounter } from '@sst-drizzle/core/sql/schema';
import { eq } from 'drizzle-orm';

export async function handler() {
    // const response = await SQL.db.select().from(users);
    const record = await SQL.db.select().from(tblcounter).where(eq(tblcounter.counter, 'hits'));
    let count = record[0].tally;
    console.log(count);
    const response = await SQL.db.update(tblcounter).set({ tally: ++count });
    console.log(response);

    return {
        statusCode: 200,
        body: count,
    };
};
