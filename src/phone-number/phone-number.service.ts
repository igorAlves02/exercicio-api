import { Injectable } from '@nestjs/common';
import { Preview } from './data/preview';
import { PreviewNumber } from './data/preview-number';

@Injectable()
export class PhoneNumberService {
  createPreview(areaCode: string, previousId: string) {
    const id = '00000000-0000-4000-a000-000000000000';
    
    const preview: Preview = {
      id,
      external_id: '1234',
      created_at: new Date(),
    };

    const previewNumbers: PreviewNumber[] = [
      {
        preview_id: id,
        msisdn: `${areaCode}999500001`,
 index: 1,
      },
      {
        preview_id: id,
        msisdn: `${areaCode}999500002`,
        index: 2,
      },
      {
        preview_id: id,
        msisdn: `${areaCode}999500003`,
        index: 3,
      },
    ];

    console.log('📞 Parâmetros recebidos:', { areaCode, previousId });
    console.log('✅ Preview criado:', preview);
    console.log('📱 Números gerados:', previewNumbers);

    return {
      preview,
      previewNumbers
    };
  }
}