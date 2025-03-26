import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight, FileText, Home, Users } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'

function CustomSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(true)
  const [showText, setShowText] = useState(true)

  // Handle text visibility during transitions
  useEffect(() => {
    if (isExpanded) {
      // Small delay before showing text to ensure sidebar expands first
      const timer = setTimeout(() => {
        setShowText(true)
      }, 200)
      return () => clearTimeout(timer)
    } else {
      // Hide text immediately when collapsing
      setShowText(false)
    }
  }, [isExpanded])

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded)
  }

  // Function to determine if a route is active
  const isActiveRoute = (route: string) => pathname === route

  return (
    <div className="relative flex">
      <aside
        className={`bg-gray-100 dark:bg-gray-800 p-4 transition-all duration-300 ease-in-out ${
          isExpanded ? 'w-64' : 'w-16'
        } min-h-screen overflow-hidden`}
      >
        {/* Sidebar Title */}
        <div className={`mb-6 flex items-center ${!isExpanded ? 'justify-center' : 'justify-between'}`}>
          {isExpanded && (
            <div className="flex items-center">
              <span className="text-lg font-semibold text-gray-800 dark:text-gray-200 truncate">
                Vendor Section
              </span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="p-0 h-8 w-8"
          >
            {isExpanded ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>

        <nav className="space-y-2">
          <Button
            onClick={() => router.push('/dashboard')}
            variant="ghost"
            className={`w-full cursor-pointer justify-start 
              ${!isExpanded && 'px-2'}
              ${isActiveRoute('/dashboard') 
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800' 
                : ''
              }
            `}
          >
            <Home className={`h-4 w-4 ${isActiveRoute('/dashboard') ? 'text-blue-600 dark:text-blue-400' : ''}`} />
            {showText && (
              <span
                className={`ml-2 whitespace-nowrap transition-[visibility] duration-0 ${
                  isExpanded ? 'visible' : 'invisible'
                }`}
              >
                Dashboard
              </span>
            )}
          </Button>

          <Button
            onClick={() => router.push('/vendorlist')}
            variant="ghost"
            className={`w-full cursor-pointer justify-start 
              ${!isExpanded && 'px-2'}
              ${isActiveRoute('/vendorlist') 
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800' 
                : ''
              }
            `}
          >
            <Users className={`h-4 w-4 ${isActiveRoute('/vendorlist') ? 'text-blue-600 dark:text-blue-400' : ''}`} />
            {showText && <span className="ml-2">Minimal Vendors</span>}
          </Button>

          <Button
            onClick={() => router.push('/enhanced-vendorlist')}
            variant="ghost"
            className={`w-full cursor-pointer justify-start 
              ${!isExpanded && 'px-2'}
              ${isActiveRoute('/enhanced-vendorlist') 
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800' 
                : ''
              }
            `}
          >
            <FileText className={`h-4 w-4 ${isActiveRoute('/enhanced-vendorlist') ? 'text-blue-600 dark:text-blue-400' : ''}`} />
            {showText && <span className="ml-2">Detailed Vendors</span>}
          </Button>
        </nav>
      </aside>
    </div>
  )
}

export default CustomSidebar