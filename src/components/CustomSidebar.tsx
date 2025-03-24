import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight, FileText, Home, LogOut, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
// import { useClerk } from '@clerk/nextjs';

function CustomSidebar() {
  // const { signOut } = useClerk();
  const router = useRouter()
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
  
  // const handleSignOut = async () => {
  //   // await signOut();
  //   router.push('/sign-in');
  // };
  
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded)
  }
  
  return (
    <div className="relative flex">
      <aside
        className={`bg-white dark:bg-gray-800 p-4 transition-all duration-300 ease-in-out ${
          isExpanded ? 'w-64' : 'w-16'
        } min-h-screen overflow-hidden`}
      >
        <div className="flex justify-end mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="p-0 h-8 w-8"
          >
            {isExpanded ?
              <ChevronLeft className="h-4 w-4" /> :
              <ChevronRight className="h-4 w-4" />
            }
          </Button>
        </div>
        
        <nav className="space-y-2">
          <Button
            onClick={() => router.push('/dashboard')}
            variant="ghost"
            className={`w-full justify-start ${!isExpanded && 'px-2'}`}
          >
            <Home className="h-4 w-4" />
            {showText && <span className={`ml-2 whitespace-nowrap transition-[visibility] duration-0 ${isExpanded ? 'visible' : 'invisible'}`}>Dashboard</span>}
          </Button>
          
          <Button
            onClick={() => router.push('/vendorlist')}
            variant="ghost"
            className={`w-full justify-start ${!isExpanded && 'px-2'}`}
          >
            <Users className="h-4 w-4" />
            {showText && <span className="ml-2">Minimal Vendors</span>}
          </Button>
          
          <Button
            onClick={() => router.push('/enhanced-vendorlist')}
            variant="ghost"
            className={`w-full justify-start ${!isExpanded && 'px-2'}`}
          >
            <FileText className="h-4 w-4" />
            {showText && <span className="ml-2">Detailed Vendors</span>}
          </Button>
        </nav>
      </aside>
    </div>
  )
}

export default CustomSidebar