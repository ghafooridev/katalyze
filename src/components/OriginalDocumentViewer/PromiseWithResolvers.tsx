export type PromiseWithResolvers<T> = {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: unknown) => void;
};

declare global {
  interface PromiseConstructor {
    withResolvers<T>(): PromiseWithResolvers<T>;
  }
}

export function polyfillPromiseWithResolvers() {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!Promise.withResolvers) {
    Promise.withResolvers = function withResolvers<T>(): PromiseWithResolvers<T> {
      let promiseResolver!: (value: T | PromiseLike<T>) => void;
      let promiseRejecter!: (reason?: unknown) => void;

      const promise = new Promise<T>((res, rej) => {
        promiseResolver = res;
        promiseRejecter = rej;
      });

      return {
        promise,
        resolve: promiseResolver,
        reject: promiseRejecter,
      };
    };
  }
}
