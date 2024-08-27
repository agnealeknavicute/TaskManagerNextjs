import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { getTranslation } from './app/api/route';

export const locales = ['en', 'ru', 'lv'];

export default getRequestConfig(async ({ locale }) => {
    if (!locales.includes(locale as any)) notFound();

    return {
        messages: await getTranslation(locale),
    };
});
