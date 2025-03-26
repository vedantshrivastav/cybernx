'use client'

import { useState,useRef, useEffect, MutableRefObject, RefObject } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Moon, Sun, Search, X } from 'lucide-react'
import CustomSidebar from '@/components/CustomSidebar'
import axios from 'axios';
import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogClose 
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock data for vendors
const initialVendors = [
  { id: "1", name: "Acme Corp", type: "Supplier", criticality: "High", status: "Active", contact: "john@acme.com" },
  { id: "2", name: "TechPro Solutions", type: "Service Provider", criticality: "Medium", status: "Active", contact: "sarah@techpro.com" },
  { id: "3", name: "Global Logistics", type: "Logistics", criticality: "Critical", status: "Under Review", contact: "mike@globallogistics.com" },
  { id: "4", name: "Eco Friendly Materials", type: "Supplier", criticality: "Low", status: "Inactive", contact: "lisa@ecofriendly.com" },
  { id: "5", name: "Innovative Software Inc", type: "Technology", criticality: "High", status: "Active", contact: "david@innovative.com" },
];

export default function VendorListView() {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [vendors, setVendors] = useState(initialVendors)
  const [isFormOpen, setIsFormOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    criticality: "",
    status: "Active",
    contact: ""
  })

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setIsLoading(true)
        // Replace with your actual backend endpoint
        const response = await axios.get('http://localhost:5000/vendors')
        
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


  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme)
  }

  const openForm = () => {
    setFormData({
      name: "",
      type: "",
      criticality: "",
      status: "Active",
      contact: ""
    })
    setIsFormOpen(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }


  

  const createVendor = async () => {
    const uniqueId = uuidv4();

    // Create new vendor object
    const newVendor = {
        id: uniqueId, // Ensure ID is included
        ...formData
    };

    const API_URL = "http://localhost:5000/vendors";

    try {
        const response = await axios.post(API_URL, newVendor, { // Send `newVendor` instead of `formData`
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log("Success:", response.data);

        // Update the vendors list
        setVendors([...vendors, newVendor]);

        // Close the form
        setIsFormOpen(false);
    } catch (error) {
        console.error("Error:", error);
    }
};

     
    
  
  

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
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
      case 'under review':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
    }
  }

  const validateForm = () => {
    return formData.name && formData.type && formData.criticality && formData.status && formData.contact
  }


  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading vendors...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className={isDarkTheme ? 'dark' : ''}>
      <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        {/* Sidebar */}
        <div>
        <CustomSidebar />
      </div>
        
        {/* Main Content Area with Header */}
        <div className="w-full flex flex-col">
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 shadow-md z-5 wl-full rounded-lg ml-6 mt-4 mr-6 flex justify-center items-center">
             <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Vendor Management</h1>
          </div>
          
          {/* Page Content */}
          <div className="p-8">
            <Card className="w-full bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between border-b dark:border-gray-700">
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">Vendor List</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="relative w-64">
                    <Input
                      type="text"
                      placeholder="Search vendors..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border rounded-md w-full dark:bg-gray-700 dark:text-gray-100"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  <Button 
                    className="bg-blue-700 hover:bg-blue-800 text-white"
                    onClick={openForm}
                  >
                    Add New Vendor
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-left dark:text-gray-300">Name</TableHead>
                      <TableHead className="text-left dark:text-gray-300">Type</TableHead>
                      <TableHead className="text-left dark:text-gray-300">Criticality</TableHead>
                      <TableHead className="text-left dark:text-gray-300">Status</TableHead>
                      <TableHead className="text-left dark:text-gray-300">Contact</TableHead>
                    </TableRow>
                  </TableHeader>
                  {/* <TableBody>
                    {filteredVendors.map((vendor) => (
                      <TableRow key={vendor.name} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <TableCell className="font-medium dark:text-gray-300">{vendor.name}</TableCell>
                        <TableCell className="dark:text-gray-300">{vendor.type}</TableCell>
                        <TableCell>
                          <Badge className={`font-semibold ${getCriticalityColor(vendor.criticality)}`}>
                            {vendor.criticality}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={`font-semibold ${getStatusColor(vendor.status)}`}>
                            {vendor.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="dark:text-gray-300">{vendor.contact}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody> */}
                  <TableBody>
          {filteredVendors.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center dark:text-gray-300">
                No vendors found
              </TableCell>
            </TableRow>
          ) : (
            filteredVendors.map((vendor) => (
              <TableRow key={vendor.id || vendor.name} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <TableCell className="font-medium dark:text-gray-300">{vendor.name}</TableCell>
                <TableCell className="dark:text-gray-300">{vendor.type}</TableCell>
                <TableCell>
                  <Badge className={`font-semibold ${getCriticalityColor(vendor.criticality)}`}>
                    {vendor.criticality}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={`font-semibold ${getStatusColor(vendor.status)}`}>
                    {vendor.status}
                  </Badge>
                </TableCell>
                <TableCell className="dark:text-gray-300">{vendor.contact}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  
      {/* Add Vendor Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-md dark:bg-gray-800 dark:text-gray-100">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold dark:text-gray-100">Add New Vendor</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right dark:text-gray-300">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="col-span-3 dark:bg-gray-700 dark:text-gray-100"
                placeholder="Enter vendor name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
  <Label htmlFor="type" className="text-right dark:text-gray-300">
    Type
  </Label>
  <Input
    id="type"
    placeholder="Enter vendor type"
    value={formData.type}
    onChange={(e) => handleSelectChange("type", e.target.value)}
    className="col-span-3 dark:bg-gray-700 dark:text-gray-100"
  />
</div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="criticality" className="text-right dark:text-gray-300">
                Criticality
              </Label>
              <Select 
                onValueChange={(value) => handleSelectChange("criticality", value)} 
                value={formData.criticality}
              >
                <SelectTrigger className="col-span-3 dark:bg-gray-700 dark:text-gray-100">
                  <SelectValue placeholder="Select criticality" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:text-gray-100">
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right dark:text-gray-300">
                Status
              </Label>
              <Select 
                onValueChange={(value) => handleSelectChange("status", value)} 
                value={formData.status}
              >
                <SelectTrigger className="col-span-3 dark:bg-gray-700 dark:text-gray-100">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:text-gray-100">
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contact" className="text-right dark:text-gray-300">
                Contact
              </Label>
              <Input
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className="col-span-3 dark:bg-gray-700 dark:text-gray-100"
                placeholder="Enter contact email"
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <DialogClose asChild>
              <Button variant="outline" className="dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600">
                Cancel
              </Button>
            </DialogClose>
            <Button 
              type="submit" 
              className="bg-blue-700 hover:bg-blue-800 text-white" 
              onClick={createVendor}
              disabled={!validateForm()}
            >
              Create Vendor
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}