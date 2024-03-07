import { Utils } from "../../../shared/utils";

describe('Utils', () => {
  describe('formatarData', () => {
    it('Deve formatar a data corretamente', () => {
      const data = new Date('2024-03-07');
      const dataFormatada = Utils.formatarData(data);
      expect(dataFormatada).toEqual('07/03/2024');
    });
  });

  describe('formatarMoeda', () => {
    it('Deve formatar o valor como moeda corretamente', () => {
      const valor = 1000.5;
      const valorFormatado = Utils.formatarMoeda(valor);
      expect(valorFormatado).toEqual('R$ 1.000,50');
    });
  });

  describe('uuid', () => {
    it('Deve retornar um UUID válido', () => {
      const uuid = Utils.uuid();
      expect(uuid).toHaveLength(36);
      expect(uuid[8]).toEqual('-');
      expect(uuid[13]).toEqual('-');
      expect(uuid[18]).toEqual('-');
      expect(uuid[23]).toEqual('-');
    });
  });
});
