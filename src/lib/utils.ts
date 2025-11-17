import {clsx} from 'clsx'
import {twMerge} from 'tailwind-merge'


type ClassValue = string | number | boolean | null | undefined | Record<string, boolean>;

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
}