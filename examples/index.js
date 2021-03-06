import Amigo4j, { not, exists, startsWith, or, count } from '../index';

const schema = {
  User: {
    createdAt: {
      type: 'datetime',
      default: () => new Date(),
    },
    id: {
      primary: true,
      type: 'uuid',
      required: true,
      unique: true,
    },
    inTeam: {
      type: 'RELATIONSHIP',
      relationship: 'IN_TEAM',
      target: 'Team',
      direction: 'out',
    },
  }
}

const amigo4j = Amigo4j({
  schema,
  schemaToMethods: true
});

/*

MATCH
  (u:User { id: "123" })-[:IN_TEAM]->(o:User { id: "456" }),
  (i:User { id: "345" })
WHERE NOT exists(u.name) OR u.name STARTS WITH y
WITH count(*) as Count
UNWIND [] as List
RETURN o

*/


const { query } = amigo4j
  .run()
  .loadCsv('https://...', true, 500)
    .as('line')
  ._call("db.propertyKeys()")
    .yield("propertyKey")
      .as('prop')
  .merge()
    .node({ variable: "x" })
    .rel({ right: true })
    .onMatch()
      .set('x.age = 3')
    .onCreate()
      .set('x.age = 0')
  .match()
    .User("o", { id: "123" })
      .inTeam({ left: true })
      .node({ variable: "o", label: amigo4j.labels.User, args: { id: "678" } })
    .comma()
      .nodeById("456", null, "i")
  .whereNotExists("n.name")
    .or(startsWith("u.name", "y"))
  .with({ variable: count(), as: "Count" })
  .set('u', 'name', '+=', 15)
  .remove('u:User')
  .create()
    .User(null, { name: "Olga" })
  .unwind([], 'List')
  .orderBy('u.name', true)
  .foreach({ variable: 'n', list: 'nodes(p)', action: 'SET n.marked = TRUE' })
  .skip(15)
  .return(['u', 'o'])
  .limit(1)
  .delete('n', true)


console.log(query);
