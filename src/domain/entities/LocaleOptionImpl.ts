import LocaleOption from "./contracts/LocaleOption";

export default class LocaleOptionImpl implements LocaleOption{
    private id: string = "";
    private name: string = "";

    constructor(id: string, name: string) {
        this.setId(id);
        this.setName(name);
    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    setId(value: string): LocaleOption {
        this.id = value;
        return this;
    }

    setName(value: string): LocaleOption {
        this.name = value;
        return this;
    }
}