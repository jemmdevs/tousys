import Script from 'next/script';
import { Thing, WithContext } from 'schema-dts';

interface StructuredDataProps<T extends Thing> {
    data: WithContext<T>;
    id?: string;
}

export default function StructuredData<T extends Thing>({ data, id }: StructuredDataProps<T>) {
    return (
        <Script
            id={id || 'structured-data'}
            type="application/ld+json"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}
