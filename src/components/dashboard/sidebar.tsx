'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  Wheat, 
  Search, 
  BarChart3, 
  Settings, 
  User,
  LogOut,
  Leaf
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
// import { logout } from '@/lib/store/slices/authSlice'
// import { useRouter } from 'next/navigation'
import { getuserInfo } from '@/services/authServices'

const farmerNavItems = [
  {
    title: 'Dashboard',
    href: '/dashboard/farmer',
    icon: LayoutDashboard,
  },
  {
    title: 'My Fields',
    href: '/dashboard/farmer/fields',
    icon: Wheat,
  },
  {
    title: 'Detections',
    href: '/dashboard/farmer/detections',
    icon: Search,
  },
  {
    title: 'Analytics',
    href: '/dashboard/farmer/analytics',
    icon: BarChart3,
  },
  {
    title: 'Profile',
    href: '/dashboard/farmer/profile',
    icon: User,
  },
  {
    title: 'Settings',
    href: '/dashboard/farmer/settings',
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const user = getuserInfo();

//   const dispatch = useAppDispatch()
//   const router = useRouter()
//   const { user } = useAppSelector((state) => state.auth)

//   const handleLogout = () => {
//     dispatch(logout())
//     router.push('/auth/login')
//   }

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard/farmer" className="flex items-center space-x-2">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">CropCare</span>
        </Link>
      </div>

      {/* User Info */}
      <div className="border-b p-4">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={user?.profileImage} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user?.name?.charAt(0) || 'F'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium">{user?.name || 'Farmer'}</p>
            <p className="truncate text-xs text-muted-foreground">
              {user?.email || 'farmer@example.com'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {farmerNavItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start',
                  isActive && 'bg-primary/10 text-primary hover:bg-primary/20'
                )}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.title}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="border-t p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
        //   onClick={handleLogout}
        >
          <LogOut className="mr-3 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}