type FieldMapper<T> = {
    [K in keyof T]: {
        key: Extract<K, string>
        map: (value: FormDataEntryValue | null) => T[K];
    };
}[keyof T];

export function mapFormData<T extends Record<string, unknown>>(
    formData: FormData,
    fields: FieldMapper<T>[],
): T {
    const result = fields.reduce((acc, field) => {
        acc[field.key] = field.map(formData.get(field.key))
        return acc;
    }, {} as Record<string, unknown>)

    return result as T;
}
