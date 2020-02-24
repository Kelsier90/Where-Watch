export default interface LocaleOption{
    getId(): string
    getName(): string;

    setId(value: string): LocaleOption
    setName(value: string): LocaleOption;
}