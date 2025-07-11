# Glossário

Este documento contém os principais termos técnicos e entidades utilizados na plataforma MVNE, organizados para facilitar o entendimento e padronizar a comunicação.

## Siglas

| Sigla | Significado                     | Descrição                                                                                                                                   |
| ----- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| MVNO  | Mobile Virtual Network Operator | Operadora virtual viabilizada pela plataforma                                                                                               |
| MVNE  | Mobile Virtual Network Enabler  | Plataforma que viabiliza MVNOs com desenvolvimento mínimo                                                                                   |
| BSS   | Business Support System         | Sistema de suporte a negócios, tarefa dividida entre RealWave e a plataforma. Referencia os sistemas que contêm e aplicam regras de negócio |
| CRM   | Customer Resource Manager       | Sistema para atendimento do usuário (RealWave CSP), utilizado pelos times de atendimento da Vivo / Atento e dos MVNOs                       |
| OSS   | Operations Support System       | Sistemas técnicos para operação. Cuidam de recursos de telco e seus provisionamentos como SIMs (GSIM) e números (Sigan)                     |
| OCS   | Online Charging System          | Sistema que gerencia saldos e consumo das linhas (NGIN)                                                                                     |

## Entidades principais

### Hierarquia das Entidades

```
Usuário (Customer)
└── Linha (Product)
    ├── Número (MSISDN)
    └── SIM (SIM Card / eSIM)
```

### Usuário

Um usuário é a conta de uma pessoa na plataforma. Um usuário pode ter várias linhas contratadas; uma pessoa pode ter vários usuários no sistema, seja por ter planos em diferentes MVNOs/Tenants, seja por retornar para a plataforma após ter cancelado uma conta anterior.

**Observação**: No RealWave, o conceito de Customer é utilizado. Na VivoNet, o conceito de client é utilizado.

**Sinônimos recomendados**: Usuário, Customer

**Sinônimos não recomendados**:

- Cliente (pode causar ambiguidade com o MVNO, que é o cliente B2B da Vivo)
- Pessoa (uma pessoa pode ter mais de uma conta)
- Conta (pode ser confundido com fatura, conta a pagar)

### Linha

Representa uma "contratação" do usuário. Uma pessoa pode ter um único usuário e contratar várias linhas. A linha é a entidade principal na qual os recursos dessa contratação são atrelados (saldo, histórico de consumo, ciclo de vida, etc).

**Observação**: No RealWave, o termo "product" é utilizado pois ele é um BSS que suporta diversos negócios, não só telco.

**Sinônimos recomendados**: Linha, Product

**Sinônimos não recomendados**:
- Chip (o usuário pode trocar de chip e manter a mesma linha)
- Número (o usuário pode trocar de número e manter a mesma linha)

### Número

O número é o "endereço" da linha, assim como um endereço de email ou um endereço de IP. Assim como um servidor pode trocar de endereço IP e se manter o mesmo servidor, com os mesmo arquivos e processos; uma linha também pode trocar de número e se manter a mesma linha, com os mesmos saldos, históricos, etc.

**Sinônimos recomendados**: Número, MSISDN

**Sinônimos não recomendados**: Linha (frequentemente utilizado incorretamente para referenciar o número, mas é um conceito diferente)

### SIM

Recurso utilizado para autenticar e autorizar um terminal (dispositivo) a utilizar os saldos de uma linha. Uma linha pode trocar de SIM ou Número e ainda manter seus saldos, históricos, etc.

**Sinônimos recomendados**: SIM

**Sinônimos não recomendados**: Chip (às vezes usado apenas para SIM Card, não para eSIM)

## SIM

O SIM (Subscriber Identity Module) é o recurso utilizado para autenticar e autorizar um terminal (dispositivo) a utilizar os saldos de uma linha. Uma linha pode trocar de SIM ou Número e ainda manter seus saldos, históricos, etc.

**Sinônimos Recomendados:** SIM

**Sinônimos não recomendados:** Chip - Às vezes é utilizado para falar somente do SIM Card, não do eSIM

### SIM Card

O SIM Card é o chip físico tradicional que pode ser inserido e removido de dispositivos móveis.

**Sinônimos Recomendados:** SIM Card, Chip Físico

**Sinônimos não recomendados:** Chip - Às vezes é utilizado para falar de SIMs no geral, não só o SIM Card.

### eSIM

O eSIM é um chip embutido diretamente na placa do dispositivo, que pode ser programado remotamente para se conectar a diferentes operadoras sem a necessidade de troca física.

**Sinônimos Recomendados:** eSIM (somente)

**Sinônimos não recomendados:** Chip Virtual - O eSIM não é virtual, é físico mesmo mas embutido na placa dos dispositivos. Também existem tecnologias de chip virtuais menos difundidas que, no futuro, podem causar confusão com o termo (soft sim, iSIM, etc).
