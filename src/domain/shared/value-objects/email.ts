export default class Email {
  private constructor(readonly value: string) {
    this.value = value;
  }

  static create(email: string) {
    return new Email(email);
  }

  validade() {
    return !!this.value
      .toLowerCase()
      .match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i);
  }
}
