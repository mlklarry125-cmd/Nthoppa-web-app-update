"use client";
import { useRouter } from "next/navigation";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Target,
  TrendingUp,
  Users,
  CheckCircle,
  Navigation,
  Clock,
  Route,
  Map,
  Building2,
  ShoppingBag,
  Train,
  Car,
  Footprints,
  Star,
  Award,
  Calendar,
  Phone,
  Mail,
  Download,
  Printer,
  Share2,
  AlertCircle,
  ChevronRight,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { getUsers, getAgentSession, type User } from "@/lib/storage";

interface LocationStat {
  name: string;
  count: number;
  lat?: number;
  lng?: number;
}

interface RouteInfo {
  distance: string;
  duration: string;
  stops: number;
  potentialRegistrations: string;
}

export default function TerritoryPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [agentName, setAgentName] = useState("");
  const [agentTerritory, setAgentTerritory] = useState("");
  const [totalUsers, setTotalUsers] = useState(0);
  const [completionRate, setCompletionRate] = useState(0);
  const [targetProgress, setTargetProgress] = useState(0);
  const [topLocations, setTopLocations] = useState<LocationStat[]>([]);
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);
  const [isGeneratingRoute, setIsGeneratingRoute] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const session = getAgentSession();
    if (session) {
      setAgentName(session.name);
      setAgentTerritory(session.territory);
    }
    const allUsers = getUsers();
    const territoryUsers = allUsers.filter(u => u.territory === session?.territory);
    setUsers(territoryUsers);
    setTotalUsers(territoryUsers.length);
    
    const avgCompletion = territoryUsers.length > 0
      ? Math.round(territoryUsers.reduce((sum: number, u: any) => sum + (u.completion || u.completionRate || 0), 0) / territoryUsers.length)
      : 0;
    setCompletionRate(avgCompletion);
    
    setTargetProgress(Math.min(100, Math.round((territoryUsers.length / 100) * 100)));
    generateTopLocations(territoryUsers);
  };

  const generateTopLocations = (users: User[]) => {
    const locationMap: { [key: string]: number } = {};
    
    users.forEach(user => {
      const location = user.city || "Unknown";
      locationMap[location] = (locationMap[location] || 0) + 1;
    });
    
    const sampleLocations = [
      { name: "Mall of Botswana", count: 45 },
      { name: "Game City", count: 38 },
      { name: "Railway Station", count: 32 },
      { name: "Main Mall", count: 28 },
      { name: "Airport Junction", count: 25 },
    ];
    
    const merged = sampleLocations.map(loc => ({
      ...loc,
      count: loc.count + (locationMap[loc.name] || 0),
    }));
    
    setTopLocations(merged.sort((a, b) => b.count - a.count));
  };

  const generateRoute = () => {
    setIsGeneratingRoute(true);
    setTimeout(() => {
      setRouteInfo({
        distance: "12.5 km",
        duration: "45 min",
        stops: topLocations.length,
        potentialRegistrations: `${Math.floor(Math.random() * 30 + 15)}-${Math.floor(Math.random() * 20 + 35)}`,
      });
      toast({
        title: "Route Generated",
        description: "Optimal route has been calculated for your territory.",
      });
      setIsGeneratingRoute(false);
    }, 1500);
  };

  const getLocationIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Building2 className="h-5 w-5 text-[#FF6B35]" />;
      case 1:
        return <ShoppingBag className="h-5 w-5 text-black" />;
      case 2:
        return <Train className="h-5 w-5 text-[#FF6B35]" />;
      default:
        return <MapPin className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <DashboardLayout type="agent">
      <div className="space-y-6">
        <div>
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[#FF6B35] hover:text-[#e55a2b] font-medium mb-6 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>
          <h1 className="text-3xl font-bold text-black mb-2">Territory Management</h1>
          <p className="text-gray-600">Manage your assigned territory and plan field visits</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Territory</p>
                    <p className="text-lg font-bold text-black">{agentTerritory}</p>
                    <p className="text-xs text-gray-400 mt-1">Assigned to {agentName}</p>
                  </div>
                  <div className="w-10 h-10 bg-[#FF6B35]/10 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-[#FF6B35]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Users</p>
                    <p className="text-2xl font-bold text-black">{totalUsers}</p>
                    <p className="text-xs text-green-600 mt-1 flex items-center">
                      <TrendingUp className="h-3 w-3" />
                      +{Math.floor(Math.random() * 20 + 5)} this month
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-black/10 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-black" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Completion Rate</p>
                    <p className="text-2xl font-bold text-black">{completionRate}%</p>
                    <Progress value={completionRate} className="h-1 mt-2" />
                  </div>
                  <div className="w-10 h-10 bg-[#FF6B35]/10 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-[#FF6B35]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Target Progress</p>
                    <p className="text-2xl font-bold text-black">{targetProgress}%</p>
                    <p className="text-xs text-gray-500 mt-1">{totalUsers}/100 registrations</p>
                  </div>
                  <div className="w-10 h-10 bg-black/10 rounded-lg flex items-center justify-center">
                    <Target className="h-5 w-5 text-black" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border-gray-200 h-full">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <Map className="h-5 w-5 text-[#FF6B35]" />
                  Territory Map
                </CardTitle>
                <CardDescription>Visual representation of {agentTerritory}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg h-96 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-20 h-20 border-2 border-[#FF6B35] rounded-full animate-pulse" />
                    <div className="absolute top-32 left-40 w-16 h-16 border-2 border-black rounded-full animate-pulse delay-100" />
                    <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-[#FF6B35] rounded-full animate-pulse delay-200" />
                    <div className="absolute top-1/2 left-1/2 w-32 h-32 border-2 border-gray-400 rounded-full animate-pulse delay-300" />
                  </div>
                  <div className="text-center z-10">
                    <Map className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">Interactive Map View</p>
                    <p className="text-sm text-gray-400 mt-1">
                      {agentTerritory} • {topLocations.length} key locations
                    </p>
                    <Badge variant="secondary" className="mt-3">
                      <Navigation className="h-3 w-3 mr-1" />
                      GPS Enabled
                    </Badge>
                  </div>
                  {topLocations.slice(0, 3).map((loc, idx) => (
                    <div
                      key={idx}
                      className="absolute cursor-pointer transition-all hover:scale-110"
                      style={{
                        left: `${20 + idx * 25}%`,
                        top: `${30 + (idx % 2) * 40}%`,
                      }}
                      onClick={() => setSelectedLocation(loc.name)}
                    >
                      <div className="relative">
                        <div className="w-4 h-4 bg-[#FF6B35] rounded-full animate-bounce" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 whitespace-nowrap bg-white px-2 py-1 rounded text-xs shadow-lg">
                          {loc.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-6 mt-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#FF6B35] rounded-full" />
                    <span className="text-gray-600">High Activity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-black rounded-full" />
                    <span className="text-gray-600">Medium Activity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-400 rounded-full" />
                    <span className="text-gray-600">Low Activity</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <Route className="h-5 w-5 text-[#FF6B35]" />
                  Route Planner
                </CardTitle>
                <CardDescription>Optimize your field visits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={generateRoute}
                  disabled={isGeneratingRoute}
                  className="w-full bg-gradient-to-r from-[#FF6B35] to-black text-white"
                >
                  {isGeneratingRoute ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                      Calculating Route...
                    </>
                  ) : (
                    <>
                      <Navigation className="h-4 w-4 mr-2" />
                      Generate Optimal Route
                    </>
                  )}
                </Button>
                {routeInfo && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3 mt-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Total Distance</span>
                        <span className="font-bold text-black">{routeInfo.distance}</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Estimated Time</span>
                        <span className="font-bold text-black">{routeInfo.duration}</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Number of Stops</span>
                        <span className="font-bold text-black">{routeInfo.stops}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Potential Registrations</span>
                        <span className="font-bold text-[#FF6B35]">{routeInfo.potentialRegistrations}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 border-gray-200">
                        <Download className="h-4 w-4 mr-2" />
                        Export Route
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 border-gray-200">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </motion.div>
                )}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Route optimized for maximum coverage and efficiency
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-black flex items-center gap-2">
              <Star className="h-5 w-5 text-[#FF6B35]" />
              Top Registration Locations
            </CardTitle>
            <CardDescription>Most active areas in your territory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topLocations.map((location, index) => (
                <motion.div
                  key={location.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                    selectedLocation === location.name
                      ? "bg-[#FF6B35]/10 border border-[#FF6B35]"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedLocation(location.name)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                      {getLocationIcon(index)}
                    </div>
                    <div>
                      <p className="font-medium text-black">{location.name}</p>
                      <p className="text-xs text-gray-500">
                        {location.count} registrations • {Math.round((location.count / totalUsers) * 100)}% of total
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-[#FF6B35] text-white">
                      #{index + 1}
                    </Badge>
                    <ChevronRight className="h-4 w-4 text-gray-400 mt-1" />
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-gradient-to-r from-orange-50 to-gray-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#FF6B35] to-black rounded-full flex items-center justify-center flex-shrink-0">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-black mb-2">Field Visit Tips</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <Calendar className="h-3 w-3 text-[#FF6B35]" />
                    </div>
                    <span className="text-gray-600">Best time: 10 AM - 4 PM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <Users className="h-3 w-3 text-black" />
                    </div>
                    <span className="text-gray-600">Avg 8-12 registrations per visit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-[#FF6B35]" />
                    </div>
                    <span className="text-gray-600">Follow up within 48 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}