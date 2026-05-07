import { cn } from '@/shared/lib/utils'
import React from 'react'
import { Container } from './container'
import Image from 'next/image'
import Link from 'next/link'
import { SearchInput } from './search-input'
import { Button } from '../ui'
import { User } from 'lucide-react'
import { CartButton } from './cart-button'

interface HeaderProps {
	hasSearch?: boolean
	hasCart?: boolean
	className?: string
}

export const Header: React.FC<HeaderProps> = ({
	className,
	hasCart = true,
	hasSearch = true,
}) => {
	return (
		<header className={cn('border-b', className)}>
			<Container className="flex items-center justify-between py-8">
				<Link href="/">
					<div className="flex items-center gap-4">
						<Image src="/logo.png" alt="Logo" width={35} height={35}></Image>
						<div>
							<h1 className="font-block text-2xl uppercase">Next Pizza</h1>
							<p className="text-sm leading-3 text-gray-400">
								Вкусней уже некуда
							</p>
						</div>
					</div>
				</Link>
				{hasSearch && (
					<div className="mx-10 flex-1">
						<SearchInput />
					</div>
				)}

				<div className="flex items-center gap-3">
					<Button variant="outline" className="gap-3. flex items-center">
						<User size="16" />
						Войти
					</Button>

					{hasCart && <CartButton />}
				</div>
			</Container>
		</header>
	)
}
