export type Optional<Type, Key extends keyof Type> = Omit<Type, Key> &
  Partial<Type>;
