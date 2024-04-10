export class ResponseDto<Dto> {
  message: string;
  data: Dto;

  constructor(message: string, data?: Dto) {
    this.message = message;
    if (data) {
      this.data = data;
    }
  }
}
