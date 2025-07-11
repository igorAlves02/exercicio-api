export type PreviewNumberDto = {
  preview: string;
  index: number;
};

export type PreviewDto = {
  id: string;
  msisdn: PreviewNumberDto[];
};
