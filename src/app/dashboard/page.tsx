'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
import { AlertTriangle, Search, Users } from 'lucide-react'
import CustomSidebar from '@/components/CustomSidebar';
import { TrendingUp, TrendingDown } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
// Define Vendor interface to match backend structure
interface Vendor {
  id: string;
  name: string;
  type: string;
  criticality: "Low" | "Medium" | "High" | "Critical";
  status: "Active" | "Inactive" | "Under Review" | "Pending";
  contact: string;
  serviceProvided: string
}

const calculatePercentageChange = (currentValue: number, previousValue: number): number => {
  if (previousValue === 0) return 0;
  return ((currentValue - previousValue) / previousValue) * 100;
};

// Component to display percentage change with dynamic styling
const PercentageChangeIndicator = ({
  currentValue,
  previousValue
}: {
  currentValue: number,
  previousValue: number
}) => {
  const percentageChange = calculatePercentageChange(currentValue, previousValue);
  const isPositive = percentageChange >= 0;

  return (
    <div className="flex items-center">
      {isPositive ? (
        <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
      ) : (
        <TrendingDown className="h-4 w-4 mr-1 text-red-500" />
      )}
      <span className={`text-xs font-semibold ${isPositive
          ? 'text-green-600 dark:text-green-400'
          : 'text-red-600 dark:text-red-400'
        }`}>
        {Math.abs(percentageChange).toFixed(1)}%
        {isPositive ? ' ▲' : ' ▼'}
      </span>
    </div>
  );
};

export default function EnhancedVendorDashboard() {
  // const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedVendorCategory, setSelectedVendorCategory] = useState<'total' | 'active' | 'critical' | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Function to update historical data

  // Prepare chart data
  const uniqueVendorTypes = [...new Set(vendors.map(v => v.type))];
  const vendorTypeData = uniqueVendorTypes.map(type => ({
    name: type,
    value: vendors.filter(v => v.type === type).length
  }));

  const criticalityData = [
    { name: 'Low', value: vendors.filter(v => v.criticality === 'Low').length },
    { name: 'Medium', value: vendors.filter(v => v.criticality === 'Medium').length },
    { name: 'High', value: vendors.filter(v => v.criticality === 'High').length },
    { name: 'Critical', value: vendors.filter(v => v.criticality === 'Critical').length },
  ]

  const openVendorModal = (category: 'total' | 'active' | 'critical') => {
    setSelectedVendorCategory(category)
    setIsModalOpen(true)
  }

  // Filter vendors based on selected category
  const getFilteredVendorsForModal = () => {
    switch (selectedVendorCategory) {
      case 'total':
        return vendors
      case 'active':
        return vendors.filter(v => v.status === 'Active')
      case 'critical':
        return vendors.filter(v => v.criticality === 'Critical')
      default:
        return []
    }
  }


  // const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
  // Dynamic color generation
  const generateColors = (count: number) => {
    const baseColors = [
      '#0088FE', // Blue
      '#00C49F', // Teal
      '#FFBB28', // Yellow
      '#FF8042', // Orange
      '#8884D8', // Purple
      '#82CA9D', // Green
      '#FF6384', // Pink
      '#36A2EB', // Light Blue
      '#FFCE56', // Gold
      '#4BC0C0'  // Turquoise
    ];

    // If more colors are needed than base colors, generate additional colors
    if (count > baseColors.length) {
      const additionalColors = Array.from({ length: count - baseColors.length }, () =>
        `#${Math.floor(Math.random() * 16777215).toString(16)}`
      );
      return [...baseColors, ...additionalColors];
    }

    return baseColors.slice(0, count);
  };

  // Generate colors based on unique vendor types
  const COLORS = generateColors(uniqueVendorTypes.length);

  // Fetch vendors from backend
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setIsLoading(true)
        // Replace with your actual backend endpoint
        const response = await axios.get('https://cybernx.onrender.com/vendors')

        // Log the entire response to understand its structure
        console.log("Full response:", response.data)

        // Determine the correct way to extract vendors
        const vendorsData = Array.isArray(response.data)
          ? response.data
          : response.data.vendors || response.data.data || []

        console.log("Extracted vendors:", vendorsData)
        console.log("Vendors type:", typeof vendorsData)
        console.log("Is Array:", Array.isArray(vendorsData))

        setVendors(vendorsData)
        setError(null)
      } catch (err) {
        setError('Failed to fetch vendors. Please try again later.')
        console.error('Vendor fetch error:', err)
        setVendors([]) // Ensure vendors is an empty array on error
      } finally {
        setIsLoading(false)
      }
    }

    fetchVendors()
  }, [])

  // const toggleTheme = () => {
  //   setIsDarkTheme(!isDarkTheme)
  // }

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.contact.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getCriticalityColor = (criticality: string) => {
    switch (criticality.toLowerCase()) {
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
      case 'under review':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  // Toggle sidebar function
  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen)
  // }

  // Loading and error states
  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full min-h-screen overflow-x-hidden">
        <div className="text-center">
          <div role="status">
            <svg aria-hidden="true" className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4119 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7987 32.2913 88.1235 35.8758C89.0207 38.2158 91.5126 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading vendors...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-50 dark:bg-red-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-300 mb-4">Error</h2>
          <p className="text-red-500 dark:text-red-200">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen`}>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <div className="flex relative">
          {/* Sidebar */}
          {/* <CustomSidebar/> */}
          <div>
            <CustomSidebar />
          </div>

          {/* Main content */}
          <main className={`  flex-1 p-4 sm:p-8 
  transition-all duration-300
              ? 'md:ml-64 w-[calc(100%-16rem)]'  // When sidebar is open
              : 'md:ml-0 w-full'}  // When sidebar is closed
  overflow-x-hidden`}>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Vendor Dashboard</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Welcome, User</p>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-blue-50 dark:bg-blue-900 cursor-pointer"
                onClick={() => openVendorModal('total')}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-blue-800 dark:text-blue-100">
                    Total Vendors
                  </CardTitle>
                  <Users className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline justify-between">
                    <div className="text-2xl font-bold text-blue-900 dark:text-blue-50">
                      {vendors.length}
                    </div>
                    <PercentageChangeIndicator
                      currentValue={vendors.length}
                      previousValue={Math.max(0, vendors.length - 5)} // Simple previous period calculation
                    />
                  </div>
                </CardContent>
              </Card>
              {/* Active Vendors Card */}
              <Card className="bg-green-50 dark:bg-green-900 cursor-pointer" onClick={() => openVendorModal('active')}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-green-800 dark:text-green-100">
                    Active Vendors
                  </CardTitle>
                  <Users className="h-4 w-4 text-green-600 dark:text-green-300" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline justify-between">
                    <div className="text-2xl font-bold text-green-900 dark:text-green-50">
                      {vendors.filter(v => v.status === 'Active').length}
                    </div>
                    <PercentageChangeIndicator
                      currentValue={vendors.filter(v => v.status === 'Active').length}
                      previousValue={Math.max(0, vendors.filter(v => v.status === 'Active').length - 3)} // Simple previous period calculation
                    />
                  </div>
                </CardContent>
              </Card>
              {/* Critical Vendors Card */}
              <Card className="bg-red-50 dark:bg-red-900 cursor-pointer" onClick={() => openVendorModal('critical')}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-red-800 dark:text-red-100">
                    Critical Vendors
                  </CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-300" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline justify-between">
                    <div className="text-2xl font-bold text-red-900 dark:text-red-50">
                      {vendors.filter(v => v.criticality === 'Critical').length}
                    </div>
                    <PercentageChangeIndicator
                      currentValue={vendors.filter(v => v.criticality === 'Critical').length}
                      previousValue={Math.max(0, vendors.filter(v => v.criticality === 'Critical').length - 1)} // Simple previous period calculation
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="w-full transition-all duration-300 ease-in-out">
      <CardHeader>
        <CardTitle>Vendor Types</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] w-full transition-all duration-300 ease-in-out">
        <ChartContainer 
          config={{}} 
          className="h-full w-full transition-all duration-300 ease-in-out"
        >
          <ResponsiveContainer 
            width="100%" 
            height="100%" 
            className="transition-all duration-300 ease-in-out"
          >
            <PieChart className="transition-all duration-300 ease-in-out">
              <Pie
                data={vendorTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius="80%"
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => 
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                className="transition-all duration-300 ease-in-out"
              >
                {vendorTypeData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    className="transition-all duration-300 ease-in-out"
                  />
                ))}
              </Pie>
              <Tooltip 
                content={<ChartTooltipContent />} 
                cursor={{ fill: 'transparent' }}
              />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center"
                wrapperStyle={{ 
                  paddingTop: '10px',
                  maxWidth: '100%',
                  overflowX: 'auto',
                  transition: 'all 300ms ease-in-out'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Vendor Criticality</CardTitle>
                </CardHeader>
                {/* <CardContent>
                  <ChartContainer config={{}} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={criticalityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent> */}
                <CardContent className="w-full">
                  <ChartContainer config={{}} className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={criticalityData}
                        margin={{ left: 10, right: 10, top: 10, bottom: 10 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis axisLine={false} tickLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar
                          dataKey="value"
                          fill="#8884d8"
                          radius={[4, 4, 0, 0]}  // Optional: rounded top corners
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Vendor Table */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Vendors</CardTitle>
                <CardDescription>A list of recent vendors added to your account.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Label htmlFor="search" className="text-gray-700 dark:text-gray-300">Search Vendors</Label>
                  <div className="flex mt-1">
                    <Input
                      id="search"
                      type="text"
                      placeholder="Search by name, type, or service"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-grow bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                    <Button className="ml-2 bg-blue-700 hover:bg-blue-800 text-white cursor-pointer">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-gray-700 dark:text-gray-300">Name</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300">Type</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300">Criticality</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300">Contact</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300">Service Provided</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredVendors.slice(0, 5).map((vendor) => (
                        <TableRow key={vendor.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                            {vendor.name}
                          </TableCell>
                          <TableCell className="text-gray-700 dark:text-gray-300">{vendor.type}</TableCell>
                          <TableCell>
                            <Badge className={`${getCriticalityColor(vendor.criticality)}`}>
                              {vendor.criticality}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${getStatusColor(vendor.status)}`}>
                              {vendor.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-700 dark:text-gray-300">
                            {vendor.contact}
                          </TableCell>
                          <TableCell className="text-gray-700 dark:text-gray-300">
                            {vendor.serviceProvided}
                          </TableCell>
                        </TableRow>
                      ))}

                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>
                {selectedVendorCategory === 'total' && 'All Vendors'}
                {selectedVendorCategory === 'active' && 'Active Vendors'}
                {selectedVendorCategory === 'critical' && 'Critical Vendors'}
              </DialogTitle>
              <DialogDescription>
                Detailed view of {
                  selectedVendorCategory === 'total' ? 'all vendors' :
                    selectedVendorCategory === 'active' ? 'active vendors' :
                      'critical vendors'
                } in your system.
              </DialogDescription>
            </DialogHeader>

            {/* Detailed Vendor Table */}
            <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Criticality</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Service</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getFilteredVendorsForModal().map((vendor) => (
                    <TableRow key={vendor.id}>
                      <TableCell className="font-medium">{vendor.name}</TableCell>
                      <TableCell>{vendor.type}</TableCell>
                      <TableCell>
                        <Badge className={getCriticalityColor(vendor.criticality)}>
                          {vendor.criticality}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(vendor.status)}>
                          {vendor.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{vendor.contact}</TableCell>
                      <TableCell>{vendor.serviceProvided}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}