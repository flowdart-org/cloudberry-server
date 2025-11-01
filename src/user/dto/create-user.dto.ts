export class CreateUserDto {
  public name?: string;
  public email?: string;
  public phone?: string;
  public dob?: Date;
  public password?: string;

  constructor(data: Partial<CreateUserDto>) {
    Object.assign(this, data);
  }
}
