'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Moon, Sun, Search, Info } from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import CustomSidebar from '@/components/CustomSidebar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Mock data for demonstration
const vendors = [
  { id: 1, name: "Acme Corp", type: "Supplier", criticality: "High", status: "Active", contact: "john@acme.com", serviceProvided: "Raw Materials" },
  { id: 2, name: "TechPro Solutions", type: "Service Provider", criticality: "Medium", status: "Active", contact: "sarah@techpro.com", serviceProvided: "IT Support" },
  { id: 3, name: "Global Logistics", type: "Logistics", criticality: "Critical", status: "Active", contact: "mike@globallogistics.com", serviceProvided: "Shipping" },
  { id: 4, name: "EcoPackage", type: "Supplier", criticality: "Low", status: "Inactive", contact: "lisa@ecopackage.com", serviceProvided: "Packaging Materials" },
  { id: 5, name: "SecureNet", type: "Service Provider", criticality: "High", status: "Pending", contact: "alex@securenet.com", serviceProvided: "Cybersecurity" },
]

export default function EnhancedVendorListView() {
  type Vendor = {
    id: number;
    name: string;
    type: string;
    criticality: string;
    status: string;
    contact: string;
    serviceProvided: string;
  };
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  // const toggleTheme = () => {
  //   setIsDarkTheme(!isDarkTheme)
  // }

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.serviceProvided.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className={`min-h-screen flex ${isDarkTheme ? 'dark' : ''}`}>
      {/* Sidebar */}
        <CustomSidebar />

      {/* Main Content */}
      <div className="flex-1 min-h-screen p-8 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <Card className="w-full bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between border-b dark:border-gray-700">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">Vendor List</CardTitle>
            {/* <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Switch checked={isDarkTheme} onCheckedChange={toggleTheme} />
              <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div> */}
          </CardHeader>
          <CardContent className="p-6">
            {/* Search */}
            <div className="mb-6">
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

            {/* Table */}
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
                        <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                          {vendor.criticality}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          {vendor.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-700 dark:text-gray-300">{vendor.contact}</TableCell>
                      <TableCell className="text-gray-700 dark:text-gray-300">{vendor.serviceProvided}</TableCell>
                      <TableCell>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                            <Dialog>
  <DialogTrigger asChild>
    <Button
      variant="outline"
      size="sm"
      className="bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800"
      onClick={() => setSelectedVendor(vendor)}
    >
      <Info className="h-4 w-4 mr-1" />
      Details
    </Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Vendor Details</DialogTitle>
    </DialogHeader>
    {selectedVendor && (
      <div>
        <p><strong>Name:</strong> {selectedVendor.name}</p>
        <p><strong>Type:</strong> {selectedVendor.type}</p>
        <p><strong>Criticality:</strong> {selectedVendor.criticality}</p>
        <p><strong>Status:</strong> {selectedVendor.status}</p>
        <p><strong>Contact:</strong> {selectedVendor.contact}</p>
        <p><strong>Service Provided:</strong> {selectedVendor.serviceProvided}</p>
      </div>
    )}
  </DialogContent>
</Dialog>

                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Open vendor details</p>
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
      </div>
    </div>
  )
}
