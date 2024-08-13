import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({ logger: true });
const port = process.env.PORT;

server.register(cors, {
  origin: "*",
});

const teams = [
  { id: 1, name: "RCM Motorsport", base: "Curitiba, Paraná, Brasil" },
  { id: 2, name: "Full Time Sports", base: "Vinhedo, São Paulo, Brasil" },
  { id: 3, name: "Crown Racing", base: "Cotia, São Paulo, Brasil" },
  { id: 4, name: "KTF Sports", base: "São Paulo, São Paulo, Brasil" },
  { id: 5, name: "Vogel Motorsport", base: "São Paulo, São Paulo, Brasil" },
  { id: 6, name: "Blau Motorsport", base: "Cotia, São Paulo, Brasil" },
  { id: 7, name: "A. Mattheis Motorsport", base: "Petropolis, Rio de Janeiro, Brasil" },
  { id: 8, name: "Cavaleiro Sports", base: "São Paulo, São Paulo, Brasil" },
  { id: 9, name: "R. Mattheis Motorsport", base: "Petropolis, Rio de Janeiro, Brasil" },
  { id: 10, name: "Hot Car Competições", base: "Barueri, São Paulo, Brasil" },
  { id: 11, name: "Shell V-Power", base: "São Paulo, São Paulo, Brasil" },
  { id: 12, name: "Itaipava Racing Team", base: "Curitiba, Paraná, Brasil" },
];

const drivers = [
  { id: 1, name: "Rubens Barrichello", team: "Full Time Sports" },
  { id: 2, name: "Gabriel Casagrande", team: "RCM Motorsport" },
  { id: 3, name: "Thiago Camilo", team: "Ipiranga Racing" },
  { id: 4, name: "Cacá Bueno", team: "Crown Racing" },
  { id: 5, name: "Daniel Serra", team: "Eurofarma RC" },
  { id: 6, name: "Ricardo Zonta", team: "RCM Motorsport" },
  { id: 7, name: "Felipe Fraga", team: "Cavaleiro Sports" },
  { id: 8, name: "Cesar Ramos", team: "Crown Racing" },
  { id: 9, name: "Marcos Gomes", team: "KTF Sports" },
  { id: 10, name: "Diego Nunes", team: "Blau Motorsport" },
  { id: 11, name: "Nelsinho Piquet", team: "Motortech Competições" },
  { id: 12, name: "Tony Kanaan", team: "Full Time Bassani" },
];

server.get("/teams", async (request, response) => {
  response.type("application/json").code(200);
  return { teams };
});

server.get("/drivers", async (request, response) => {
  response.type("application/json").code(200);
  return { drivers };
});

interface DriverParams {
  id: string,
  name: string,
  team: string
}

server.get<{ Params: DriverParams }>(
  "/drivers/:id",
  async (request, response) => {
    const id = parseInt(request.params.id);
    const driver = drivers.find((d) => d.id === id);

    if (!driver) {
      response.type("application/json").code(404);
      return { message: "Driver Not Found" };
    } else {
      response.type("application/json").code(200);
      return { driver };
    }
  }
);

server.listen({ port: 3333 }, () => {
    let date = new Date();
    console.log(`Servidor iniciado na porta ${port} \n ${date}`);
});