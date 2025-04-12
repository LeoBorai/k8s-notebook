// https://bun.sh/docs/api/http

const log = (...args: any[]) => console.log(args);

Bun.serve({
  port: 3030,
  // `routes` requires Bun v1.2.3+
  routes: {
    // Static routes
    "/api/status": req => {
      log(req);
      return new Response("OK");
    },

    // Dynamic routes
    "/users/:id": req => {
      log(req);
      return new Response(`Hello User ${req.params.id}!`);
    },

    // Per-HTTP method handlers
    "/api/posts": {
      GET: req => {
        log(req);
        return new Response("List posts");
      },
      POST: async req => {
        log(req);
        const body = await req.json();
        return Response.json({ created: true, ...body });
      },
    },

    // Wildcard route for all routes that start with "/api/" and aren't otherwise matched
    "/api/*": req => {
      log(req);
      return Response.json({ message: "Not found" }, { status: 404 });
    },

    // Redirect from /blog/hello to /blog/hello/world
    "/blog/hello": req => {
      log(req);
      return Response.redirect("/blog/hello/world");
    },

    // Serve a file by buffering it in memory
    "/source": async req => {
      log(req);
      return new Response(await Bun.file("./src/main.ts").bytes(), {
        headers: {
          "Content-Type": "text/typescript",
        },
      });
    },
  },

  // (optional) fallback for unmatched routes:
  // Required if Bun's version < 1.2.3
  fetch(req) {
    log(req);
    return new Response("Not Found", { status: 404 });
  },
});
