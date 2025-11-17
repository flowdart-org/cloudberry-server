export class User {
  constructor(
    public id: string,
    public name: string | null,
    public email: string | null,
    public phone: string | null,
    public dob: Date | null,
    public gender: 'male' | 'female' | 'other' | null,
    public status: 'active' | 'suspended',
    public password: string | null,
    public tryOnLimit: number,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
