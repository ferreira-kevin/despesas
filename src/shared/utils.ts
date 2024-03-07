import crypto from 'crypto';

export class Utils {
	static formatarData(date: Date): string {
        const day = String(date.getDate() + 1).padStart(2, '0');
      console.log(day)

        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear());
      
        return `${day}/${month}/${year}`;
    }
    
    static formatarMoeda(value: number): string {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    static uuid() : string{
        return crypto.randomUUID({disableEntropyCache : true});
    }
}