'use client'

import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Search, Info } from 'lucide-react'
import CustomSidebar from '@/components/CustomSidebar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import axios from 'axios'

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

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get('https://cybernx.onrender.com/vendors')
        
        const vendorsData = Array.isArray(response.data) 
          ? response.data 
          : response.data.vendors || response.data.data || []
        
        setVendors(vendorsData)
        setError(null)
      } catch (err) {
        setError('Failed to fetch vendors. Please try again later.')
        console.error('Vendor fetch error:', err)
        setVendors([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchVendors()
  }, [])

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.serviceProvided.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className={`min-h-screen flex`}>
      <CustomSidebar />

      <div className="flex-1 min-h-screen p-8 bg-gray-100 dark:bg-gray-900 transition-colors duration-300 w-screen">
        <Card className="w-full bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between border-b dark:border-gray-700">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">Vendor List</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
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

            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-4">
                <p className="text-gray-600 dark:text-gray-300">Loading vendors...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-red-500 text-center py-4">
                {error}
              </div>
            )}

            {/* Empty State */}
            {!isLoading && vendors.length === 0 && (
              <div className="text-center py-4">
                <p className="text-gray-600 dark:text-gray-300">No vendors found.</p>
              </div>
            )}

            {/* Table Rendering */}
            {!isLoading && vendors.length > 0 && (
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
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}