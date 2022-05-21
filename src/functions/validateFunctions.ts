export function isInteger(num: number): boolean {
    if (num % 1 == 0) {
        return true;
    } else {
        return false;
    }
}

export const regExp = /^[ -~¿-ÿ\u00f1\u00d1]/g;
