export default class Email {
  private constructor(readonly value: string) {
    this.value = value;
  }

  static create(email: string) {
    return new Email(email);
  }

  validate() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(this.value);
  }
}
