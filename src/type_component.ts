export type TJsonValue = string | number | boolean | null | undefined | TJsonValue[] | { [key: string]: TJsonValue }|{}|Function;
export type TJsonObject = { [key: string]: TJsonValue }|{};
export type Props = Record<string, any>
export type Children = Record<string, Props>
export function Arrow() { return 5 }