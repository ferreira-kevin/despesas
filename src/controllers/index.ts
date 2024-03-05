import { EmailAgent } from "../infrastructure/agents/emailAgent";
import { DespesaRepository } from "../repositories/despesaRepository";
import { UsuarioRepository } from "../repositories/usuarioRepository";
import { DespesaService } from "../services/despesaService";
import { UsuarioService } from "../services/usuarioService";
import { DespesaController } from "./despesaController";
import { UsuarioController } from "./usuarioController";

const emailAgent = new EmailAgent();

const despesaRepository = new DespesaRepository();
const usuarioRepository = new UsuarioRepository();

const despesaService = new DespesaService(despesaRepository, usuarioRepository, emailAgent);
const usuarioService = new UsuarioService(usuarioRepository);

const despesaController = new DespesaController(despesaService);
const usuarioController = new UsuarioController(usuarioService);

export { despesaController, usuarioController }