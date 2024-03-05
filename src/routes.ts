import { Router } from 'express';
import authMiddleware from './middlewares/authMiddleware';
import validatorMiddleware from './middlewares/validatorMiddleware';
import cadastrarUsuarioValidation from './controllers/validations/cadastrarUsuarioValidation';
import { despesaController, usuarioController } from './controllers';

const router = Router();

router.post('/usuario', cadastrarUsuarioValidation, validatorMiddleware, (request, response) => usuarioController.cadastrarUsuario(request, response));

router.post('/sessions', [], validatorMiddleware, (request, response) => usuarioController.entrarUsuario(request, response));

router.use(authMiddleware);

router.delete('/usuario', [], validatorMiddleware, (request, response) => usuarioController.excluirCadastroUsuario(request, response));

router.get('/despesas', [], validatorMiddleware, (request, response) => despesaController.obterDespesa(request, response));

router.post('/despesas', [], validatorMiddleware, (request, response) => despesaController.cadastrarDespesa(request, response));

router.put('/despesas/:id', [], validatorMiddleware, (request, response) => despesaController.atualizarDespesa(request, response));

router.delete('/despesas/:id', [], validatorMiddleware, (request, response) => despesaController.excluirDespesa(request, response));

export { router }