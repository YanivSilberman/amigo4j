import Amigo4j from '../index';

const amigo4j = new Amigo4j({ User: {}, Team: {}, IN_TEAM: {} });

const t = amigo4j
  .run()
  .match([
    [
      amigo4j.node({ variables: "u", label: amigo4j.labels.User, args: { id: "123" } }),
      amigo4j.link(),
      amigo4j.rel({ label: amigo4j.labels.IN_TEAM }),
      amigo4j.link({ direction: amigo4j.linkDirection.right }),
      amigo4j.node({ variable: "o", label: amigo4j.labels.User, args: { id: "678" } })
    ],
    amigo4j.node({
      variable: "i",
      label: amigo4j.labels.User,
      args: { id: "345" }
    })
  ])
  .with([ { variable: 'count("*")', as: "Count" } ])
  .unwind([], "List")
  .return("o")

console.log(t);
