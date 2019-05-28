Amigo4j

A javascript query builder for Neo4j, turning a schema + chain match methods into a viable Cypher query. Amigo4j can sit on top of an ORM and replace and raw cypher queries, and integrate
into a graphql wrapper to enforce the queries bring format the data properly

General Architecture


Amigo4j <- inherits - Core <- [ Match, Return, Create, ... ]

Amigo4j (./index.js) - final class, takes schema and return component

Core (./src/neo4j) - universal neo4j methods:
  node / rel / link : create validated params for an item
  handleNode / handleRel / handleLink : turn params into a neo4j string
  validate(params) .node / .rel / .link : validate params are proper

Match / Return / Create ... - Methods for creating and properly formatting each neo4j method



How To Use
