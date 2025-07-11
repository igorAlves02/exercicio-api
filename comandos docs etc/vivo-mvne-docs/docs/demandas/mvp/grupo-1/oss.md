# vivo-mvne-oss

Detalhamento para desenvolvimento do serviço `vivo-mvne-oss`. Esse é o nosso serviço que se conecta com os recursos de OSS da Vivo, Sigan e GSIM. Ele intermedia todas integrações com esses sistemas; persiste em banco os recursos que são criados; controla seus ciclos de vida, expiração, liberação; etc.

Também, é recomendada a leitura dos [direcionamentos de desenvolvimento](../../../fluxos/usuario/acquisition.md#direcionamentos-gerais-da-implementação).

## Criar pré-reserva de número

[Acesse aqui a Documentação da API](../../../apis/oss.md#criar-pré-reserva-de-número).

Ao ser chamado, esse serviço faz uma pré-reserva de três números no Sigan dado o DDD informado, que são liberados automaticamente em 15 minutos. Se for informado um `previousId` ele libera automaticamente a pré-reserva anterior, enviando o id externo anterior para o Sigan. A reserva e os números atrelados a ela são salvos no banco de dados. Os números reservados precisam ser ofuscados antes de ser retornados.

### Implementação

```
// Validações de entrada

Valida se DDD existe (método do recurso abaixo de validar DDDs);

se foi informado um previousId {
    Busca preview.external_id anterior;
    se não existe {
        emite erro;
    }
}

Chama Sigan para pré-reservar números com DDD, previousExternalId (se existente), brand_id e tempo de reserva 1 minuto a mais que a configuração;

Em transação de banco {
    Insere preview;
    Insere os três preview_number's; // Única query, sem loops
}

retorna dtos mapeados a partir dos objetos; // Lembre de ofuscar os números
```

## Reservar número de uma pré-reserva

[Acesse aqui a Documentação da API](../../../apis/oss.md#reservar-número-de-uma-pré-reserva).

Executa a reserva de um dos números da pré-reserva no Sigan, além de persistir esses recursos no banco de dados. Esse recurso não valida a autorização (se a carrier que emitiu a pré-reserva é a mesma da carrier que está reservando o número) por não ser exposto diretamente para o MVNO e, sim, utilizado pelo `vivo-mvne-acquisition` (que já valida a autorização) no fluxo de contratação.

### Implementação

```
// Validação de entrada, lock da pré-reserva

Busca preview (com id do path) e preview_number (com index do path); // Única query, inner join entre elas

se preview não existe {
    emite 404;
}

se preview está expirada {
    emite 410;
}

Busca phone_number com o msisdn escolhido;

se phone_number existe e não está no status RETURNED {
    emite 500;
}

Executa reserva no Sigan;

// Fora de transação, o phone_number precisa ser atualizado tendo sucesso ou erro pra atrelar a pré-reserva
// Isso pra garantir que essa reserva, que já foi efetivada no Sigan, será liberada em abandonos.
se phone_number existe {
    Alterar phone_number: (
        status para 'RESERVED',
        updated_at para agora,
        assigned_sim_id para NULL,
    );
} senão {
    Insere phone_number: (
        msisdn da reserva,
        origin como 'VIVO',
        status como 'RESERVED',
    );
}

Atualiza no banco preview.reserved_msisdn com o msisdn escolhido;

retorna dtos;
```

**Cuidado**: Aqui a reserva pode ser lenta (vários segundos), portanto, não recomendo fazer a chamada do Sigan em transação do banco.

## Reservar número aleatório

[Acesse aqui a Documentação da API](../../../apis/oss.md#reservar-número-aletório).

Reserva um número aleatório no Sigan sem necessidade de o cliente passar pelo fluxo de pré-reserva. Persiste esse `phone_number` no banco mas não cria uma `preview`.

```
Chama Sigan para pré-reservar um único número com DDD, brand_id;

Busca phone_number com o msisdn da pré-reserva;

se phone_number existe e está em status de uso {
    emite 500;
}

Executa reserva no Sigan;

se phone_number existe {
    Alterar phone_number: (
        status para 'RESERVED',
        updated_at para agora,
        assigned_sim_id para NULL,
    );
} senão {
    Insere phone_number: (
        msisdn da reserva,
        origin como 'VIVO',
        status como 'RESERVED',
    );
}

retorna dtos;
```

## Liberar reserva

[Acesse aqui a Documentação da API](../../../apis/oss.md#reservar-número-aletório).

Libera reserva feita por preview ou aleatória. Este recurso é idempotente, ou seja, retorna sucesso (204) tanto quando consegue liberar um número com status RESERVED quanto quando chamado para um número que já está RETURNED.

```
// Validações de entrada

Busca phone_number com msisdn informado;

se phone_number não existe {
    emite 404;
}

se phone_number está no status RETURNED {
    retorna 204;
}

se phone_number NÃO está no status RESERVED {
    emite 409;
}

Altera phone_number: (
    status para 'RETURNED',
    updated_at para agora,
    assined_sim_id para NULL,
);
```

## Liberação automática de reserva de números

Ainda não documentado, aguardando criação do `vivo-mvne-scheduler`.

## Consultar DDD

[Acesse aqui a Documentação da API](../../../apis/oss.md#consultar-ddd).

Valida na tabela `location_ddd` se o DDD existe, com cache no Redis.

### Implementação
```
// Validações de formato, cache no Redis

Verifica se DDD informado existe na tabela `location_ddd`;
```

## Listar marcas de dispositivos

[Acesse aqui a Documentação da API](../../../apis/oss.md#listar-marcas-de-dispositivos).

## Listar modelos de dispositivos

[Acesse aqui a Documentação da API](../../../apis/oss.md#listar-modelos-de-dispositivos).

## Validar compatibilidade com eSIM

[Acesse aqui a Documentação da API](../../../apis/oss.md#validar-compatibilidade-de-esim).
