mock "POST /resourcePoolManagement/v4/availability-check" {
  headers {
    Content-Type = "application/json"
  }

  body = <<EOF
  {{set 'ddd' request.body.resourceCapacityDemand.resourcePool.resource.value}}
  {{set 'msisdn1' (append (get 'ddd') '9' (random 10000000 99999999))}}
  {{set 'msisdn2' (append (get 'ddd') '9' (random 10000000 99999999))}}
  {{set 'msisdn3' (append (get 'ddd') '9' (random 10000000 99999999))}}

  {{log (append "Pre-reserved msisdns '" (get 'msisdn1') "', '" (get 'msisdn2') "' and '" (get 'msisdn3'))}}
  {{log (append 'PreviousId: ' (JSONstringify request.body.resourceCapacityDemand.characteristic))}}

  {
    "resourceCapacityDemand": {
      "resourceSpecification": {
        "id": "{{random 500000000 600000000}}",
        "capacityDemandAmount": "3",
        "capacityTimePeriod": "15"
      },
      "resourcePool": [
        {
          "resource": {
            "value": "{{get 'msisdn1'}}"
          }
        },
        {
          "resource": {
            "value": "{{get 'msisdn2'}}"
          }
        },
        {
          "resource": {
            "value": "{{get 'msisdn3'}}"
          }
        }
      ]
    }
  }
  EOF
}

mock "POST /resourcePoolManagement/v4/reservation/number" {
  status = 204
}
