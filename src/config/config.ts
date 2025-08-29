type Environment = "production" | "staging" | "development";

const environment: Environment =
  (process.env.NEXT_PUBLIC_ENV as Environment) ?? "development";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
console.log("base url is commig");
console.log(BASE_URL);

export { BASE_URL, environment };
