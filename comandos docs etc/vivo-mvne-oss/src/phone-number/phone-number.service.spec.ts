import { Test, TestingModule } from '@nestjs/testing';
import { PhoneNumberService } from './phone-number.service';

describe('PhoneNumberService', () => {
  let service: PhoneNumberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhoneNumberService],
    }).compile();

    service = module.get<PhoneNumberService>(PhoneNumberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should mask msisdns', () => {
    const msisdn = '34995001234';
    const actual = service['maskMsisdn'](msisdn);

    expect(actual).toBe('(34) 9****-1234');
  });
});
