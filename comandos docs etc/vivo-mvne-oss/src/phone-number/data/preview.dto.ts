export class PreviewNumberDto {
  private constructor(
    readonly preview: string,
    readonly index: number,
  ) {}

  static of(msisdn: string, index: number): PreviewNumberDto {
    return new PreviewNumberDto(msisdn, index);
  }
}

export class PreviewDto {
  private constructor(
    readonly id: string,
    readonly msisdns: PreviewNumberDto[],
  ) {}

  static ofSigan(previewId: string, msisdns: string[]): PreviewDto {
    return new PreviewDto(
      previewId,
      msisdns.map((msisdn, idx) => PreviewNumberDto.of(msisdn, idx + 1)),
    );
  }
}
