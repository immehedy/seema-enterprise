"use client"

import { useEffect, useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Search, Filter, Grid, List, SlidersHorizontal, Eye, Heart, Phone } from "lucide-react"
import { contentfulClient } from "@/lib/contentful"

// ----------- TypeScript interface for a Machine ----------
interface Machine {
  name: string
  brand: string
  model: string
  category: string
  year: number
  condition: string
  price: number
  location: string
  features: string[]
  specifications: Record<string, any>
  isAvailable: boolean
  isFeatured: boolean
  images?: { url: string }[]
}

// ----------- Filters data ----------
const categories = [
  "All Categories",
  "Offset Printing Press",
  "Sheet-fed Press",
  "Die Cutting Machine",
  "Folding Machine",
  "Cutting Machine",
]
const brands = ["All Brands", "Heidelberg", "Komori", "Bobst", "Stahl", "Manroland", "Polar"]
const conditions = ["All Conditions", "Like New", "Excellent", "Very Good", "Good"]
const years = ["All Years", "2021", "2020", "2019", "2018", "2017"]

export default function StockPage() {
  const [machines, setMachines] = useState<Machine[]>([])
  const [loading, setLoading] = useState(true)

  // Filters state
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedBrand, setSelectedBrand] = useState("All Brands")
  const [selectedCondition, setSelectedCondition] = useState("All Conditions")
  const [selectedYear, setSelectedYear] = useState("All Years")
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })
  const [showAvailableOnly, setShowAvailableOnly] = useState(false)
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("name")

  // Fetch machines from Contentful
  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const entries = await contentfulClient.getEntries({
          content_type: "printingMachine",
        })

        const mapped = entries.items.map((entry: any) => {
          const fields = entry.fields
          return {
            ...fields,
            images: (fields.images || []).map((img: any) => ({
              url: img?.fields?.file?.url
                ? "https:" + img.fields.file.url
                : "/placeholder.jpg",
            })),
          }
        }) as Machine[]

        setMachines(mapped)
      } catch (error) {
        console.error("Error fetching machines from Contentful:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMachines()
  }, [])

  const filteredStock = useMemo(() => {
    const filtered = machines.filter((item) => {
      const matchesSearch =
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === "All Categories" || item.category === selectedCategory
      const matchesBrand = selectedBrand === "All Brands" || item.brand === selectedBrand
      const matchesCondition = selectedCondition === "All Conditions" || item.condition === selectedCondition
      const matchesYear = selectedYear === "All Years" || item.year?.toString() === selectedYear

      const matchesPriceMin = !priceRange.min || item.price >= Number.parseInt(priceRange.min)
      const matchesPriceMax = !priceRange.max || item.price <= Number.parseInt(priceRange.max)

      const matchesAvailable = !showAvailableOnly || item.isAvailable
      const matchesFeatured = !showFeaturedOnly || item.isFeatured

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesCondition &&
        matchesYear &&
        matchesPriceMin &&
        matchesPriceMax &&
        matchesAvailable &&
        matchesFeatured
      )
    })

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "year-new":
          return b.year - a.year
        case "year-old":
          return a.year - b.year
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [
    machines,
    searchTerm,
    selectedCategory,
    selectedBrand,
    selectedCondition,
    selectedYear,
    priceRange,
    showAvailableOnly,
    showFeaturedOnly,
    sortBy,
  ])

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("All Categories")
    setSelectedBrand("All Brands")
    setSelectedCondition("All Conditions")
    setSelectedYear("All Years")
    setPriceRange({ min: "", max: "" })
    setShowAvailableOnly(false)
    setShowFeaturedOnly(false)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p>Loading machines from Contentful...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">Stock Catalogue</h1>
        <p className="text-xl text-muted-foreground">
          Browse our extensive collection of printing and paper-converting machinery
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by machine name, brand, model, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filter Options</SheetTitle>
              </SheetHeader>
              <div className="space-y-6 mt-6">
                <FilterControls
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedBrand={selectedBrand}
                  setSelectedBrand={setSelectedBrand}
                  selectedCondition={selectedCondition}
                  setSelectedCondition={setSelectedCondition}
                  selectedYear={selectedYear}
                  setSelectedYear={setSelectedYear}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  showAvailableOnly={showAvailableOnly}
                  setShowAvailableOnly={setShowAvailableOnly}
                  showFeaturedOnly={showFeaturedOnly}
                  setShowFeaturedOnly={setShowFeaturedOnly}
                  clearFilters={clearFilters}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Filters */}
        <div className="hidden lg:block">
          <Card>
            <CardContent className="p-6">
              <FilterControls
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedBrand={selectedBrand}
                setSelectedBrand={setSelectedBrand}
                selectedCondition={selectedCondition}
                setSelectedCondition={setSelectedCondition}
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                showAvailableOnly={showAvailableOnly}
                setShowAvailableOnly={setShowAvailableOnly}
                showFeaturedOnly={showFeaturedOnly}
                setShowFeaturedOnly={setShowFeaturedOnly}
                clearFilters={clearFilters}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <p className="text-muted-foreground">
            Showing {filteredStock.length} of {machines.length} machines
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="price-low">Price (Low to High)</SelectItem>
              <SelectItem value="price-high">Price (High to Low)</SelectItem>
              <SelectItem value="year-new">Year (Newest First)</SelectItem>
              <SelectItem value="year-old">Year (Oldest First)</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      {filteredStock.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground mb-4">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No machines found</h3>
              <p>Try adjusting your search criteria or filters</p>
            </div>
            <Button onClick={clearFilters} variant="outline" className="bg-transparent">
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredStock.map((machine, idx) => (
            <MachineCard key={idx} machine={machine} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  )
}

// ------------- FilterControls -------------
function FilterControls({
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  selectedCondition,
  setSelectedCondition,
  selectedYear,
  setSelectedYear,
  priceRange,
  setPriceRange,
  showAvailableOnly,
  setShowAvailableOnly,
  showFeaturedOnly,
  setShowFeaturedOnly,
  clearFilters,
}: any) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Category</label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Brand</label>
          <Select value={selectedBrand} onValueChange={setSelectedBrand}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Condition</label>
          <Select value={selectedCondition} onValueChange={setSelectedCondition}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {conditions.map((condition) => (
                <SelectItem key={condition} value={condition}>
                  {condition}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Year</label>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Min Price (USD)</label>
          <Input
            type="number"
            placeholder="0"
            value={priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Max Price (USD)</label>
          <Input
            type="number"
            placeholder="1000000"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="available" checked={showAvailableOnly} onCheckedChange={setShowAvailableOnly} />
          <label htmlFor="available" className="text-sm font-medium">
            Available only
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="featured" checked={showFeaturedOnly} onCheckedChange={setShowFeaturedOnly} />
          <label htmlFor="featured" className="text-sm font-medium">
            Featured only
          </label>
        </div>
      </div>

      <Button onClick={clearFilters} variant="outline" className="w-full bg-transparent">
        <SlidersHorizontal className="h-4 w-4 mr-2" />
        Clear All Filters
      </Button>
    </div>
  )
}

// ------------- MachineCard -------------
function MachineCard({ machine, viewMode }: { machine: Machine; viewMode: "grid" | "list" }) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const imageUrl = machine.images?.[0]?.url || "/placeholder.jpg"

  if (viewMode === "list") {
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative w-full md:w-48 h-32 flex-shrink-0">
              <img
                src={imageUrl}
                alt={machine.name}
                className="w-full h-full object-cover rounded-lg"
              />
              {machine.isFeatured && (
                <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">Featured</Badge>
              )}
              {!machine.isAvailable && (
                <Badge variant="destructive" className="absolute top-2 right-2">
                  Sold
                </Badge>
              )}
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div>
                  <h3 className="text-xl font-semibold hover:text-accent transition-colors">
                    <Link href={`/stock/${machine.name}`}>{machine.name}</Link>
                  </h3>
                  <p className="text-muted-foreground">{machine.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-accent">{formatPrice(machine.price)}</p>
                  <p className="text-sm text-muted-foreground">{machine.location}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{machine.year}</Badge>
                <Badge variant="secondary">{machine.condition}</Badge>
                {machine.features.slice(0, 3).map((feature, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button size="sm" className="flex-1" asChild>
                  <Link href={`/stock/${machine.name}`}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Link>
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact
                </Button>
                <Button size="sm" variant="outline" className="bg-transparent">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Grid view
  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={imageUrl}
          alt={machine.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {machine.isFeatured && (
          <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">Featured</Badge>
        )}
        {!machine.isAvailable && (
          <Badge variant="destructive" className="absolute top-3 right-3">
            Sold
          </Badge>
        )}
        <Button
          size="sm"
          variant="secondary"
          className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight group-hover:text-accent transition-colors">
              <Link href={`/stock/${machine.name}`}>{machine.name}</Link>
            </CardTitle>
            <CardDescription className="text-sm">{machine.category}</CardDescription>
          </div>
          <div className="text-right">
            <Badge variant="outline" className="text-xs mb-1">
              {machine.year}
            </Badge>
            <Badge variant="secondary" className="text-xs block">
              {machine.condition}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-1">
            {machine.features.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-accent">{formatPrice(machine.price)}</span>
              <p className="text-xs text-muted-foreground">{machine.location}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" className="flex-1" asChild>
              <Link href={`/stock/${machine.name}`}>
                <Eye className="h-4 w-4 mr-1" />
                View
              </Link>
            </Button>
            <Button size="sm" variant="outline" className="flex-1 bg-transparent">
              <Phone className="h-4 w-4 mr-1" />
              Call
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
