export declare class EspBus<TEventMap extends Record<string, any>> {
    static getInstance<TBus extends Record<string, any>>(): EspBus<TBus>;
    subscribe<K extends keyof TEventMap>(event: K, callback: (payload: TEventMap[K]) => void): void;
    unsubscribe<K extends keyof TEventMap>(event: K, callback: (payload: TEventMap[K]) => void): void;
    publish<K extends keyof TEventMap>(event: K, payload: TEventMap[K]): void;
}
