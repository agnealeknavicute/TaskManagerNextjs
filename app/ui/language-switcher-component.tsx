'use client';

import { Link, usePathname } from '../navigations';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

const LanguageSwitcher = () => {
    const pathname = usePathname();
    const t = useTranslations('All');

    return (
        <div>
            <Menu colorScheme="purple">
                <MenuButton aria-label="Options">{t('change_language')}</MenuButton>
                <MenuList className="text-black">
                    <MenuItem>
                        <Link href={pathname} className="text-black" locale="en">
                            English
                        </Link>
                    </MenuItem>

                    <MenuItem>
                        <Link href={pathname} className="text-black" locale="lv">
                            Latvian
                        </Link>
                    </MenuItem>

                    <MenuItem>
                        <Link href={pathname} className="text-black" locale="ru">
                            Russian
                        </Link>
                    </MenuItem>
                </MenuList>
            </Menu>
        </div>
    );
};

export default LanguageSwitcher;
