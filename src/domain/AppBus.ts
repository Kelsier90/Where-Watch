import Client from "./client/contracts/Client";
import ApiClient from "./client/ApiClient";


export default class AppBus {
    private static readonly LOCALE_KEY: string = "client_locale";
    private static clientInstance: Client | null = null;

    public static getClient(): Client {
        if(this.clientInstance === null) {
            this.clientInstance = new ApiClient();
        }

        this.setClientLocale();

        return this.clientInstance;
    }

    public static setLocale(locale: string | null): void {
        if(locale === null) {
            localStorage.removeItem(this.LOCALE_KEY);
            return;
        }
        localStorage.setItem(this.LOCALE_KEY, locale);

        this.setClientLocale();
    }

    public static getLocale(): string | null {
        return localStorage.getItem(this.LOCALE_KEY);
    }

    private static setClientLocale(): void {
        if(this.clientInstance === null)
            return;
        const locale = this.getLocale();
        if(locale !== null)
            this.clientInstance.setLocale(locale);
    }
}