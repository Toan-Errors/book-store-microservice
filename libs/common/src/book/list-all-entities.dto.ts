export class ListAllEntitiesDto {
  readonly _id: object;
  readonly title: string;
  readonly subtitle: string;
  readonly author: string;
  readonly country: string;
  readonly ageGroup: string;
  readonly saleDate: Date;
  readonly price: number;
  readonly publisher: string;
  readonly genres: string[];
  readonly pages: number;
  readonly coverImage: string;
  readonly language: string;
}
