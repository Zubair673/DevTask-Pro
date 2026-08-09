const getResources = (task) => {

  const title = `${task.title} ${task.course}`.toLowerCase();

  if (title.includes("react"))
    return resourceLinks.React;

  if (title.includes("javascript"))
    return resourceLinks.JavaScript;

  if (title.includes("html"))
    return resourceLinks.HTML;

  if (title.includes("css"))
    return resourceLinks.CSS;

  if (title.includes("tailwind"))
    return resourceLinks.Tailwind;

  if (title.includes("bootstrap"))
    return resourceLinks.Bootstrap;

  if (title.includes("node"))
    return resourceLinks.Node;

  if (title.includes("express"))
    return resourceLinks.Express;

  if (
    title.includes("mongodb") ||
    title.includes("mongo")
  )
    return resourceLinks.MongoDB;

  if (
    title.includes("sql") ||
    title.includes("database")
  )
    return resourceLinks.Database;

  if (
    title.includes("ai") ||
    title.includes("artificial")
  )
    return resourceLinks.AI;

  if (title.includes("python"))
    return resourceLinks.Python;

  if (title.includes("git"))
    return resourceLinks.Git;

  if (title.includes("docker"))
    return resourceLinks.Docker;

  if (title.includes("operating"))
    return resourceLinks.Operating;

  return {
    docs: "https://developer.mozilla.org/",
    video: "https://www.youtube.com/",
    practice: "https://www.frontendmentor.io/",
  };

};