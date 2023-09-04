export type Writable<T> = {
  -readonly [K in keyof T]: T[K];
}

export type MaybeArray<T> = T | Array<T>

export type ElementOf<T> = T extends (infer E)[] ? E : never
