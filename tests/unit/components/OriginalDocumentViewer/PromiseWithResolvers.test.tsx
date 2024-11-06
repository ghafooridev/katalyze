import { polyfillPromiseWithResolvers } from "@/components/OriginalDocumentViewer/PromiseWithResolvers";

describe('polyfillPromiseWithResolvers', () => {
  it('should add withResolvers method to Promise', () => {
    polyfillPromiseWithResolvers();
    expect(Promise.withResolvers);
  });

  it('should resolve promise correctly', () => {
    polyfillPromiseWithResolvers();
    const promiseWithResolvers = Promise.withResolvers<number>();
    const testValue = 42;
    promiseWithResolvers.resolve(testValue);
    expect(promiseWithResolvers.promise);
  });
});