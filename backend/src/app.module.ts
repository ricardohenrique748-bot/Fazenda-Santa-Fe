import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth_new/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';

import { EmpresasModule } from './empresas/empresas.module';
import { FazendasModule } from './fazendas/fazendas.module';
import { FuncionariosModule } from './funcionarios/funcionarios.module';
import { ApontamentosModule } from './apontamentos/apontamentos.module';
import { VeiculosModule } from './veiculos/veiculos.module';
import { ManutencoesModule } from './manutencoes/manutencoes.module';
import { DepositosModule } from './depositos/depositos.module';
import { ProdutosModule } from './produtos/produtos.module';
import { EstoqueModule } from './estoque/estoque.module';
import { FinanceiroModule } from './financeiro/financeiro.module';
import { PlanejamentoModule } from './planejamento/planejamento.module';
import { SegurancaModule } from './seguranca/seguranca.module';
import { ComprasModule } from './compras/compras.module';
import { RelatoriosModule } from './relatorios/relatorios.module';
import { UnidadesNegocioModule } from './cadastros/unidades-negocio.module';
import { LocalizacoesModule } from './cadastros/localizacoes.module';
import { MunicipiosModule } from './cadastros/municipios.module';
import { CulturasModule } from './cadastros/culturas.module';
import { AtividadesModule } from './cadastros/atividades.module';
import { GruposEquipamentoModule } from './grupos-equipamento/grupos-equipamento.module';

import { GruposModule } from './grupos/grupos.module';
import { FabricantesModule } from './fabricantes/fabricantes.module';
import { ClientesModule } from './comercial/clientes/clientes.module';
import { PedidosVendaModule } from './comercial/pedidos/pedidos-venda.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    EmpresasModule,
    FazendasModule,
    FuncionariosModule,
    ApontamentosModule,
    VeiculosModule,
    ManutencoesModule,
    DepositosModule,
    ProdutosModule,
    EstoqueModule,
    FinanceiroModule,
    PlanejamentoModule,
    SegurancaModule,
    ComprasModule,
    RelatoriosModule,
    UnidadesNegocioModule,
    LocalizacoesModule,
    MunicipiosModule,
    CulturasModule,
    AtividadesModule,
    GruposEquipamentoModule,
    GruposModule,
    FabricantesModule,
    ClientesModule,
    PedidosVendaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
