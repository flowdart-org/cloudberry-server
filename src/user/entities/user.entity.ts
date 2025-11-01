export class User {
  constructor(
    public id: string,
    public name: string | null,
    public email: string | null,
    public phone: string | null,
    public dob: Date | null,
    public password: string | null,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
