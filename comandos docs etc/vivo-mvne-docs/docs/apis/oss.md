# APIs do serviço `vivo-mvne-oss`

## Criar pré-reserva de número

Gera uma lista de números de telefone disponíveis para um DDD específico. Você informa o código de área (ex: "11") e recebe algumas opções de números para escolher depois.

`POST /previews`

**Request - Primeira chamada**:

```json
{
  "areaCode": "11"
}
```

**Request - Chamadas subsequentes**:

```json
{
  "previousId": "00000000-0000-0000-0000-000000000000",
  "areaCode": "11"
}
```

**Response**:

```json
{
  "id": "00000000-0000-0000-0000-000000000000",
  "msisdns": [{
    "preview": "(11) 9****-0001",
    "index": 1
  }, {
    "preview": "(11) 9****-0002",
    "index": 2
  }, {
    "preview": "(11) 9****-0003",
    "index": 3
  }]
}
```

## Reservar número de uma pré-reserva

Confirma a reserva de um número que foi previamente sugerido na pré-reserva. Você escolhe o número pelo índice (`index`) e garante que ele será seu.

`PUT /previews/{preview_id}/reservations/{index}`

**Response:**

```json
{
  "msisdn": "11999950001"
}
```

## Reservar número aletório

Reserva imediatamente um número de telefone aleatório, sem precisar passar pelo processo de pré-reserva.

`POST /reservations`

**Response:**

```json
{
  "msisdn": "11999950001"
}
```

## Liberar reserva

Libera reserva feita por preview ou aleatória.

`DELETE /reservations/{msisdn}`

Retorna:
- 204 caso o número informado tenha sido liberado (idempotente);
- 404 caso o número não exista;
- 409 caso o número esteja em um status que não pode ser liberado (por exemplo: em uso).

## Consultar DDD

Valida se um DDD existe ou não.

`GET /ddds/{ddd}`

Response code 204 se existe, 404 se DDD não existe, 400 se DDD no formato inválido.

## Listar marcas de dispositivos

Lista as marcas de dispositivos homologados que suportam eSIM.

`GET /brands`

**Response**:
```json
{
  "brands": [{
    "id": "00000000-0000-0000-0000-000000000000",
    "name": "Samsung"
  }, {
    "id": "00000000-0000-0000-0000-000000000000",
    "name": "Apple"
  }]
}
```

## Listar modelos de dispositivos

Lista os modelos homologados que suportam eSIM.

`GET /brands/{id}/models`

**Response**:
```json
{
  "models": [{
    "model": "SAMSUNG_S25",
    "name": "Samsung S25"
  }, {
    "model": "SAMSUNG_S25",
    "name": "iPhone 16"
  }]
}
```

## Validar compatibilidade de eSIM

Verifica se um determinado aparelho é compatível com eSIM e retorna seu identificador, `hash`. Você pode fazer a checagem de três formas: informando o TAC para Android, o `device code` para iOS, ou o `device model` para instalação em outros dispositivos. O retorno diz se o aparelho suporta ou não eSIM, junto do `hash` do modelo que será utilizado para solicitar o eSIM.

`PUT /device-models`

**Request - TAC**
```json
{
  "tac": "00000000"
}
```

**Request - Device Code**
```json
{
  "deviceCode": "iPhone SE"
}
```

**Request - Device Model**
```json
{
  "deviceModel": "SAMSUNG_S25"
}
```

**Response - Suporta**

```json
{
  "supportsEsim": true,
  "hash": "00000000000000000000000000000000"
}
```

**Response - Não Suporta**

```json
{
  "supportsEsim": false
}
```
