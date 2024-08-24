'use client';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link, usePathname } from '../navigations';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button,
    IconButton,
} from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
const LanguageSwitcher = ({ locale }: { locale: string }) => {
    const pathname = usePathname();
    const t = useTranslations('All');
    const handleChange = (locale: string) => {
        // router.push(router.pathname, router.asPath, { locale });
    };

    return (
        <div>
            <Menu colorScheme="purple">
                <MenuButton aria-label="Options">{t('Change language')}</MenuButton>
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
