import { Logger } from "../utils/index.mjs";

/**
 * Provide a new autoconfigured logger to the class.
 *
 * @param constructor
 */
// TODO: Delete when AutoInject / Injectab
export function InjectLogger<T extends { new (...args: any[]): {} }>(
    constructor: T,
) {
    const basePrototype = constructor.prototype;

    // TODO: Move that in a DecoratorBuilder
    return {
        [constructor.name]: class extends constructor {
            logger: Logger = new Logger({
                name: constructor.name,
            });

            constructor(...args: any[]) {
                super(...args);

                // TODO: Move that in a DecoratorBuilder

                // Include all the base methods to the new one
                Object.getOwnPropertyNames(basePrototype).forEach((key) => {
                    if (typeof basePrototype[key] === "function") {
                        (this as any).constructor.prototype[key] =
                            basePrototype[key];
                    }
                });
            }
        },
    }[constructor.name];
}
