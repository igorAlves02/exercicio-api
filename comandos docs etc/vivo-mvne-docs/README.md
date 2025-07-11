# Documentação MVNE

Este é o repositório de documentação interna da MVNE Zup + Vivo. Este repositório contém toda a documentação técnica necessária para entender a solução de MVNE (Mobile Virtual Network Enabler).

## Sobre a plataforma

A plataforma é uma solução MVNE completa que viabiliza MVNOs (Mobile Virtual Network Operators) credenciadas da Vivo. O sistema é composto por:

- **Plataforma MVNE**: Processa toda a lógica das MVNOs, orquestra fluxos de negócio e integra sistemas técnicos. Clientes podem desenvolver seus canais consumindo as APIs da plataforma para terem uma operadora virtual;
- **Canal Whitelabel**: Canal marca branca e multi-tenant pronto para clientes que não desejam desenvolver um próprio;
- **Integração com RealWave**: Sistema BSS (Business Support System) Lean que orquestra fluxos e gerencia recursos como customers, catalogs, products, etc;
- **Integração com NGIN**: OCS (Online Charging System) utilizado para controle de saldos e consumo;
- **Integração com OSS Vivo**: Integração com sistemas de suporte a operação como o gerenciador de SIMs (GSIM) e o gestor de números (Sigan) da Vivo.

## Documentação disponível

- [Primeiros Passos](docs/primeiros-passos.md) - Guia inicial para novos Zuppers;
- [Glossário](docs/glossario.md) - Termos técnicos e entidades principais;
- [Arquitetura](docs/arquitetura.md) - Visão geral da arquitetura do sistema;
- [Modelo de Dados](docs/dados.md) - Modelo de dados da plataforma;
- [APIs](docs/apis/README.md) - Documentação das APIs disponíveis;
- [Fluxos de Negócio](docs/fluxos/README.md) - Descrição dos principais fluxos de negócio;
- [Guia de Integração](docs/integracao.md) - Como integrar com a plataforma;
- [Troubleshooting](docs/troubleshooting.md) - Solução de problemas comuns.
