import { pgTable, integer, text } from 'drizzle-orm/pg-core';

export const tblcounter = pgTable('tblcounter', {
    counter: text('counter').default("hits").primaryKey(),
    tally: integer('tally').default(0),
});