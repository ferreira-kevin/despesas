import { EmailAgent } from "../infrastructure/agents/emailAgent";
import { UsuarioRepository } from "../repositories/despesaRepository";
import { DespesaRepository } from "../repositories/usuarioRepository";
import { DespesaService } from "../services/despesaService";
import { UsuarioService } from "../services/usuarioService";
import { DespesaController } from "./despesaController";
import { UsuarioController } from "./usuarioController";

const emailAgent = new EmailAgent();

const despesaRepository = new DespesaRepository();
const usuarioRepository = new UsuarioRepository();

const despesaService = new DespesaService(despesaRepository, emailAgent);
const usuarioService = new UsuarioService(usuarioRepository);

const despesaController = new DespesaController(despesaService);
const usuarioController = new UsuarioController(usuarioService);

export { despesaController, usuarioController }