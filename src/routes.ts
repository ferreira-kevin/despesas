import { Request, Response, Router } from 'express';
import authMiddleware from './middlewares/authMiddleware';
import validatorMiddleware from './middlewares/validatorMiddleware';
import cadastrarUsuarioValidation from './controllers/validations/cadastrarUsuarioValidation';
import { despesaController, usuarioController } from './controllers';
import cadastrarDespesaValidation from './controllers/validations/cadastrarDespesaValidation';
import sessionValidation from './controllers/validations/sessionValidation';
import idDespesaValidation from './controllers/validations/idDespesaValidation';

const router = Router();

router.post('/usuarios', cadastrarUsuarioValidation, validatorMiddleware, (request, response) => usuarioController.cadastrarUsuario(request, response));

router.post('/sessions', sessionValidation, validatorMiddleware, (request, response) => usuarioController.entrarUsuario(request, response));

router.use(authMiddleware);

router.delete('/usuarios', [], validatorMiddleware, (request, response) => usuarioController.excluirCadastroUsuario(request, response));

router.get('/despesas/:id', idDespesaValidation, validatorMiddleware, (request, response) => despesaController.obterDespesa(request, response));

router.get('/despesas', [], validatorMiddleware, (request, response) => despesaController.listarDespesas(request, response));

router.post('/despesas', cadastrarDespesaValidation, validatorMiddleware, (request, response) => despesaController.cadastrarDespesa(request, response));

router.put('/despesas/:id', idDespesaValidation, validatorMiddleware, (request, response) => despesaController.atualizarDespesa(request, response));

router.delete('/despesas/:id', idDespesaValidation, validatorMiddleware, (request, response) => despesaController.excluirDespesa(request, response));

router.use((req: Request, res: Response) => res.status(404).json({ error: 'Página não encontrada' }));

export { router }
