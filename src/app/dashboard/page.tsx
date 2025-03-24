'use client'

import { useState } from 'react'
import { useUser, useClerk } from "@clerk/nextjs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Moon, Sun, Search, Home, Users, FileText, Settings, LogOut, Info, Sidebar } from 'lucide-react'
import { useRouter } from 'next/navigation'
import CustomSidebar from '@/components/CustomSidebar';

// Mock data for demonstration
const vendors = [
  { id: 1, name: "Acme Corp", type: "Supplier", criticality: "High", status: "Active", contact: "john@acme.com", serviceProvided: "Raw Materials" },
  { id: 2, name: "TechPro Solutions", type: "Service Provider", criticality: "Medium", status: "Active", contact: "sarah@techpro.com", serviceProvided: "IT Support" },
  { id: 3, name: "Global Logistics", type: "Logistics", criticality: "Critical", status: "Active", contact: "mike@globallogistics.com", serviceProvided: "Shipping" },
  { id: 4, name: "EcoPackage", type: "Supplier", criticality: "Low", status: "Inactive", contact: "lisa@ecopackage.com", serviceProvided: "Packaging Materials" },
  { id: 5, name: "SecureNet", type: "Service Provider", criticality: "High", status: "Pending", contact: "alex@securenet.com", serviceProvided: "Cybersecurity" },
]

const vendorTypeData = [
  { name: 'Supplier', value: 2 },
  { name: 'Service Provider', value: 2 },
  { name: 'Logistics', value: 1 },
]

const criticalityData = [
  { name: 'Low', value: 1 },
  { name: 'Medium', value: 1 },
  { name: 'High', value: 2 },
  { name: 'Critical', value: 1 },
]

const statusData = [
  { name: 'Active', value: 3 },
  { name: 'Inactive', value: 1 },
  { name: 'Pending', value: 1 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function EnhancedVendorDashboard() {
  // const { user } = useUser();
  // const { signOut } = useClerk();
  const router = useRouter();
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')


  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme)
  }

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.serviceProvided.toLowerCase().includes(searchTerm.toLowerCase())
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
      case 'pending':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'dark' : ''}`}>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <div className="flex">
          {/* Sidebar */}
          <CustomSidebar/>

          {/* Main content */}
          <main className="flex-1 p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Vendor Dashboard</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Welcome, User</p>
              </div>
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Switch checked={isDarkTheme} onCheckedChange={toggleTheme} />
                <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-blue-50 dark:bg-blue-900">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-blue-800 dark:text-blue-100">Total Vendors</CardTitle>
                  <Users className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-900 dark:text-blue-50">{vendors.length}</div>
                </CardContent>
              </Card>
              <Card className="bg-green-50 dark:bg-green-900">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-green-800 dark:text-green-100">Active Vendors</CardTitle>
                  <Users className="h-4 w-4 text-green-600 dark:text-green-300" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-900 dark:text-green-50">{vendors.filter(v => v.status === 'Active').length}</div>
                </CardContent>
              </Card>
              <Card className="bg-red-50 dark:bg-red-900">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-red-800 dark:text-red-100">Critical Vendors</CardTitle>
                  <Users className="h-4 w-4 text-red-600 dark:text-red-300" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-900 dark:text-red-50">{vendors.filter(v => v.criticality === 'Critical').length}</div>
                </CardContent>
              </Card>
              <Card className="bg-yellow-50 dark:bg-yellow-900">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-yellow-800 dark:text-yellow-100">Pending Vendors</CardTitle>
                  <Users className="h-4 w-4 text-yellow-600 dark:text-yellow-300" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-900 dark:text-yellow-50">{vendors.filter(v => v.status === 'Pending').length}</div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Vendor Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{}} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={vendorTypeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {vendorTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
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
                    <Button className="ml-2 bg-blue-700 hover:bg-blue-800 text-white">
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
                        <TableHead className="text-gray-700 dark:text-gray-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredVendors.map((vendor) => (
                        <TableRow key={vendor.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <TableCell className="font-medium text-gray-900 dark:text-gray-100">{vendor.name}</TableCell>
                          <TableCell className="text-gray-700 dark:text-gray-300">{vendor.type}</TableCell>
                          <TableCell>
                            <Badge  className={`${getCriticalityColor(vendor.criticality)}`}>
                              {vendor.criticality}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${getStatusColor(vendor.status)}`}>
                              {vendor.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-700 dark:text-gray-300">{vendor.contact}</TableCell>
                          <TableCell className="text-gray-700 dark:text-gray-300">{vendor.serviceProvided}</TableCell>
                          <TableCell>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800"
                                    onClick={() => console.log(`Open details for ${vendor.name}`)}
                                  >
                                    <Info className="h-4 w-4 mr-1" />
                                    Details
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>View vendor details</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
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
      </div>
    </div>
  )
}